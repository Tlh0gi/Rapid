import { generateGame } from '@/lib/api';

export async function POST(request) {
  try {
    const body = await request.json();
    const { category, language, questionCount, difficulty } = body;

    if (!category) {
      return Response.json({ error: 'Category is required' }, { status: 400 });
    }

    const data = await generateGame({ category, language, questionCount, difficulty });
    return Response.json(data);
  } catch (error) {
    console.error('Game generation error:', error);
    return Response.json({ error: error.message || 'Failed to generate game' }, { status: 500 });
  }
}