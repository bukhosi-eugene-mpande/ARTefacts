'use server';
import { decodeJWT } from '@/app/actions/utilities/utils';

import { User } from './user.types';

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;

export async function getUserDetails(jwt: string): Promise<User> {
  try {
    const decoded = decodeJWT(jwt);
    const user_sub = decoded.sub;

    const endpoint = `${API_URL}/user?user_sub=${user_sub}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        Authorization: jwt,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: User = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateAvatar(jwt: string, key: string): Promise<User> {
  try {
    const decoded = decodeJWT(jwt);
    const user_id = decoded.sub;

    const endpoint = `${API_URL}/artefacts`;

    const requestBody = {
      user_id: user_id,
      key: key,
    };

    const response = await fetch(endpoint, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        Authorization: `Bearer ${jwt}`,
      },
      cache: 'no-store',
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`
      );
    }

    return getUserDetails(jwt);
  } catch (error) {
    throw error;
  }
}
