'use server';
import { ArtefactsData, ArtefactData } from './artefacts.types';

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;

export async function getAllArtefacts(
  page = 1,
  per_page = 10
): Promise<ArtefactsData> {
  try {
    const endpoint = `${API_URL}/artefacts?page=${page}&per_page=${per_page}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ArtefactsData = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getArtefact(id: string): Promise<ArtefactData> {
  try {
    const endpoint = `${API_URL}/artefact?id=${id}`;

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

    const data: ArtefactData = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
