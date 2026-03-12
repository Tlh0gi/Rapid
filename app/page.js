'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography, CircularProgress } from '@mui/material';

const CATEGORIES = [
  { id: 'history', label: 'History', icon: '🏛️', description: 'Ancient to modern civilizations' },
  { id: 'science', label: 'Science', icon: '🔬', description: 'Physics, biology, chemistry & more' },
  { id: 'sports', label: 'Sports', icon: '⚽', description: 'Athletes, records & championships' },
  { id: 'geography', label: 'Geography', icon: '🌍', description: 'Countries, capitals & landscapes' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬', description: 'Movies, TV, music & pop culture' },
  { id: 'technology', label: 'Technology', icon: '💻', description: 'Innovations & digital world' },
  { id: 'art', label: 'Art & Literature', icon: '🎨', description: 'Paintings, books & authors' },
  { id: 'food', label: 'Food & Cuisine', icon: '🍽️', description: 'Dishes, ingredients & culinary arts' },
  { id: 'nature', label: 'Nature', icon: '🌿', description: 'Animals, plants & ecosystems' },
  { id: 'politics', label: 'Politics', icon: '🏛️', description: 'Governments, leaders & world affairs' },
  { id: 'mythology', label: 'Mythology', icon: '⚡', description: 'Gods, legends & ancient stories' },
  { id: 'music', label: 'Music', icon: '🎵', description: 'Artists, genres & music theory' },
];

export default function CategoryPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = async () => {
    if (!selected) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selected, language: 'en', questionCount: 15, difficulty: 'progressive' }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to generate game');

      sessionStorage.setItem('gameData', JSON.stringify(data));
      router.push('/game');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #020B18 0%, #051A30 40%, #020D20 70%, #020B18 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow orbs */}
      <Box sx={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(255,215,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', bottom: '20%', left: '10%',
        width: '300px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(0,191,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <Stack alignItems="center" spacing={1} sx={{ mb: { xs: 4, md: 6 }, zIndex: 1 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '22px', md: '38px' },
            background: 'linear-gradient(180deg, #FFE566 0%, #FFD700 50%, #B8980A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            letterSpacing: '0.05em',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))',
          }}
        >
          Who Wants To Be
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '22px', md: '38px' },
            background: 'linear-gradient(180deg, #FFE566 0%, #FFD700 50%, #B8980A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            letterSpacing: '0.05em',
            filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))',
          }}
        >
          A Millionaire?
        </Typography>
        <Box sx={{ width: '120px', height: '2px', background: 'linear-gradient(90deg, transparent, #FFD700, transparent)', mt: 1 }} />
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: { xs: '13px', md: '15px' },
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            mt: 1,
          }}
        >
          Choose Your Category
        </Typography>
      </Stack>

      {/* Category Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
          gap: { xs: 1.5, md: 2 },
          maxWidth: '900px',
          width: '100%',
          zIndex: 1,
        }}
      >
        {CATEGORIES.map((cat) => (
          <Box
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            sx={{
              p: { xs: 2, md: 2.5 },
              borderRadius: '12px',
              border: selected === cat.id
                ? '2px solid #FFD700'
                : '2px solid rgba(255,215,0,0.15)',
              background: selected === cat.id
                ? 'linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.05) 100%)'
                : 'linear-gradient(135deg, rgba(5,26,48,0.9) 0%, rgba(2,11,24,0.9) 100%)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(10px)',
              boxShadow: selected === cat.id ? '0 0 25px rgba(255,215,0,0.25)' : 'none',
              '&:hover': {
                border: '2px solid rgba(255,215,0,0.5)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
              },
            }}
          >
            <Typography sx={{ fontSize: { xs: '24px', md: '28px' }, mb: 0.5 }}>{cat.icon}</Typography>
            <Typography
              sx={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                fontSize: { xs: '11px', md: '13px' },
                color: selected === cat.id ? '#FFD700' : '#fff',
                mb: 0.5,
              }}
            >
              {cat.label}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Lato', sans-serif",
                fontSize: { xs: '10px', md: '11px' },
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.3,
                display: { xs: 'none', md: 'block' },
              }}
            >
              {cat.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Error */}
      {error && (
        <Typography sx={{ color: '#FF4444', mt: 2, fontFamily: "'Lato', sans-serif", fontSize: '14px' }}>
          ⚠️ {error}
        </Typography>
      )}

      {/* Start Button */}
      <Box
        onClick={selected && !loading ? handleStart : undefined}
        sx={{
          mt: { xs: 4, md: 5 },
          px: { xs: 5, md: 8 },
          py: { xs: 1.8, md: 2.2 },
          borderRadius: '50px',
          background: selected
            ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)'
            : 'rgba(255,255,255,0.05)',
          border: selected ? 'none' : '2px solid rgba(255,255,255,0.1)',
          cursor: selected && !loading ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
          zIndex: 1,
          boxShadow: selected ? '0 0 40px rgba(255,215,0,0.4), 0 4px 20px rgba(0,0,0,0.5)' : 'none',
          '&:hover': selected && !loading ? {
            transform: 'scale(1.05)',
            boxShadow: '0 0 60px rgba(255,215,0,0.6), 0 4px 30px rgba(0,0,0,0.6)',
          } : {},
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        {loading ? (
          <CircularProgress size={20} sx={{ color: '#020B18' }} />
        ) : null}
        <Typography
          sx={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            fontSize: { xs: '14px', md: '16px' },
            color: selected ? '#020B18' : 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
          }}
        >
          {loading ? 'Generating Game...' : 'Start Game'}
        </Typography>
      </Box>
    </Box>
  );
}