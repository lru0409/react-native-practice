import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { UNSPLASH_ACCESS_KEY } from '@env';
import type { Photo, PhotoResponse } from '@src/types/photo';

const mapPhotoResponse = (item: PhotoResponse): Photo => ({
  id: item.id,
  description: item.alt_description,
  createdAt: item.created_at,
  urls: item.urls,
  user: {
    name: item.user.name,
    username: item.user.username,
    profileImage: item.user.profile_image.medium,
  },
  currentUserCollections: item.current_user_collections,
});

async function fetchPhotos(page: number) {
  const response = await fetch(`${UNSPLASH_BASE_URL}/photos?page=${page}`, {
    method: 'GET',
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const total = Number(response.headers.get('x-total'));
  const perPage = Number(response.headers.get('x-per-page'));
  const totalPages = Math.ceil(total / perPage);

  const data = (await response.json()) as PhotoResponse[];
  return {
    data: data.slice(page === 1 ? 0 : 1).map(mapPhotoResponse),
    hasMore: page < totalPages,
  };
}

async function fetchPhotosByQuery(query: string, page: number) {
  const response = await fetch(
    `${UNSPLASH_BASE_URL}/search/photos?query=${query}&page=${page}`,
    {
      method: 'GET',
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = (await response.json()) as {
    total_pages: number;
    results: PhotoResponse[];
  };

  return {
    data: data.results.map(mapPhotoResponse),
    hasMore: page < data.total_pages,
  };
}

async function fetchUserPhotos(username: string, page: number) {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('per_page', '10');

  const response = await fetch(
    `${UNSPLASH_BASE_URL}/users/${username}/photos?${params.toString()}`,
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

  const data = (await response.json()) as PhotoResponse[];
  return {
    data: data.map(mapPhotoResponse),
    hasMore: page < totalPages,
  };
}

async function fetchCollectionPhotos(collectionId: string, page: number) {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('per_page', '10');

  const response = await fetch(
    `${UNSPLASH_BASE_URL}/collections/${collectionId}/photos?${params.toString()}`,
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

  const data = (await response.json()) as PhotoResponse[];
  return {
    data: data.map(mapPhotoResponse),
    hasMore: page < totalPages,
  };
}

export default { fetchPhotos, fetchPhotosByQuery, fetchUserPhotos, fetchCollectionPhotos };
