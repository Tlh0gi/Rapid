# Game Page Documentation

**File:** `app/game/page.js`

---

## Overview

The main game screen for the WWTBAM Trivia application. This is a single client component (`'use client'`) that manages the entire in-game experience — from loading the question data out of `sessionStorage`, through presenting each question and handling answer selection, to rendering the final outcome screens when the game ends.

The file contains three exported or locally-scoped components:

| Component | Type | Description |
|---|---|---|
| `WinnerScreen` | Local function component | Shown when the player answers all 15 questions correctly |
| `GameOverScreen` | Local function component | Shown when the player selects a wrong answer |
| `GamePage` | Default export | The main game orchestrator — handles state, logic, and layout |

---

## Constants

```js
const OPTION_KEYS = ['A', 'B', 'C', 'D'];
```

Used to iterate over the four answer options in a consistent, ordered way when rendering `AnswerOption` components.

---

## GamePage

### State

| State Variable | Type | Initial Value | Description |
|---|---|---|---|
| `questions` | `array` | `[]` | The full array of 15 question objects loaded from `sessionStorage` |
| `currentIdx` | `number` | `0` | Zero-based index of the question currently being displayed |
| `selectedOption` | `string \| null` | `null` | The key (`"A"–"D"`) the player most recently clicked |
| `revealed` | `boolean` | `false` | Whether the correct answer has been revealed for the current question |
| `gameState` | `string` | `"loading"` | Controls which screen is rendered — see Game States below |
| `correctAnswer` | `string \| null` | `null` | The text of the correct answer, set only when the player gets one wrong |
| `prizeReached` | `string` | `"$0"` | The prize amount reached before the wrong answer, shown on the Game Over screen |

### Game States

The `gameState` variable drives the top-level render logic. It can hold one of four string values:

| Value | Screen Rendered | Condition |
|---|---|---|
| `"loading"` | Gold spinner with "Loading Game..." text | Initial state while `sessionStorage` is being read |
| `"playing"` | Main game layout with question card, answer options, and prize ladder | Questions loaded successfully |
| `"won"` | `WinnerScreen` component | Player answers question 15 correctly |
| `"lost"` | `GameOverScreen` component | Player selects an incorrect answer |

---

## Data Loading — `useEffect`

On mount, the component reads game data from `sessionStorage`:

```js
const raw = sessionStorage.getItem('gameData');
```

This data was saved by `app/page.js` immediately after the API call succeeded. The component handles two possible shapes from the API response:

```js
const qs = data?.content?.questions || data?.questions || [];
```

This covers both the standard RapidAPI response shape (`content.questions`) and a flattened alternative (`questions` at the root). If neither is found, or if the parsed data produces an empty array, the user is redirected back to the category selection page at `/`.

On success, `questions` state is populated and `gameState` is set to `"playing"`.

---

## Answer Selection — `handleSelect`

Called when the player clicks an `AnswerOption`. Implements a two-phase reveal:

**Phase 1 — Immediate (on click):**
- Sets `selectedOption` to the clicked key
- Sets `revealed` to `true`, which disables all further clicks and removes hover states from every option
- Determines whether the answer is correct by comparing the key to `currentQ.correct_answer`

**Phase 2 — After 2 second delay:**
A `setTimeout` of `2000ms` gives the player time to see the colour-coded result before the game advances. After the delay:

- **Correct answer:**
  - If this was the last question (`currentIdx === questions.length - 1`), sets `gameState` to `"won"`
  - Otherwise, increments `currentIdx` and resets `selectedOption` and `revealed` for the next question

- **Wrong answer:**
  - Resolves the correct answer text from `currentQ.options[currentQ.correct_answer]`
  - Sets `prizeReached` to the previous question's `prize_amount`, or `"$0"` if this was the first question
  - Sets `gameState` to `"lost"`

---

## Option State Mapping — `getOptionState`

Determines which visual state to pass to each `AnswerOption` component:

```js
const getOptionState = (key) => {
  if (!revealed) return selectedOption === key ? 'selected' : 'default';
  if (key === currentQ?.correct_answer) return 'correct';
  if (key === selectedOption && key !== currentQ?.correct_answer) return 'wrong';
  return 'default';
};
```

| Condition | Returned State |
|---|---|
| Answer not yet revealed, this key was clicked | `"selected"` |
| Answer not yet revealed, this key was not clicked | `"default"` |
| Answer revealed, this key is the correct answer | `"correct"` |
| Answer revealed, this key was selected but is wrong | `"wrong"` |
| Answer revealed, this key was neither selected nor correct | `"default"` |

This means after a wrong answer, three options show `"default"`, one shows `"correct"` (the right answer), and one shows `"wrong"` (what the player picked).

---

## Play Again — `handlePlayAgain`

Passed as the `onPlayAgain` prop to both `WinnerScreen` and `GameOverScreen`. Clears the game data from `sessionStorage` and navigates back to the category selection page:

