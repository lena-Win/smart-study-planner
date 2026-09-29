# Study Zen
Study Zen is a responsive productivity application designed to combine focused study, planning, reflection, and visual progress tracking in one interface.

## Live Demo
https://smart-study-planner-1o8z.onrender.com

## Features
### Focus
- Custom study subjects
- Focus timer
- Session tracking
- Completed session history

### Planner
- Calendar-based task management
- Task dates, times, and categories
- Completion tracking
- Monthly intentions

### Journal
- Mood-based reflection prompts
- Free-form journal entries
- Entry history and management

### Garden
- Visual representation of user progress
- Multiple plant types and growth stages
- Progress based on activity across the application
- Mood-specific environments

### Personalization
- Four moods: Calm, Focus, Reflect, Restore
- Four visual themes: Morning, Forest, Sunset, Night
- Consistent theme and mood system across the application

## Tech Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- LocalStorage

## Data Storage
The current version uses browser LocalStorage to persist focus sessions, planner tasks, journal entries, preferences, and other application data.

## Local Development
Clone the repository:

```bash
git clone https://github.com/lena-Win/smart-study-planner.git
```

Install dependencies:

```bash
cd smart-study-planner/frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```