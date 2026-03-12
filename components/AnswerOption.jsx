'use client';
import { Box, Typography } from '@mui/material';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function AnswerOption({ label, text, state, onClick, disabled }) {
  // state: 'default' | 'selected' | 'correct' | 'wrong'

  const getStyles = () => {
    switch (state) {
      case 'correct':
        return {
          background: 'linear-gradient(90deg, rgba(0,230,118,0.3) 0%, rgba(0,230,118,0.15) 100%)',
          border: '2px solid #00E676',
          labelBg: '#00E676',
          labelColor: '#000',
          textColor: '#00E676',
          boxShadow: '0 0 20px rgba(0,230,118,0.4)',
        };
      case 'wrong':
        return {
          background: 'linear-gradient(90deg, rgba(255,68,68,0.3) 0%, rgba(255,68,68,0.15) 100%)',
          border: '2px solid #FF4444',
          labelBg: '#FF4444',
          labelColor: '#fff',
          textColor: '#FF4444',
          boxShadow: '0 0 20px rgba(255,68,68,0.4)',
        };
      case 'selected':
        return {
          background: 'linear-gradient(90deg, rgba(255,165,0,0.3) 0%, rgba(255,165,0,0.15) 100%)',
          border: '2px solid #FFA500',
          labelBg: '#FFA500',
          labelColor: '#000',
          textColor: '#FFA500',
          boxShadow: '0 0 20px rgba(255,165,0,0.4)',
        };
      default:
        return {
          background: 'linear-gradient(90deg, rgba(5,26,48,0.8) 0%, rgba(2,11,24,0.6) 100%)',
          border: '2px solid rgba(255,215,0,0.35)',
          labelBg: 'rgba(255,215,0,0.15)',
          labelColor: '#FFD700',
          textColor: '#fff',
          boxShadow: 'none',
        };
    }
  };

  const styles = getStyles();

  return (
    <Box
      onClick={!disabled ? onClick : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: { xs: 2, md: 3 },
        py: { xs: 1.5, md: 2 },
        borderRadius: '50px',
        background: styles.background,
        border: styles.border,
        boxShadow: styles.boxShadow,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(8px)',
        '&:hover': !disabled ? {
          background: 'linear-gradient(90deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.08) 100%)',
          border: '2px solid rgba(255,215,0,0.7)',
          transform: 'scale(1.01)',
          boxShadow: '0 0 25px rgba(255,215,0,0.25)',
        } : {},
      }}
    >
      <Box
        sx={{
          minWidth: { xs: '28px', md: '34px' },
          height: { xs: '28px', md: '34px' },
          borderRadius: '50%',
          background: styles.labelBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            fontSize: { xs: '12px', md: '14px' },
            color: styles.labelColor,
          }}
        >
          {label}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontFamily: "'Lato', sans-serif",
          fontSize: { xs: '13px', md: '15px' },
          color: styles.textColor,
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}