import EncryptedStorage from 'react-native-encrypted-storage';

import { UNSPLASH_ACCESS_KEY, UNSPLASH_SECRET_KEY } from '@env';

const requestAccessToken = async (code: string) => {
  const response = await fetch(`https://unsplash.com/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: UNSPLASH_ACCESS_KEY,
      client_secret: UNSPLASH_SECRET_KEY,
      redirect_uri: 'com.seaofphotos://oauth',
      code: code,
      grant_type: 'authorization_code',
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  await EncryptedStorage.setItem('unsplash_access_token', data.access_token);
};

const logout = async () => {
  await EncryptedStorage.removeItem('unsplash_access_token');
};

export default {
  requestAccessToken,
  logout,
};
