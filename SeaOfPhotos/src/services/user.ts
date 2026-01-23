import EncryptedStorage from 'react-native-encrypted-storage';

import { UNSPLASH_BASE_URL } from '@src/constants/api';
import type { User, UserResponse } from '@src/types/user';

async function fetchUser(): Promise<User> {
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
  return {
    id: data.id,
    name: data.name,
    username: data.username,
    email: data.email,
    profileImage: data.profile_image,
  } as User;
}

export default {
  fetchUser,
};