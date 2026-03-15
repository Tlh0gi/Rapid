# Theme Documentation

**File:** `theme/index.js`

---

## Overview

The global MUI theme for the WWTBAM Trivia application. Built using `createTheme` from `@mui/material/styles` and exported as a default. It is injected into the app at the root level via `ThemeProvider` inside `app/layout.js`, meaning every MUI component across every screen inherits these values automatically.

The theme is designed around the iconic *Who Wants to Be a Millionaire* visual identity — deep navy and near-black backgrounds, gold as the dominant accent colour, electric blue as a secondary accent, and cinematic serif typography.

---

## Palette

The palette runs in `dark` mode. All colours are intentionally high-contrast to stay legible against the dark backgrounds.

### Primary — Gold

The main accent colour. Used for active borders, highlights, progress bars, button fills, prize amounts, and key text labels.

| Token | Hex | Role |
|---|---|---|
| `primary.main` | `#FFD700` | Default gold — buttons, active borders, prize text |
| `primary.light` | `#FFE566` | Lighter gold — gradient highlights, heading tops |
| `primary.dark` | `#B8980A` | Darker gold — gradient tails, subtle accents |

### Secondary — Electric Blue

Used for milestone rows in the prize ladder and secondary informational highlights.

| Token | Hex | Role |
|---|---|---|
| `secondary.main` | `#00BFFF` | Milestone row text and borders |
| `secondary.light` | `#66D9FF` | Lighter variant |
| `secondary.dark` | `#007A99` | Darker variant |

### Background

| Token | Hex | Role |
|---|---|---|
| `background.default` | `#020B18` | Full page background — near-black navy |
| `background.paper` | `#051A30` | Card and panel surfaces |

### Text

| Token | Hex | Role |
|---|---|---|
| `text.primary` | `#FFFFFF` | Main body text |
| `text.secondary` | `#FFD700` | Secondary labels and subtitles |

### Semantic Colours

| Token | Hex | Role |
|---|---|---|
| `error.main` | `#FF4444` | Wrong answer state, error messages |
| `success.main` | `#00E676` | Correct answer state, completed question ticks |

---

## Typography

Two Google Fonts are used across the app, loaded in `app/layout.js` via a `<link>` tag.

- **Cinzel** — A classical Roman serif. Used for all UI labels, question numbers, category names, button text, and navigation. Conveys authority and formality.
- **Cinzel Decorative** — A more ornate variant of Cinzel. Reserved exclusively for main headings and the game title where maximum visual impact is needed.
- **Lato** — A clean sans-serif. Used for question content, descriptions, and answer option text where readability takes priority over decoration.

### Variant Mapping

| Variant | Font | Weight | Typical Use |
|---|---|---|---|
| `h1` | Cinzel Decorative | 900 | Page titles — "Who Wants To Be A Millionaire?" |
| `h2` | Cinzel Decorative | 700 | Screen headings — "Congratulations", "Game Over" |
| `h3` | Cinzel | 700 | Section headings |
| `h4` | Cinzel | 600 | Sub-section headings |
| `h5` | Cinzel | 600 | Tertiary headings |
| `h6` | Cinzel | 500 | Minor labels |
| `body1` | Lato | 400 | Question text, descriptions, answer text |
| `body2` | Lato | 300 | Small print, helper text |
| `button` | Cinzel | 600 | Button labels — letter spacing `0.08em` |

The base `fontFamily` fallback is `'Cinzel', serif`. Any variant not explicitly mapped defaults to Cinzel.

---

## Global CSS Baseline

The `MuiCssBaseline` component override applies a diagonal gradient directly to the `body` element:

```
linear-gradient(135deg, #020B18 0%, #051A30 50%, #020B18 100%)
```

This ensures a consistent background even on screens that don't set their own, giving every page subtle depth rather than a flat solid colour. `minHeight: 100vh` prevents short-content pages from showing an unstyled area below the gradient.

---

## Usage

The theme is applied once in `app/layout.js` and wraps the entire application:

```jsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';

<ThemeProvider theme={theme}>
  <CssBaseline />
  {children}
</ThemeProvider>
```

`CssBaseline` must sit inside `ThemeProvider` for the `MuiCssBaseline` body override to take effect.

---

## Extending the Theme

To add a new colour token or globally override a component, edit `theme/index.js` directly.

Adding a warning colour:
```js
palette: {
  warning: {
    main: '#FFA500',
  },
}
```

Globally overriding a MUI component:
```js
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '50px',
      },
    },
  },
}
```