const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || 'YOUR_RAPIDAPI_KEY_HERE';
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'who-wants-to-be-a-millionaire-ai-quiz-game-trivia-api.p.rapidapi.com';
const BASE_URL = `https://${RAPIDAPI_HOST}/generate?noqueue=1`;

export async function generateGame({ category, language = 'en', questionCount = 15, difficulty = 'progressive' }) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ questionCount, language, category, difficulty }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}