'use client';
import { Box, Typography, Stack } from '@mui/material';

const PRIZE_MILESTONES = [1, 5, 10];

export default function PrizeLadder({ questions, currentQuestion, answeredCorrectly }) {
  const reversedQuestions = [...(questions || [])].reverse();

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '220px' },
        background: 'linear-gradient(180deg, rgba(5,26,48,0.95) 0%, rgba(2,11,24,0.95) 100%)',
        border: '1px solid rgba(255,215,0,0.2)',
        borderRadius: '12px',
        p: 1.5,
        backdropFilter: 'blur(10px)',
        maxHeight: { xs: '180px', md: '100vh' },
        overflowY: 'auto',
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: 'rgba(255,215,0,0.3)', borderRadius: '2px' },
      }}
    >
      <Stack spacing={0.5}>
        {reversedQuestions.map((q, reversedIdx) => {
          const questionNum = questions.length - reversedIdx;
          const isCurrent = questionNum === currentQuestion + 1;
          const isPast = questionNum <= currentQuestion;
          const isMilestone = PRIZE_MILESTONES.includes(questionNum);

          return (
            <Box
              key={questionNum}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 1.5,
                py: 0.6,
                borderRadius: '6px',
                background: isCurrent
                  ? 'linear-gradient(90deg, rgba(255,215,0,0.25) 0%, rgba(255,215,0,0.1) 100%)'
                  : isPast
                  ? 'rgba(0,230,118,0.08)'
                  : isMilestone
                  ? 'rgba(0,191,255,0.06)'
                  : 'transparent',
                border: isCurrent
                  ? '1px solid rgba(255,215,0,0.6)'
                  : isMilestone
                  ? '1px solid rgba(0,191,255,0.3)'
                  : '1px solid transparent',
                transition: 'all 0.3s ease',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '10px', md: '11px' },
                  color: isCurrent ? '#FFD700' : isPast ? '#00E676' : isMilestone ? '#00BFFF' : 'rgba(255,255,255,0.5)',
                  fontFamily: "'Cinzel', serif",
                  fontWeight: isCurrent || isMilestone ? 700 : 400,
                }}
              >
                {questionNum}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '10px', md: '11px' },
                  color: isCurrent ? '#FFD700' : isPast ? '#00E676' : isMilestone ? '#00BFFF' : 'rgba(255,255,255,0.5)',
                  fontFamily: "'Cinzel', serif",
                  fontWeight: isCurrent || isMilestone ? 700 : 400,
                }}
              >
                {q.prize_amount}
              </Typography>
              {isCurrent && (
                <Box
                  sx={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#FFD700',
                    boxShadow: '0 0 8px #FFD700',
                    animation: 'pulse 1.5s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                      '50%': { opacity: 0.5, transform: 'scale(1.4)' },
                    },
                  }}
                />
              )}
              {isPast && (
                <Typography sx={{ fontSize: '10px', color: '#00E676' }}>✓</Typography>
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}