# Components Documentation

**Directory:** `components/`

This document covers the two reusable UI components used in the game screen: `AnswerOption` and `PrizeLadder`. Both are client components (`'use client'`) styled exclusively with MUI `sx` props and inline styles — no Tailwind or external CSS.

---

## AnswerOption

**File:** `components/AnswerOption.jsx`

### Purpose

Renders a single answer choice (A, B, C, or D) as a pill-shaped interactive button. Visually reflects the current selection state using colour-coded styles, and locks interaction once an answer has been revealed.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | Yes | The letter label displayed in the circular badge — `"A"`, `"B"`, `"C"`, or `"D"` |
| `text` | `string` | Yes | The answer text displayed to the right of the badge |
| `state` | `string` | Yes | Controls the visual appearance — see State Values below |
| `onClick` | `function` | Yes | Callback fired when the option is clicked. Ignored if `disabled` is true |
| `disabled` | `boolean` | Yes | When true, click events are suppressed and hover styles are removed |

### State Values

The `state` prop drives all visual styling through the `getStyles()` function. There are four possible values:

**`"default"`**
The resting state before the user has selected anything. Dark navy background with a subtle gold border. The label badge has a translucent gold fill and the text is white.

**`"selected"`**
Applied immediately when the user clicks this option, before the correct answer is revealed. Orange background gradient, orange border, and orange label badge. Signals that this choice is pending evaluation.

**`"correct"`**
Applied to the option whose label matches `correct_answer` from the API, after the answer is revealed. Green background gradient, green border, and green label badge. Used whether or not this was the option the user selected.

**`"wrong"`**
Applied to the option the user selected if it does not match `correct_answer`. Red background gradient, red border, and red label badge.

### Style Reference

| State | Background | Border | Label Background | Text Colour | Glow |
|---|---|---|---|---|---|
| `default` | Dark navy gradient | `rgba(255,215,0,0.35)` | `rgba(255,215,0,0.15)` | `#FFFFFF` | None |
| `selected` | Orange gradient | `#FFA500` | `#FFA500` | `#FFA500` | Orange `0 0 20px` |
| `correct` | Green gradient | `#00E676` | `#00E676` | `#00E676` | Green `0 0 20px` |
| `wrong` | Red gradient | `#FF4444` | `#FF4444` | `#FF4444` | Red `0 0 20px` |

### Hover Behaviour

Hover is only active when `disabled` is `false`. On hover the option shifts to a gold-tinted background with a stronger gold border, a 1% scale increase, and a gold outer glow. Once `disabled` is set to `true` (after a selection is made), all hover styles are removed and the cursor reverts to `default`.

### Layout

The component uses a horizontal `flex` row. The circular letter badge sits on the left at a fixed size (`28px` mobile / `34px` desktop) and the answer text sits to its right with `lineHeight: 1.4` to handle multi-line answers gracefully. The entire pill has `borderRadius: 50px` and `backdropFilter: blur(8px)` for the frosted-glass depth effect.

### Responsiveness

| Property | Mobile (`xs`) | Desktop (`md`) |
|---|---|---|
| Horizontal padding | `16px` | `24px` |
| Vertical padding | `12px` | `16px` |
| Badge size | `28 x 28px` | `34 x 34px` |
| Label font size | `12px` | `14px` |
| Answer text font size | `13px` | `15px` |

### Example Usage

```jsx
<AnswerOption
  label="A"
  text="Julius Caesar"
  state={getOptionState('A')}
  onClick={() => handleSelect('A')}
  disabled={revealed}
/>
```

---

## PrizeLadder

**File:** `components/PrizeLadder.jsx`

### Purpose

Displays the full 15-question prize ladder as a vertical list, showing the question number and prize amount for each step. The list is rendered in reverse order (highest prize at the top, lowest at the bottom) to match the classic WWTBAM television format. Each row is visually styled based on whether it is in the past, current, or future, and whether it is a milestone question.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `questions` | `array` | Yes | The full questions array from the API response. Each item must have a `prize_amount` field |
| `currentQuestion` | `number` | Yes | The zero-based index of the question the player is currently on |
| `answeredCorrectly` | `boolean` | No | Reserved prop — not yet used in rendering logic |

### Milestone Questions

The constant `PRIZE_MILESTONES` defines which question numbers receive special milestone styling:

```js
const PRIZE_MILESTONES = [1, 5, 10];
```

Milestone rows use electric blue (`#00BFFF`) text and a blue-tinted border instead of the default muted white. These represent safe haven amounts in the game.

### Row States

Each row in the ladder is evaluated against four conditions on every render:

| State | Condition | Background | Border | Text Colour | Indicator |
|---|---|---|---|---|---|
| **Current** | `questionNum === currentQuestion + 1` | Gold gradient `rgba(255,215,0,0.25)` | `rgba(255,215,0,0.6)` | `#FFD700` | Pulsing gold dot |
| **Past** | `questionNum <= currentQuestion` | Green tint `rgba(0,230,118,0.08)` | Transparent | `#00E676` | Green `✓` tick |
| **Milestone** | `PRIZE_MILESTONES.includes(questionNum)` | Blue tint `rgba(0,191,255,0.06)` | `rgba(0,191,255,0.3)` | `#00BFFF` | None |
| **Default** | None of the above | Transparent | Transparent | `rgba(255,255,255,0.5)` | None |

Note: `isCurrent` takes precedence over `isPast` in the rendering order. A row can only match one visual state at a time.

### Current Question Indicator

The active row renders a small `6 x 6px` circular dot to the right of the prize amount. It pulses continuously using a CSS keyframe animation:

```
0%, 100% → opacity 1, scale 1
50%      → opacity 0.5, scale 1.4
```

The dot is gold (`#FFD700`) with a matching `boxShadow` glow to make it clearly visible.

### Layout and Scrolling

On desktop the component renders as a fixed `220px` wide sidebar panel. On mobile it collapses to full width with a `maxHeight` of `180px` and becomes vertically scrollable to preserve screen space for the question and answer area. The scrollbar is custom-styled — `4px` wide with a translucent gold thumb and invisible track.

| Property | Mobile (`xs`) | Desktop (`md`) |
|---|---|---|
| Width | `100%` | `220px` |
| Max height | `180px` (scrollable) | `100vh` |
| Position | Below answer options | Right sidebar |

### Responsiveness

The component is placed differently depending on screen size. In `app/game/page.js`:

- **Desktop:** Rendered in a `240px` wide sidebar column to the right of the main game area using `display: { xs: 'none', md: 'flex' }`
- **Mobile:** Rendered below the answer options inside the main column using `display: { xs: 'block', md: 'none' }`

Both instances use the same `<PrizeLadder />` component with identical props — only their container placement differs.

### Example Usage

```jsx
<PrizeLadder
  questions={questions}
  currentQuestion={currentIdx}
/>
```

---

## Shared Design Patterns

Both components follow the same set of conventions:

- **Font pairing:** Cinzel serif for labels, numbers, and letter badges. Lato sans-serif for answer content and prize amounts.
- **Backdrop blur:** `backdropFilter: blur(8px–10px)` on all panels for a frosted-glass depth effect consistent with the dark background.
- **Transitions:** All interactive state changes use `transition: 'all 0.3s ease'` for smooth colour and shadow shifts.
- **Glow effects:** Active and feedback states use `boxShadow` with colour-matched rgba values to create a soft halo that reinforces the broadcast TV aesthetic.
- **No external CSS:** All styling is done via MUI `sx` props. No CSS modules, Tailwind classes, or stylesheet imports are used.