```js
const handlePlayAgain = () => {
  sessionStorage.removeItem('gameData');
  router.push('/');
};
```

Clearing `sessionStorage` ensures the game page cannot be revisited with stale data if the player navigates back.

---

## Game Layout — Playing State

When `gameState` is `"playing"`, the page renders a two-column layout on desktop and a single stacked column on mobile.

### Structure

```
┌─────────────────────────────────┬────────────────┐
│  Header (Q count + prize)       │                │
│  Question Card                  │  Prize Ladder  │
│  Answer Options (A, B, C, D)    │  (sidebar)     │
│  [Mobile: Prize Ladder here]    │                │
└─────────────────────────────────┴────────────────┘
```

### Header Bar

A horizontal row at the top of the main column showing:
- Left: `QUESTION X OF 15` in muted white Cinzel
- Right: The current question's `prize_amount` in gold Cinzel with a drop shadow glow

### Question Card

A frosted-glass dark panel (`backdropFilter: blur(15px)`) with:
- A gold-gradient difficulty badge absolutely positioned at the top centre, sitting half outside the card border, showing `difficulty_level` from the API or `"Progressive"` as a fallback
- The question text in Cinzel, centred, with `lineHeight: 1.6` for readability

### Answer Options

Four `AnswerOption` components rendered in a `Stack` with `spacing={1.5}`. Only options where `options[key]` is truthy are rendered, guarding against incomplete API responses.

Each option receives:
- `label` — `"A"`, `"B"`, `"C"`, or `"D"`
- `text` — the answer string from `currentQ.options`
- `state` — computed by `getOptionState(key)`
- `onClick` — calls `handleSelect(key)`
- `disabled` — set to `revealed`, locking all options once one is selected

### Prize Ladder Placement

The `PrizeLadder` component is rendered twice with identical props but different visibility:

| Instance | Visibility | Container |
|---|---|---|
| Mobile | `display: { xs: 'block', md: 'none' }` | Below the answer options, full width |
| Desktop | `display: { xs: 'none', md: 'flex' }` | Fixed `240px` right sidebar, `flexShrink: 0` |

---

## WinnerScreen

Rendered when `gameState === "won"`. A full-viewport centred layout on the navy-to-deep-blue background.

### Visual Elements

- **Spinning rays:** 12 absolutely positioned `2px` wide gradient lines radiating from the centre, each rotated `30deg` apart and animated with a continuous 20-second spin. Each ray has an independently defined `@keyframes spin` using its own start angle to maintain correct initial positions.
- **Trophy emoji:** Bouncing scale animation cycling between `scale(1)` and `scale(1.2)` every 1 second.
- **"CONGRATULATIONS!"** heading in `h2` variant with a three-stop gold gradient applied via `WebkitBackgroundClip: text` and a `drop-shadow` filter glow.
- **"You are a Millionaire!"** subtitle in Cinzel gold.
- **"$1,000,000"** prize display in Cinzel Decorative at maximum weight with a strong `textShadow` glow.
- **Play Again button:** Gold gradient pill button with a hover scale and intensified glow.

### Props

| Prop | Type | Description |
|---|---|---|
| `onPlayAgain` | `function` | Called when the Play Again button is clicked — clears session and navigates to `/` |

---

## GameOverScreen

Rendered when `gameState === "lost"`. A full-viewport centred layout on a dark red-tinted background (`#1A0505` midpoint) to signal failure.

### Visual Elements

- **Broken heart emoji** at large size.
- **"GAME OVER"** heading in `h2` variant styled in `#FF4444` red with a matching red drop-shadow glow.
- **Info card:** A frosted-glass panel (`backdropFilter: blur(10px)`) showing two pieces of information separated by a gold divider line:
  - **Correct Answer** — the text of the right answer in `#00E676` green
  - **Prize Reached** — the prize amount from the last correctly answered question in gold, or `"$0"` if the player was wrong on question 1
- **Play Again button:** Same gold gradient pill as the Winner screen.

### Props

| Prop | Type | Description |
|---|---|---|
| `correctAnswer` | `string` | The text of the correct answer to display |
| `prizeReached` | `string` | The prize amount reached before the wrong answer |
| `onPlayAgain` | `function` | Called when the Play Again button is clicked |

---

## Responsiveness Summary

| Element | Mobile | Desktop |
|---|---|---|
| Page layout direction | Column | Row |
| Question counter font | `11px` | `13px` |
| Prize amount font | `13px` | `15px` |
| Question card padding | `20px` | `32px` |
| Question text font | `14px` | `18px` |
| Prize ladder | Below answers, full width, scrollable | Right sidebar, `240px` wide |
| Winner trophy emoji | `60px` | `80px` |
| Congratulations heading | `28px` | `48px` |
| Prize amount display | `36px` | `56px` |
| Game over emoji | `50px` | `70px` |
| Game over heading | `26px` | `42px` |