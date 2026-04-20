'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography, CircularProgress } from '@mui/material';
import AnswerOption from '@/components/AnswerOption';
import PrizeLadder from '@/components/prizeLadder';

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

function WinnerScreen({ onPlayAgain }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #020B18 0%, #051A30 40%, #020D20 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Rays */}
      {[...Array(12)].map((_, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '2px', height: '45vh',
          background: 'linear-gradient(180deg, rgba(255,215,0,0.3) 0%, transparent 100%)',
          transformOrigin: 'top center',
          transform: `rotate(${i * 30}deg) translateX(-50%)`,
          animation: 'spin 20s linear infinite',
          '@keyframes spin': { from: { transform: `rotate(${i * 30}deg) translateX(-50%)` }, to: { transform: `rotate(${i * 30 + 360}deg) translateX(-50%)` } },
        }} />
      ))}

      <Box sx={{ zIndex: 1, textAlign: 'center' }}>
        <Typography sx={{ fontSize: { xs: '60px', md: '80px' }, mb: 2, animation: 'bounce 1s ease infinite', '@keyframes bounce': { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.2)' } } }}>🏆</Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '28px', md: '48px' },
            background: 'linear-gradient(180deg, #FFE566 0%, #FFD700 50%, #B8980A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.6))',
            mb: 2,
          }}
        >
          CONGRATULATIONS!
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Cinzel', serif",
            fontSize: { xs: '18px', md: '28px' },
            color: '#FFD700',
            mb: 1,
          }}
        >
          You are a Millionaire!
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Lato', sans-serif",
            fontSize: { xs: '14px', md: '18px' },
            color: 'rgba(255,255,255,0.6)',
            mb: 5,
          }}
        >
          You answered all 15 questions correctly and won
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Cinzel Decorative', cursive",
            fontSize: { xs: '36px', md: '56px' },
            color: '#FFD700',
            fontWeight: 900,
            textShadow: '0 0 40px rgba(255,215,0,0.8)',
            mb: 5,
          }}
        >
          $1,000,000
        </Typography>

        <Box
          onClick={onPlayAgain}
          sx={{
            display: 'inline-block',
            px: 6, py: 2,
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 40px rgba(255,215,0,0.5)',
            '&:hover': { transform: 'scale(1.05)', boxShadow: '0 0 60px rgba(255,215,0,0.7)' },
          }}
        >
          <Typography sx={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: '16px', color: '#020B18' }}>
            Play Again
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function GameOverScreen({ correctAnswer, prizeReached, onPlayAgain }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #020B18 0%, #1A0505 40%, #020B18 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
      }}
    >
      <Typography sx={{ fontSize: { xs: '50px', md: '70px' }, mb: 3 }}>💔</Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '26px', md: '42px' },
          color: '#FF4444',
          fontFamily: "'Cinzel Decorative', cursive",
          textAlign: 'center',
          filter: 'drop-shadow(0 0 20px rgba(255,68,68,0.5))',
          mb: 2,
        }}
      >
        GAME OVER
      </Typography>

      <Box
        sx={{
          background: 'rgba(5,26,48,0.8)',
          border: '1px solid rgba(255,215,0,0.2)',
          borderRadius: '16px',
          p: { xs: 3, md: 4 },
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          mb: 4,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography sx={{ fontFamily: "'Lato', sans-serif", color: 'rgba(255,255,255,0.55)', fontSize: '13px', mb: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Correct Answer
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Cinzel', serif",
            fontSize: { xs: '16px', md: '20px' },
            color: '#00E676',
            fontWeight: 600,
            mb: 3,
          }}
        >
          {correctAnswer}
        </Typography>

        <Box sx={{ width: '100%', height: '1px', background: 'rgba(255,215,0,0.15)', mb: 3 }} />

        <Typography sx={{ fontFamily: "'Lato', sans-serif", color: 'rgba(255,255,255,0.55)', fontSize: '13px', mb: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Prize Reached
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Cinzel', serif",
            fontSize: { xs: '24px', md: '32px' },
            color: '#FFD700',
            fontWeight: 700,
            filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.4))',
          }}
        >
          {prizeReached || '$0'}
        </Typography>
      </Box>

      <Box
        onClick={onPlayAgain}
        sx={{
          px: 6, py: 2,
          borderRadius: '50px',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 0 30px rgba(255,215,0,0.4)',
          '&:hover': { transform: 'scale(1.05)', boxShadow: '0 0 50px rgba(255,215,0,0.6)' },
        }}
      >
        <Typography sx={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: '16px', color: '#020B18' }}>
          Play Again
        </Typography>
      </Box>
    </Box>
  );
}

