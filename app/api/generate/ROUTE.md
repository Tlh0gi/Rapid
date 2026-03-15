# API Route Documentation

**File:** `app/api/generate/route.js`

---

## Overview

A Next.js App Router server-side API route that acts as the secure bridge between the client (browser) and the RapidAPI service. The browser never calls RapidAPI directly — all requests are proxied through this route, which keeps the `RAPIDAPI_KEY` hidden on the server.

This route handles a single HTTP method: `POST`.

---

## Endpoint

```
POST /api/generate
```

This URL is automatically derived from the file's location in the App Router directory structure: `app/api/generate/route.js` → `/api/generate`.

---

## Why This Route Exists

Next.js server-side environment variables (those without the `NEXT_PUBLIC_` prefix) are not accessible in the browser. By routing the API call through this file, the app can:

- Keep `RAPIDAPI_KEY` and `RAPIDAPI_HOST` completely server-side
- Validate the request before it reaches RapidAPI
- Return consistent, structured error responses to the client

---

## Request

### Method
`POST`

### Headers
```
Content-Type: application/json
```

### Body

The request body must be a valid JSON object. All fields are forwarded directly to `lib/api.js`.

| Field | Type | Required | Description |
|---|---|---|---|
| `category` | `string` | Yes | Trivia category — e.g. `"history"`, `"science"`, `"sports"` |
| `language` | `string` | No | Language code — defaults to `"en"` in `lib/api.js` if omitted |
| `questionCount` | `number` | No | Number of questions — defaults to `15` in `lib/api.js` if omitted |
| `difficulty` | `string` | No | Difficulty mode — defaults to `"progressive"` in `lib/api.js` if omitted |

### Example Request Body

```json
{
  "category": "history",
  "language": "en",
  "questionCount": 15,
  "difficulty": "progressive"
}
```

---

## Response

### Success — `200 OK`

Returns the full parsed JSON response from RapidAPI, forwarded without modification.

```json
{
  "status": "success",
  "content": {
    "game_settings": { ... },
    "questions": [ ... ],
    "lifelines": { ... },
    "prize_structure": { ... }
  }
}
```

### Validation Error — `400 Bad Request`

Returned when `category` is missing from the request body.

```json
{
  "error": "Category is required"
}
```

### Server Error — `500 Internal Server Error`

Returned when `generateGame` throws — for example if the RapidAPI key is invalid, the host is unreachable, or the API returns a non-2xx status.

```json
{
  "error": "API error 403: ..."
}
```

The error message is taken directly from the thrown error's `.message` property, which in `lib/api.js` includes the HTTP status code and the raw error body from RapidAPI. This makes it easy to diagnose the root cause from the browser's network tab or the terminal.

---

## How It Works — Step by Step

1. The client sends a `POST` request to `/api/generate` with the chosen category in the body.
2. The route parses the JSON body using `request.json()`.
3. It validates that `category` is present. If not, it returns a `400` immediately.
4. It calls `generateGame()` from `lib/api.js`, passing all four parameters.
5. `generateGame()` makes the actual call to RapidAPI with the server-side credentials.
6. On success, the route returns the full RapidAPI response as JSON with a `200` status.
7. On any error, the route catches the thrown error, logs it to the terminal with `console.error`, and returns a `500` with the error message.

---

## Error Logging

```js
console.error('Game generation error:', error);
```

All errors are logged to the server terminal. During development this will appear in the `npm run dev` output. This is the primary place to look when the client reports a `500` error — the full error object including stack trace will be visible here.

---

## Calling This Route From the Client

The category selection page (`app/page.js`) calls this route as follows:

```js
const res = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    category: selected,
    language: 'en',
    questionCount: 15,
    difficulty: 'progressive',
  }),
});

const data = await res.json();
if (!res.ok) throw new Error(data.error || 'Failed to generate game');
```

On success, `data` contains the full game object which is saved to `sessionStorage` and used by `app/game/page.js` to drive the game.