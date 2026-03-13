'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark, faDna, faFutbol, faEarthAfrica, faFilm, faLaptopCode, faPalette, faUtensils, faLeaf, faGlobe, faBolt, faMusic } 
from '@fortawesome/free-solid-svg-icons';



const CATEGORIES = [
  { id: 'history', label: 'History', icon: <FontAwesomeIcon icon={faLandmark} />, description: 'Ancient to modern civilizations' },
  { id: 'science', label: 'Science', icon: <FontAwesomeIcon icon={faDna} />, description: 'Physics, biology, chemistry & more' },
  { id: 'sports', label: 'Sports', icon: <FontAwesomeIcon icon={faFutbol} />, description: 'Athletes, records & championships' },
  { id: 'geography', label: 'Geography', icon: <FontAwesomeIcon icon={faEarthAfrica} />, description: 'Countries, capitals & landscapes' },
  { id: 'entertainment', label: 'Entertainment', icon: <FontAwesomeIcon icon={faFilm} />, description: 'Movies, TV, music & pop culture' },
  { id: 'technology', label: 'Technology', icon: <FontAwesomeIcon icon={faLaptopCode} />, description: 'Innovations & digital world' },
  { id: 'art', label: 'Art & Literature', icon: <FontAwesomeIcon icon={faPalette} />, description: 'Paintings, books & authors' },
  { id: 'food', label: 'Food & Cuisine', icon: <FontAwesomeIcon icon={faUtensils} />, description: 'Dishes, ingredients & culinary arts' },
  { id: 'nature', label: 'Nature', icon: <FontAwesomeIcon icon={faLeaf} />, description: 'Animals, plants & ecosystems' },
  { id: 'politics', label: 'Politics', icon: <FontAwesomeIcon icon={faGlobe} />, description: 'Governments, leaders & world affairs' },
  { id: 'mythology', label: 'Mythology', icon: <FontAwesomeIcon icon={faBolt} />, description: 'Gods, legends & ancient stories' },
  { id: 'music', label: 'Music', icon: <FontAwesomeIcon icon={faMusic} />, description: 'Artists, genres & music theory' },
];

const LOADING_STEPS = [
  'Shuffling the questions...',
  'Calibrating difficulty levels...',
  'Building the prize ladder...',
  'Warming up the hot seat...',
  'Almost ready to play!',
];

