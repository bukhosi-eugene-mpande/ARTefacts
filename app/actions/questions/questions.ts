'use server';
import { QuestionData } from './questions.types';

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;

export async function getAllQuestions(): Promise<QuestionData> {
  try {
    const endpoint = `${API_URL}/questions`;

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

    const data: QuestionData = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
