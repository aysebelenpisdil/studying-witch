# Studying Witch

A magical productivity companion that helps you focus and stay organized with Pomodoro timer sessions and task management.

## Demo

https://github.com/user-attachments/assets/312e1218-00fd-4e1c-9769-69f17efdb338

## Features

- **Animated Witch Companion**: Your magical study buddy that flies around during focus sessions
- **Pomodoro Timer**: 25-minute focus sessions with magical breaks
- **Todo List**: Task management with celebration animations
- **Pixel Art Aesthetics**: Retro gaming vibes with modern functionality
- **Progress Tracking**: Monitor your study streaks and completed tasks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Pixel Art Assets

The project is structured to support custom pixel art sprites:

```
public/sprites/witch/
├── animations/
│   ├── witch_idle.png      (4 frames, 192x48px)
│   ├── witch_flying.png    (6 frames, 288x48px)
│   ├── witch_walking.png   (8 frames, 384x48px)
│   ├── witch_studying.png  (6 frames, 288x48px)
│   ├── witch_spell.png     (8 frames, 384x48px)
│   └── witch_sleeping.png  (4 frames, 192x48px)
└── metadata/
    └── animations.json     (Animation configurations)
```

### Creating Pixel Art

**Recommended Tools:**
- [Aseprite](https://www.aseprite.org/) - Professional pixel art editor ($19.99)
- [Piskel](https://piskelapp.com) - Free web-based editor

**Specifications:**
- Frame size: 48x48 pixels
- Style: 16-color pixel art
- Animation: Horizontal sprite sheets
- Export: PNG format with JSON metadata

## Witch Animation States

| Animation | Trigger | Frames | FPS | Description |
|-----------|---------|--------|-----|-------------|
| `idle` | Default state | 4 | 2 | Gentle breathing |
| `flying` | Timer active | 6 | 8 | Flying on broomstick |
| `walking` | Moving around | 8 | 12 | Walking with broomstick |
| `studying` | Study mode | 6 | 3 | Reading/writing |
| `spell` | Task completed | 8 | 10 | Casting celebration spell |
| `sleeping` | Inactive | 4 | 1 | Sleeping with hat over eyes |

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Custom React hooks + CSS
- **State Management**: React useState/useEffect
- **Build Tool**: Turbopack

## Features Overview

### Pomodoro Timer
- 25-minute focus sessions
- 5-minute short breaks  
- 15-minute long breaks (every 4 sessions)
- Visual progress ring
- Session tracking

### Todo List
- Add/remove tasks
- Mark tasks as complete
- Progress visualization
- Celebration animations when tasks completed

### Witch Companion
- Responds to timer states
- Flies around during focus time
- Celebrates task completions with spell animations
- Sleeps during inactive periods

## AI-Generated Pixel Art Prompts

Use these prompts with DALL-E, Midjourney, or other AI generators:

```
"32x32 pixel art witch character sprite, purple pointed hat, 
orange/brown cape, holding wooden broomstick, cute kawaii style, 
transparent background, retro 16-bit game aesthetic"

"pixel art animation frames of witch flying on broomstick, 
side view, cape flowing, magical sparkles, 6 frame animation, 
32x32 pixels each frame, retro gaming style"

"pixel art witch casting spell animation, staff raised, 
magical effects, celebration pose, 8 animation frames, 
purple and gold colors, 32x32 pixels"
```

## Pixel Art Design Tips

1. **Color Palette**: Stick to 16 colors max
2. **Consistency**: Keep the same art style across all animations
3. **Readable at Small Size**: Design should be clear at 48x48 pixels
4. **Character Features**: 
   - Purple pointed witch hat
   - Flowing cape/robe
   - Wooden broomstick
   - Friendly expression
   - Maybe add a small familiar (cat, owl)

## Future Enhancements

- [ ] User authentication & profiles
- [ ] Cloud data synchronization
- [ ] Achievement/badge system
- [ ] Custom themes and witch designs
- [ ] Ambient study music
- [ ] Detailed study statistics
- [ ] Social features & study groups
- [ ] Mobile app version

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Happy studying!**
