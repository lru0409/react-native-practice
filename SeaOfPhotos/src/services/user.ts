import EncryptedStorage from 'react-native-encrypted-storage';

import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { UNSPLASH_ACCESS_KEY } from '@env';
import type { User, UserResponse } from '@src/types/user';

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

async function fetchUser(username: string): Promise<User> {
  const response = await fetch(`${UNSPLASH_BASE_URL}/users/${username}`, {
    method: 'GET',
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = (await response.json()) as UserResponse;
  return mapUserResponse(data);
}

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
  params.append('username', username);
  params.append('first_name', firstName);
  params.append('last_name', lastName);
  params.append('email', email);
  params.append('location', location);
  params.append('bio', bio);

  const response = await fetch(`${UNSPLASH_BASE_URL}/me?${params.toString()}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = (await response.json()) as UserResponse;
  return mapUserResponse(data);
}

export default {
  fetchUser,
  fetchMe,
  updateMe,
};
