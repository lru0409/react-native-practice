import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { UNSPLASH_ACCESS_KEY } from '@env';
import type { User, UserResponse } from '@src/types/user';

async function fetchUser(username: string): Promise<User> {
  const response = await fetch(`${UNSPLASH_BASE_URL}/users/${username}`, {
    method: 'GET',
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = (await response.json()) as UserResponse;
  return {
    id: data.id,
    name: data.name,
    username: data.username,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    profileImage: data.profile_image,
    bio: data.bio,
    location: data.location,
  } as User;
}

export default {
  fetchUser,
};
