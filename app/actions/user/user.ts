'use server';
import { User } from './user.types';

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;

function decodeJWT(token: string): { sub: string } {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = Buffer.from(base64, 'base64').toString('utf-8');

    return JSON.parse(payload);
  } catch {
    throw new Error('Invalid JWT token');
  }
}

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
