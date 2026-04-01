import EncryptedStorage from 'react-native-encrypted-storage';

import { UNSPLASH_BASE_URL } from '@src/constants/api';
import type { User, UserResponse } from '@src/types/user';

// TODO: 다른 데서도 필요하면 추가
const mapUserResponse = (data: UserResponse): User => ({
  id: data.id,
  name: data.name,
  username: data.username,
  firstName: data.first_name,
  lastName: data.last_name,
  email: data.email,
  profileImage: data.profile_image,
  bio: data.bio,
  location: data.location,
});

async function fetchMe(): Promise<User> {
  const accessToken = await EncryptedStorage.getItem('unsplash_access_token');
  if (!accessToken) {
    throw new Error('NO_TOKEN');
  }

  const response = await fetch(`${UNSPLASH_BASE_URL}/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = (await response.json()) as UserResponse;
  return mapUserResponse(data);
}

async function updateMe({
  username,
  firstName,
  lastName,
  email,
  location,
  bio,
}: {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  bio: string;
}): Promise<User> {
  const accessToken = await EncryptedStorage.getItem('unsplash_access_token');
  if (!accessToken) {
    throw new Error('NO_TOKEN');
  }

  const params = new URLSearchParams();

  if (username !== undefined) params.append('username', username);
  if (firstName !== undefined) params.append('first_name', firstName);
  if (lastName !== undefined) params.append('last_name', lastName);
  if (email !== undefined) params.append('email', email);
  if (location !== undefined) params.append('location', location);
  if (bio !== undefined) params.append('bio', bio);

  const response = await fetch(`${UNSPLASH_BASE_URL}/me?${params.toString()}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = (await response.json()) as UserResponse;
  return mapUserResponse(data);
}

export default {
  fetchMe,
  updateMe,
};
