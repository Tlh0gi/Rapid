const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
const BASE_URL = `https://${RAPIDAPI_HOST}/generate?noqueue=1`;

export async function generateGame({ category, language = 'en', questionCount = 15, difficulty = 'progressive' }) {
  if (!RAPIDAPI_KEY) {
    throw new Error('RAPIDAPI_KEY is not set in your .env.local file');
  }

  const body = JSON.stringify({ questionCount, language, category, difficulty });

  console.log('Calling API:', BASE_URL);
  console.log('Request body:', body);

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
  console.log('API response keys:', Object.keys(data));
  return data;
}