'use server';
import { decodeJWT } from '@/app/actions/utilities/utils';

import { Leaderboard, PointsUpdateResponse } from './points.types';

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;

export async function getLeaderboard(jwt?: string): Promise<Leaderboard> {
  try {
    var user_id = '';

    if (jwt) {
      const decoded = decodeJWT(jwt);

      user_id = decoded.sub;
    }

    var endpoint = '';

    if (user_id === '') {
      endpoint = `${API_URL}/points`;
    } else {
      endpoint = `${API_URL}/points?user_id=${user_id}`;
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Leaderboard = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMe(jwt?: string): Promise<Leaderboard> {
  try {
    var user_id = '';

    if (jwt) {
      const decoded = decodeJWT(jwt);

      user_id = decoded.sub;
    }

    var endpoint = '';

    endpoint = `${API_URL}/points?user_id=${user_id}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Leaderboard = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updatePoints(
  jwt: string,
  points: number
): Promise<PointsUpdateResponse> {
  try {
    const decoded = decodeJWT(jwt);
    const user_id = decoded.sub;

    const endpoint = `${API_URL}/points`;

    const requestBody = {
      user_id: user_id,
      points: points,
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
    const data: PointsUpdateResponse = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
