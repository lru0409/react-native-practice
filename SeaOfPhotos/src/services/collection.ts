import EncryptedStorage from 'react-native-encrypted-storage';

import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { UNSPLASH_ACCESS_KEY } from '@env';

const createCollection = async (
  title: string,
  description?: string,
  isPrivate?: boolean,
) => {
  const accessToken = await EncryptedStorage.getItem('unsplash_access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const params = new URLSearchParams();
  params.append('title', title);
  if (description !== undefined) {
    params.append('description', description);
  }
  if (isPrivate !== undefined) {
    params.append('private', isPrivate.toString());
  }

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
  return await response.json();
};

export default {
  createCollection,
  fetchUserCollections,
};
