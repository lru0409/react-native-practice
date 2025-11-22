import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { UNSPLASH_ACCESS_KEY } from '@env';
import type { Photo, PhotoResponse } from '@src/types/photo';

// TODO: 호출하는 곳에서 try-catch 필수
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
    data: data.slice(page === 1 ? 0 : 1).map(
      item =>
        ({
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
    data: data.results.map(
      item =>
        ({
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
    hasMore: page < data.total_pages,
  };
}

export default { fetchPhotos, fetchPhotosByQuery };
