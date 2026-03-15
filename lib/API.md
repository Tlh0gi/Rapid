# API Library Documentation

**File:** `lib/api.js`

---

## Overview

The core server-side API helper responsible for communicating with the *Who Wants to Be a Millionaire* RapidAPI service. This module is only ever called from the Next.js API route (`app/api/generate/route.js`) — it never runs in the browser. All credentials are read from server-side environment variables, ensuring they are never exposed to the client.

---

## Environment Variables

Both variables must be defined in your `.env.local` file at the root of the project. The server must be restarted after any change to these values.

| Variable | Description |
|---|---|---|
| `RAPIDAPI_KEY` | Your personal RapidAPI subscription key |  
| `RAPIDAPI_HOST` | The RapidAPI host for this specific API | 

> **Important:** Do not prefix these with `NEXT_PUBLIC_`. Variables prefixed with `NEXT_PUBLIC_` are bundled into the client-side JavaScript and would expose your API key publicly in the browser. Without the prefix, they remain server-only.

---

## URL Construction

```js
const BASE_URL = `https://${RAPIDAPI_HOST}/generate?noqueue=1`;
```

The base URL is constructed dynamically from `RAPIDAPI_HOST`. The `?noqueue=1` query parameter instructs the RapidAPI service to generate the game immediately rather than queuing the request, which is required for a responsive user experience.

---

## Function: `generateGame`

The single exported function in this module. Makes a `POST` request to the RapidAPI endpoint and returns the parsed game data.

### Signature

```js
export async function generateGame({
  category,
  language = 'en',
  questionCount = 15,
  difficulty = 'progressive'
})
```

### Parameters

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `category` | `string` | Yes | — | The trivia category — e.g. `"history"`, `"science"`, `"sports"` |
| `language` | `string` | No | `"en"` | ISO language code. The API supports 100+ languages. Currently hardcoded to English in the app |
| `questionCount` | `number` | No | `15` | Total number of questions to generate. 15 is the classic WWTBAM format |
| `difficulty` | `string` | No | `"progressive"` | Difficulty progression style. `"progressive"` means questions increase in difficulty as the prize climbs |

### Request

The function serialises the parameters into a JSON body and sends the following headers:

| Header | Value |
|---|---|
| `x-rapidapi-key` | Value of `process.env.RAPIDAPI_KEY` |
| `x-rapidapi-host` | Value of `process.env.RAPIDAPI_HOST` |
| `Content-Type` | `application/json` |

`cache: 'no-store'` is set on the fetch call to prevent Next.js from caching the response. Every game session must receive freshly generated questions.

### Response

On a successful `200` response the function parses the JSON body and returns the full data object to the caller. The caller (`route.js`) then forwards this directly to the client.

The returned object contains:

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

The `content.questions` array is what the game page reads from `sessionStorage` to drive gameplay. Each question object contains:

| Field | Description |
|---|---|
| `question_number` | 1-based position in the game |
| `prize_amount` | Prize value for this question — e.g. `"$1,000"` |
| `question` | The question text |
| `options` | Object with keys `A`, `B`, `C`, `D` mapping to answer strings |
| `correct_answer` | The key of the correct option — `"A"`, `"B"`, `"C"`, or `"D"` |
| `difficulty_level` | Difficulty label for this specific question |
| `category` | The category this question belongs to |
| `explanation` | Explanation of the correct answer |

### Error Handling

If the HTTP response status is not `ok` (i.e. not in the 2xx range), the function reads the raw error text from the response body and throws a descriptive error:

```js
throw new Error(`API error ${response.status}: ${errorText}`);
```

This error message is caught by `route.js` and returned to the client as a `500` JSON response, making it visible in the browser and in the terminal logs for debugging.

The `console.log('Response status:', response.status)` line logs every response status to the terminal regardless of success or failure, which is useful during development to confirm the API is being reached.

---

## Example Call

```js
const data = await generateGame({
  category: 'history',
  language: 'en',
  questionCount: 15,
  difficulty: 'progressive',
});
```

---

## Notes

- This file has no default export — only the named export `generateGame`.
- The function is `async` and must always be called with `await`.
- The `RAPIDAPI_HOST` environment variable doubles as both the URL host segment and the value of the `x-rapidapi-host` header, which is a requirement of the RapidAPI platform.