import EncryptedStorage from 'react-native-encrypted-storage';

import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { UNSPLASH_ACCESS_KEY } from '@env';
import type { CollectionResponse, Collection } from '@src/types/collection';

const mapCollectionResponse = (item: CollectionResponse): Collection => ({
  id: item.id,
  title: item.title,
  description: item.description,
  createdAt: item.published_at,
  updatedAt: item.last_collected_at,
  totalPhotos: item.total_photos,
  private: item.private,
  coverPhoto: item.cover_photo ? {
    id: item.cover_photo.id,
    urls: item.cover_photo.urls,
  } : null,
});

const createCollection = async (
  title: string,
  description: string,
  isPrivate: boolean,
): Promise<Collection> => {
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
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = (await response.json()) as CollectionResponse;
  return mapCollectionResponse(data);
};

const updateCollection = async (
  collectionId: string,
  title: string,
  description: string,
  isPrivate: boolean,
): Promise<Collection> => {
  const accessToken = await EncryptedStorage.getItem('unsplash_access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const params = new URLSearchParams();
  params.append('title', title);
  params.append('description', description);
  params.append('private', isPrivate.toString());

  const response = await fetch(
    `${UNSPLASH_BASE_URL}/collections/${collectionId}?${params.toString()}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = (await response.json()) as CollectionResponse;
  return mapCollectionResponse(data);
};

const deleteCollection = async (collectionId: string) => {
  const accessToken = await EncryptedStorage.getItem('unsplash_access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${UNSPLASH_BASE_URL}/collections/${collectionId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
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
    data: data.map(mapCollectionResponse),
    hasMore: page < totalPages,
  };
};

const addPhotoToCollection = async (collectionId: string, photoId: string) => {
  const accessToken = await EncryptedStorage.getItem('unsplash_access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${UNSPLASH_BASE_URL}/collections/${collectionId}/add`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ photo_id: photoId }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
};

const removePhotoFromCollection = async (collectionId: string, photoId: string) => {
  const accessToken = await EncryptedStorage.getItem('unsplash_access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${UNSPLASH_BASE_URL}/collections/${collectionId}/remove`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ photo_id: photoId }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
};

export default {
  createCollection,
  updateCollection,
  deleteCollection,
  fetchUserCollections,
  addPhotoToCollection,
  removePhotoFromCollection,
};
