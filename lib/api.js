const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
const BASE_URL = `https://${RAPIDAPI_HOST}/generate?noqueue=1`;

export async function generateGame({ category, language = 'en', questionCount = 15, difficulty = 'progressive' }) {

  const body = JSON.stringify({ questionCount, language, category, difficulty });
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
      'Content-Type': 'application/json',
    },
    body,
    cache: 'no-store',
  });

  console.log('Response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API error response:', errorText);
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data;
}