function GameLoader({ category }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const intervalRef = useRef(null);
  const circumference = 2 * Math.PI * 54;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 92) { clearInterval(intervalRef.current); return 92; }
        const increment = prev < 40 ? 1.1 : prev < 70 ? 0.6 : 0.25;
        return Math.min(prev + increment, 92);
      });
    }, 200);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 95) * LOADING_STEPS.length),
      LOADING_STEPS.length - 1
    );
    setStepIndex(idx);
  }, [progress]);

  return (
    <Box sx={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'linear-gradient(135deg, #020B18 0%, #051A30 40%, #020D20 70%, #020B18 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      px: 3,
      overflow: 'hidden',
    }}>
      {/* Rotating rays */}
      {[...Array(10)].map((_, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '1px',
          height: '55vh',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,215,0,0.05) 50%, transparent 100%)',
          transformOrigin: 'top center',
          animation: `spin 25s linear infinite`,
          animationDelay: `${-i * 2.5}s`,
          '@keyframes spin': {
            from: { transform: 'translateX(-50%) rotate(0deg)' },
            to: { transform: 'translateX(-50%) rotate(360deg)' },
          },
        }} />
      ))}

      {/* Breathing glow */}
      <Box sx={{
        position: 'absolute',
        width: '480px', height: '480px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 65%)',
        animation: 'breathe 3s ease-in-out infinite',
        '@keyframes breathe': {
          '0%,100%': { transform: 'scale(0.9)', opacity: 0.6 },
          '50%': { transform: 'scale(1.15)', opacity: 1 },
        },
      }} />

      <Stack alignItems="center" spacing={{ xs: 3, md: 4 }} sx={{ zIndex: 1, width: '100%', maxWidth: '460px' }}>

        {/* Title */}
        <Stack alignItems="center" spacing={1}>
          <Typography sx={{
            fontFamily: "'Cinzel Decorative', cursive",
            fontSize: { xs: '14px', md: '17px' },
            background: 'linear-gradient(180deg, #FFE566 0%, #FFD700 50%, #B8980A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 18px rgba(255,215,0,0.55))',
            letterSpacing: '0.04em',
            textAlign: 'center',
          }}>
            Who Wants To Be A Millionaire?
          </Typography>
          <Box sx={{ width: '90px', height: '1px', background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }} />
        </Stack>

        {/* Category pill */}
        <Box sx={{
          px: 3, py: 0.8,
          borderRadius: '50px',
          border: '1px solid rgba(255,215,0,0.35)',
          background: 'rgba(255,215,0,0.06)',
          backdropFilter: 'blur(8px)',
        }}>
          <Typography sx={{
            fontFamily: "'Cinzel', serif",
            fontSize: '11px',
            color: 'rgba(255,215,0,0.85)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            {category}
          </Typography>
        </Box>

        {/* Circular progress ring */}
        <Box sx={{ position: 'relative', width: '130px', height: '130px' }}>
          <svg width="130" height="130" style={{ transform: 'rotate(-90deg)', display: 'block' }}>
            <defs>
              <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8980A" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFE566" />
              </linearGradient>
              <filter id="ringGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx="65" cy="65" r="54" fill="none" stroke="rgba(255,215,0,0.08)" strokeWidth="7" />
            <circle
              cx="65" cy="65" r="54"
              fill="none"
              stroke="url(#ringGold)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              filter="url(#ringGlow)"
              style={{ transition: 'stroke-dashoffset 0.25s ease' }}
            />
          </svg>
          <Box sx={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Typography sx={{
              fontFamily: "'Cinzel Decorative', cursive",
              fontSize: '26px',
              fontWeight: 900,
              color: '#FFD700',
              lineHeight: 1,
              filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.7))',
            }}>
              {Math.round(progress)}%
            </Typography>
          </Box>
        </Box>

        {/* Flat progress bar */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{
            width: '100%', height: '5px', borderRadius: '99px',
            background: 'rgba(255,215,0,0.08)',
            border: '1px solid rgba(255,215,0,0.12)',
            overflow: 'hidden',
          }}>
            <Box sx={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: '99px',
              background: 'linear-gradient(90deg, #B8980A 0%, #FFD700 60%, #FFE566 100%)',
              boxShadow: '0 0 14px rgba(255,215,0,0.65)',
              transition: 'width 0.25s ease',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0, right: 0,
                width: '24px', height: '100%',
                background: 'rgba(255,255,255,0.35)',
                filter: 'blur(5px)',
              },
            }} />
          </Box>
        </Box>

        {/* Step message */}
        <Box sx={{ height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            key={stepIndex}
            sx={{
              fontFamily: "'Lato', sans-serif",
              fontSize: { xs: '12px', md: '13px' },
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.06em',
              textAlign: 'center',
              animation: 'fadeUp 0.5s ease both',
              '@keyframes fadeUp': {
                from: { opacity: 0, transform: 'translateY(6px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            {LOADING_STEPS[stepIndex]}
          </Typography>
        </Box>

        {/* Pulsing dots */}
        <Stack direction="row" spacing={1.2} alignItems="center">
          {[0, 1, 2, 3].map(i => (
            <Box key={i} sx={{
              width: i === 1 || i === 2 ? '8px' : '5px',
              height: i === 1 || i === 2 ? '8px' : '5px',
              borderRadius: '50%',
              background: '#FFD700',
              animation: 'dotBounce 1.6s ease-in-out infinite',
              animationDelay: `${i * 0.18}s`,
              '@keyframes dotBounce': {
                '0%,80%,100%': { opacity: 0.25, transform: 'scale(0.75)' },
                '40%': { opacity: 1, transform: 'scale(1.3)', boxShadow: '0 0 8px rgba(255,215,0,0.6)' },
              },
            }} />
          ))}
        </Stack>

      </Stack>
    </Box>
  );
}

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
    <>
      {loading && <GameLoader category={selected} />}

      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #020B18 0%, #051A30 40%, #020D20 70%, #020B18 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden',
      }}>
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
          <Typography variant="h1" sx={{
            fontSize: { xs: '22px', md: '38px' },
            background: 'linear-gradient(180deg, #FFE566 0%, #FFD700 50%, #B8980A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            letterSpacing: '0.05em',
            filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))',
          }}>
            Who Wants To Be
          </Typography>
          <Typography variant="h1" sx={{
            fontSize: { xs: '22px', md: '38px' },
            background: 'linear-gradient(180deg, #FFE566 0%, #FFD700 50%, #B8980A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            letterSpacing: '0.05em',
            filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))',
          }}>
            A Millionaire?
          </Typography>
          <Box sx={{ width: '120px', height: '2px', background: 'linear-gradient(90deg, transparent, #FFD700, transparent)', mt: 1 }} />
          <Typography variant="body1" sx={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: { xs: '13px', md: '15px' },
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            mt: 1,
          }}>
            Choose Your Category
          </Typography>
        </Stack>

        {/* Category Grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
          gap: { xs: 1.5, md: 2 },
          maxWidth: '900px',
          width: '100%',
          zIndex: 1,
        }}>
          {CATEGORIES.map((cat) => (
            <Box
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              sx={{
                p: { xs: 2, md: 2.5 },
                borderRadius: '12px',
                border: selected === cat.id ? '2px solid #FFD700' : '2px solid rgba(255,215,0,0.15)',
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
              <Typography sx={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                fontSize: { xs: '11px', md: '13px' },
                color: selected === cat.id ? '#FFD700' : '#fff',
                mb: 0.5,
              }}>
                {cat.label}
              </Typography>
              <Typography sx={{
                fontFamily: "'Lato', sans-serif",
                fontSize: { xs: '10px', md: '11px' },
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.3,
                display: { xs: 'none', md: 'block' },
              }}>
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
          }}
        >
          <Typography sx={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            fontSize: { xs: '14px', md: '16px' },
            color: selected ? '#020B18' : 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
          }}>
            Start Game
          </Typography>
        </Box>
      </Box>
    </>
  );
}