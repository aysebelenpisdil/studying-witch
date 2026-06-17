# Studying Witch 🧙‍♀️

A little magical companion I built to make studying feel less like a chore. She flies around your screen while you focus, celebrates when you finish tasks, and gently keeps you on track with a customizable timer.

## Demo

https://github.com/user-attachments/assets/312e1218-00fd-4e1c-9769-69f17efdb338

## What it does

- **Animated Witch Companion** — She floats around your screen during focus sessions and does a little spin when you complete something. Genuinely motivating, somehow.
- **Custom Focus Timer** — Drag the dial to set anywhere from 1 to 120 minutes. Presets for Pomodoro and deep work if you don't want to think about it.
- **Pomodoro Mode** — Classic 25/5 with a longer 15-minute break every 4 sessions.
- **Task List** — Add tasks, check them off, watch the witch celebrate. Small dopamine hits matter.
- **Forest Ambient Sounds** — Looping background audio. Helps more than you'd expect.
- **Session Stats** — See how many sessions you've done, total focus time, and tasks completed for the day.
- **Google Sign-In** — Log in with your Google account, no new passwords to forget.
- **Pixel Art Aesthetics** — Retro 16-bit visuals because why not.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4
- **Auth**: NextAuth.js with Google provider
- **Animations**: CSS keyframes + React state
- **State**: React `useState` / `useEffect` + `localStorage` persistence
- **Build**: Turbopack

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repo

```bash
git clone <repository-url>
cd studying-witch
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in your Google OAuth credentials and a NextAuth secret in `.env.local`.

4. Start the dev server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) and meet your witch.

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── signin/        # Sign-in page
│   │   └── signup/        # Sign-up page
│   ├── study/             # Main study dashboard
│   └── page.tsx           # Landing page
└── components/
    ├── WitchSprite.tsx    # Animated witch character
    ├── TimerControl.tsx   # Drag-dial focus timer
    ├── PomodoroTimer.tsx  # Classic Pomodoro timer
    ├── TodoList.tsx       # Task management
    ├── ForestSounds.tsx   # Ambient audio
    └── SimpleChart.tsx    # Daily stats chart
```

## Witch Animation States

| State | Trigger | Description |
|-------|---------|-------------|
| `idle` | Default | Gentle floating animation |
| `flying` | Timer active | Flies around the full screen |
| `spell` | Session/task complete | Spinning celebration effect |
| `sleeping` | Inactive | Dimmed idle state |

## Code Quality

Analyzed with SonarCloud — all open issues resolved. Things I paid attention to:

- Accessible form labels and ARIA attributes on interactive elements
- `Number.parseInt` over global `parseInt`
- `Math.hypot` instead of manual distance math
- `node:path` / `node:url` protocol imports
- Cognitive complexity within thresholds
- No nested ternaries in render output
- Stable React list keys
- `<track>` on `<audio>` for accessibility
- Positive condition checks (`=== 1` instead of `!== 1`) for readability

## Contributing

PRs welcome. Fork, branch, commit, push, open a PR — the usual.

---

Happy studying! 🌙
