# Studying Witch

A magical productivity companion that helps you focus and stay organized with a customizable focus timer and task management.

## Demo

https://github.com/user-attachments/assets/312e1218-00fd-4e1c-9769-69f17efdb338

## Features

- **Animated Witch Companion** — Your magical study buddy that flies around the screen during focus sessions
- **Custom Focus Timer** — Drag-dial timer (1–120 minutes) with presets for Pomodoro and deep work
- **Pomodoro Mode** — 25-minute sessions, 5-minute short breaks, 15-minute long breaks every 4 sessions
- **Task List** — Add, complete, and delete tasks with spell celebration animations
- **Forest Ambient Sounds** — Looping background audio to help you concentrate
- **Session Stats** — Track sessions, total focus time, and completed tasks across the day
- **Google OAuth** — Sign in with your Google account
- **Pixel Art Aesthetics** — Retro 16-bit visuals with smooth CSS animations

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

1. Clone the repository

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

Fill in your Google OAuth credentials and NextAuth secret in `.env.local`.

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

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

This project is analyzed with SonarCloud. All reported Code Smells, Bugs, and Vulnerabilities have been resolved, including:

- Accessible form labels (`htmlFor`/`id` associations)
- ARIA attributes on custom interactive elements
- `Number.parseInt` over global `parseInt`
- `Math.hypot` over manual distance calculations
- `node:path` / `node:url` protocol imports
- Cognitive complexity kept within thresholds
- No nested ternary operations in render output
- Stable React list keys (no array-index keys)
- `<track>` element on `<audio>` for accessibility

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Happy studying!**
