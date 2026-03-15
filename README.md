# Project Overview

**Project Name:** Rapid — Who Wants To Be A Millionaire Trivia  
**Framework:** Next.js 15 (App Router)  
**Styling:** MUI v6 + inline `sx` props — no Tailwind  
**API:** Who Wants To Be A Millionaire AI Quiz Game Trivia API via RapidAPI

---

## What This Project Is

A full browser-based recreation of the iconic *Who Wants to Be a Millionaire* quiz game, powered by an AI trivia API. Players select a category, wait while 15 progressive questions are generated on the server, then answer each question one at a time climbing a prize ladder from $100 to $1,000,000. A wrong answer ends the game immediately, showing the correct answer and the prize amount reached. Answering all 15 correctly triggers a winner screen.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15, App Router |
| UI Library | React 19 |
| Component Library | MUI v6 (`@mui/material`) |
| Styling | MUI `sx` prop + inline React styles |
| Icons | Font Awesome (`@fortawesome/react-fontawesome`) |
| Fonts | Google Fonts — Cinzel, Cinzel Decorative, Lato |
| API | RapidAPI — WWTBAM AI Quiz Game Trivia API |
| Session Storage | Browser `sessionStorage` — game data persisted between route transitions |
| Environment | `.env.local` — server-only credentials |

---

## Project Structure

```
rapid/
├── app/
│   ├── layout.js               → Root layout — fonts, MUI theme, metadata, favicon
│   ├── page.js                 → Category selection screen + GameLoader overlay
│   ├── game/
│   │   └── page.js             → Game screen, WinnerScreen, GameOverScreen
│   └── api/
│       └── generate/
│           └── route.js        → POST /api/generate — server-side API proxy
├── components/
│   ├── AnswerOption.jsx        → Single answer pill with four visual states
│   └── PrizeLadder.jsx         → 15-row prize ladder with live progress tracking
├── lib/
│   └── api.js                  → generateGame() — RapidAPI fetch helper
├── theme/
│   └── index.js                → Global MUI dark theme — palette, typography, baseline
├── public/
│   └── logo.png                → Favicon and brand logo
├── .env.local                  → Server-only credentials (not committed)
└── package.json                → Dependencies and scripts
```

---

## Application Flow

```
Browser                     Next.js Server              RapidAPI
   │                              │                         │
   │  1. Visit /                  │                         │
   │  ── Renders category grid ──▶│                         │
   │                              │                         │
   │  2. Select category          │                         │
   │     Click "Start Game"       │                         │
   │  ── POST /api/generate ─────▶│                         │
   │     GameLoader overlay shown │                         │
   │                              │── POST /generate ──────▶│
   │                              │◀── 15 questions ────────│
   │◀── Game data (JSON) ─────────│                         │
   │                              │                         │
   │  3. Save to sessionStorage   │                         │
   │     Navigate to /game        │                         │
   │                              │                         │
   │  4. Read sessionStorage      │                         │
   │     Render question 1 of 15  │                         │
   │                              │                         │
   │  5. Answer each question     │                         │
   │     (all client-side)        │                         │
   │                              │                         │
   │  6a. All correct → /game     │                         │
   │      WinnerScreen shown      │                         │
   │  6b. Wrong answer → /game    │                         │
   │      GameOverScreen shown    │                         │
   │                              │                         │
   │  7. Play Again               │                         │
   │     Clear sessionStorage     │                         │
   │     Navigate to /            │                         │
```

---

## Screens

### Category Selection (`app/page.js`)

The entry point of the application. Displays the game title and a 12-card category grid. Each card shows a Font Awesome icon, a category name, and a short description (desktop only). Selecting a card highlights it with a gold border and activates the Start Game button.

On clicking Start Game, a full-screen `GameLoader` overlay mounts over the page. The loader shows a circular SVG progress ring, a flat progress bar, rotating light rays, a breathing glow orb, rotating step messages, and pulsing dots — all in the WWTBAM gold colour palette. Progress advances automatically and stalls near 92% until the API responds, at which point the router navigates to `/game`.

### Game Screen (`app/game/page.js`)

The main gameplay screen. Reads the 15 questions from `sessionStorage` on mount. Displays one question at a time with a question counter, current prize amount, a frosted-glass question card with a difficulty badge, and four `AnswerOption` pill buttons.

On selecting an answer, all options lock immediately. After a 2-second delay the correct answer turns green and the selected wrong answer (if applicable) turns red. The game then either advances to the next question or transitions to an outcome screen.

The prize ladder is visible throughout — as a scrollable panel below the answers on mobile, and as a fixed right sidebar on desktop.

### Winner Screen (`app/game/page.js` — `WinnerScreen`)

Shown when all 15 questions are answered correctly. Features spinning gold rays, a bouncing trophy, a congratulations heading, and a `$1,000,000` prize display. Includes a Play Again button that clears session data and returns to category selection.

### Game Over Screen (`app/game/page.js` — `GameOverScreen`)

Shown on a wrong answer. Uses a dark red-tinted background. Displays the correct answer in green and the prize amount reached in gold inside a frosted-glass info card. Includes a Play Again button.

---

## API Integration

The app calls a single RapidAPI endpoint:

```
POST https://who-wants-to-be-a-millionaire-ai-quiz-game-trivia-api.p.rapidapi.com/generate?noqueue=1
```

The browser never calls this endpoint directly. All requests are proxied through the Next.js API route at `POST /api/generate`, which reads credentials from server-only environment variables and forwards the request. This keeps the `RAPIDAPI_KEY` out of the client bundle entirely.

**Request body sent to RapidAPI:**
```json
{
  "questionCount": 15,
  "language": "en",
  "category": "history",
  "difficulty": "progressive"
}
```

**Each question returned contains:** question text, four answer options (A–D), the correct answer key, prize amount, difficulty level, category, and an explanation.

For full API details see [`api.md`](./api.md) and [`route.md`](./route.md).

---

## Styling Approach

The entire application is styled using two mechanisms only — no Tailwind, no CSS modules, no external stylesheets beyond the Google Fonts `<link>` tag in `layout.js`.

**MUI `sx` prop** handles all layout, spacing, colour, typography, borders, shadows, and responsive breakpoints using the `{ xs, md }` shorthand. Breakpoints follow MUI defaults — `xs` targets mobile, `md` targets desktop (≥900px).

**Inline keyframe animations** are defined directly inside `sx` objects using the `@keyframes` key, keeping animation logic co-located with the component it belongs to.

The global visual identity is defined in `theme/index.js` — dark mode, gold primary, electric blue secondary, Cinzel Decorative for display headings, Cinzel for UI labels, and Lato for body text. For the full colour and typography reference see [`theme.md`](./theme.md).

---

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app runs on `http://localhost:3000` by default.

---

## Documentation Index

| File | Contents |
|---|---|
| [`README.md`](./README.md) | This file — project summary, structure, flow, and setup |
| [`THEME.md`](./THEME.md) | MUI theme — palette, typography, global baseline |
| [`COMPONENTS.md`](./COMPONENTS.md) | `AnswerOption` and `PrizeLadder` component reference |
| [`API.md`](./API.md) | `lib/api.js` — `generateGame` function, parameters, response shape |
| [`ROUTE.md`](./ROUTE.md) | `app/api/generate/route.js` — endpoint reference, request and response |
| [`GAMEmd`](./GAME.md) | `app/game/page.js` — game logic, state management, screen breakdown |