export default function GamePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [gameState, setGameState] = useState('loading'); // loading | playing | won | lost
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [prizeReached, setPrizeReached] = useState('$0');

  useEffect(() => {
    const raw = sessionStorage.getItem('gameData');
    if (!raw) { router.push('/'); return; }
    try {
      const data = JSON.parse(raw);
      const qs = data?.content?.questions || data?.questions || [];
      if (qs.length === 0) { router.push('/'); return; }
      setQuestions(qs);
      setGameState('playing');
    } catch {
      router.push('/');
    }
  }, []);

  const currentQ = questions[currentIdx];

  const handleSelect = (key) => {
    if (revealed || !currentQ) return;
    setSelectedOption(key);
    setRevealed(true);

    const isCorrect = key === currentQ.correct_answer;

    setTimeout(() => {
      if (isCorrect) {
        if (currentIdx === questions.length - 1) {
          setGameState('won');
        } else {
          setCurrentIdx(prev => prev + 1);
          setSelectedOption(null);
          setRevealed(false);
        }
      } else {
        setCorrectAnswer(currentQ.options?.[currentQ.correct_answer] || currentQ.correct_answer);
        setPrizeReached(currentIdx > 0 ? questions[currentIdx - 1]?.prize_amount : '$0');
        setGameState('lost');
      }
    }, 2000);
  };

  const handlePlayAgain = () => {
    sessionStorage.removeItem('gameData');
    router.push('/');
  };

  const getOptionState = (key) => {
    if (!revealed) return selectedOption === key ? 'selected' : 'default';
    if (key === currentQ?.correct_answer) return 'correct';
    if (key === selectedOption && key !== currentQ?.correct_answer) return 'wrong';
    return 'default';
  };

  if (gameState === 'loading') {
    return (
      <Box sx={{ minHeight: '100vh', background: '#020B18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress sx={{ color: '#FFD700' }} />
          <Typography sx={{ fontFamily: "'Cinzel', serif", color: '#FFD700', fontSize: '14px' }}>Loading Game...</Typography>
        </Stack>
      </Box>
    );
  }

  if (gameState === 'won') return <WinnerScreen onPlayAgain={handlePlayAgain} />;
  if (gameState === 'lost') return <GameOverScreen correctAnswer={correctAnswer} prizeReached={prizeReached} onPlayAgain={handlePlayAgain} />;
  if (!currentQ) return null;

  const options = currentQ.options || {};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #020B18 0%, #051A30 40%, #020D20 70%, #020B18 100%)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <Box sx={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '70vw', height: '50vh',
        background: 'radial-gradient(ellipse, rgba(255,215,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Main Game Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, md: 5 },
          py: { xs: 3, md: 4 },
        }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%', maxWidth: '750px', mb: { xs: 2, md: 3 } }}>
          <Typography
            sx={{
              fontFamily: "'Cinzel', serif",
              fontSize: { xs: '11px', md: '13px' },
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.1em',
            }}
          >
            QUESTION {currentIdx + 1} OF {questions.length}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Cinzel', serif",
              fontSize: { xs: '13px', md: '15px' },
              color: '#FFD700',
              fontWeight: 600,
              filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.4))',
            }}
          >
            {currentQ.prize_amount}
          </Typography>
        </Stack>

        {/* Question Card */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '750px',
            background: 'linear-gradient(135deg, rgba(5,26,48,0.95) 0%, rgba(2,11,24,0.95) 100%)',
            border: '2px solid rgba(255,215,0,0.3)',
            borderRadius: '16px',
            p: { xs: 2.5, md: 4 },
            mb: { xs: 2.5, md: 3 },
            backdropFilter: 'blur(15px)',
            boxShadow: '0 0 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,215,0,0.1)',
            position: 'relative',
          }}
        >
          {/* Difficulty badge */}
          <Box
            sx={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              px: 2,
              py: 0.5,
              borderRadius: '20px',
              background: 'linear-gradient(90deg, #FFD700, #FFA500)',
              boxShadow: '0 0 15px rgba(255,215,0,0.4)',
            }}
          >
            <Typography sx={{ fontFamily: "'Cinzel', serif", fontSize: '10px', fontWeight: 700, color: '#020B18', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {currentQ.difficulty_level || 'Progressive'}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: "'Cinzel', serif",
              fontSize: { xs: '14px', md: '18px' },
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1.6,
              fontWeight: 500,
              mt: 1,
            }}
          >
            {currentQ.question}
          </Typography>
        </Box>

        {/* Answer Options */}
        <Stack spacing={1.5} sx={{ width: '100%', maxWidth: '750px' }}>
          {OPTION_KEYS.map((key) => (
            options[key] ? (
              <AnswerOption
                key={key}
                label={key}
                text={options[key]}
                state={getOptionState(key)}
                onClick={() => handleSelect(key)}
                disabled={revealed}
              />
            ) : null
          ))}
        </Stack>

        {/* Mobile Prize Ladder */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 3, width: '100%' }}>
          <PrizeLadder questions={questions} currentQuestion={currentIdx} />
        </Box>
      </Box>

      {/* Desktop Prize Ladder Sidebar */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: 4,
          pr: 3,
          width: '240px',
          flexShrink: 0,
        }}
      >
        <PrizeLadder questions={questions} currentQuestion={currentIdx} />
      </Box>
    </Box>
  );
}