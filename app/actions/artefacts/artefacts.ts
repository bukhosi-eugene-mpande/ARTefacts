'use server';
import { Artefact, ArtefactsResponse } from './artefacts.types';

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;

export async function getAllArtefacts(): Promise<Artefact[]> {
  try {
    const endpoint = `${API_URL}/artefacts`;

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

    const data: ArtefactsResponse = await response.json();

    return data.body.artefacts;
  } catch (error) {
    throw error;
  }
}
