'use server';
import { Avatar, AvatarsResponse } from './avatars.types';

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;

export async function getAllAvatars(): Promise<Avatar[]> {
  try {
    const endpoint = `${API_URL}/avatars`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: AvatarsResponse = await response.json();

    if (!data.body || !Array.isArray(data.body.avatars)) {
      console.error('Unexpected response structure:', data);
      throw new Error('Invalid response format: avatars not found');
    }

    return data.body.avatars;
  } catch (error) {
    console.error('Error in getAllAvatars:', error);
    throw error;
  }
}
