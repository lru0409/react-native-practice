import EncryptedStorage from 'react-native-encrypted-storage';

import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { UNSPLASH_ACCESS_KEY } from '@env';
import type { CollectionResponse, Collection } from '@src/types/collection';
import { Photo, PhotoResponse } from '@src/types/photo';

const createCollection = async (
  title: string,
  description: string,
  isPrivate: boolean,
) => {
  const accessToken = await EncryptedStorage.getItem('unsplash_access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const params = new URLSearchParams();
  params.append('title', title);
  params.append('description', description);
  params.append('private', isPrivate.toString());

  const response = await fetch(
    `${UNSPLASH_BASE_URL}/collections?${params.toString()}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return await response.json();
};

const fetchUserCollections = async (username: string, page: number) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('page', page.toString());
  params.append('per_page', '10');

  const response = await fetch(
    `${UNSPLASH_BASE_URL}/users/${username}/collections?${params.toString()}`,
    {
      method: 'GET',
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const total = Number(response.headers.get('x-total'));
  const perPage = Number(response.headers.get('x-per-page'));
  const totalPages = Math.ceil(total / perPage);

  const data = (await response.json()) as CollectionResponse[];
  return {
    data: data.map(
      item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        createdAt: item.published_at,
        updatedAt: item.last_collected_at,
        totalPhotos: item.total_photos,
        private: item.private,
        coverPhoto: {
          id: item.cover_photo.id,
          urls: item.cover_photo.urls,
        },
      } as Collection),
    ),
    hasMore: page < totalPages,
  };
};

const fetchCollectionPhotos = async (collectionId: string, page: number) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('per_page', '10');

  const response = await fetch(
    `${UNSPLASH_BASE_URL}/collections/${collectionId}/photos?${params.toString()}`,
    {
      method: 'GET',
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const total = Number(response.headers.get('x-total'));
  const perPage = Number(response.headers.get('x-per-page'));
  const totalPages = Math.ceil(total / perPage);

  const data = (await response.json()) as PhotoResponse[];
  return {
    data: data.map(
      item => ({
        id: item.id,
        description: item.alt_description,
        createdAt: item.created_at,
        urls: item.urls,
        user: {
          name: item.user.name,
          profileImage: item.user.profile_image.medium,
        },
      } as Photo),
    ),
    hasMore: page < totalPages,
  };
}

export default {
  createCollection,
  fetchUserCollections,
  fetchCollectionPhotos,
};
