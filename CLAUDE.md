# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**OrientaMENTE** is a Next.js 14 application for an Italian educational orientation program. It features an interactive quiz system to help students combat school dropout through guided career orientation. The app includes a public website, user authentication, an interactive quiz with radar chart results, and an admin dashboard for managing questions and viewing user responses.

**Stack**: Next.js 14 (App Router), TypeScript, Prisma, NextAuth.js, Tailwind CSS, Radix UI, Chart.js

## Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Database
npm run db:push          # Sync Prisma schema with database
npm run db:studio        # Open Prisma Studio GUI (http://localhost:5555)
npm run db:seed          # Populate database with sample data

# Build & Deploy
npm run build            # Build for production
npm run start            # Run production build
npm run lint             # Run ESLint

# Testing
node test-admin.js       # Run E2E admin tests (Puppeteer)
node test-quiz.js        # Run E2E quiz tests
```

## Database Setup

The project uses **Prisma** with SQLite for development and PostgreSQL for production.

**Initial setup:**
```bash
npx prisma db push       # Create/sync database
npm run db:seed          # Add sample data (admin user, questions)
```

**Schema location:** `prisma/schema.prisma`

**Default credentials** (created by seed script):
- Admin: `admin@orientamente.org` / `admin123`
- User: `user@orientamente.org` / `user123`

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout with SessionProvider
│   ├── auth/
│   │   ├── login/          # Login page (auto-redirects if authenticated)
│   │   └── register/       # Registration (auto-login after signup)
│   ├── quiz/page.tsx       # Interactive quiz (protected route)
│   ├── admin/page.tsx      # Admin dashboard (ADMIN role only)
│   ├── scuole/             # Schools directory
│   ├── sportello-psicologico/  # Psychological support
│   ├── workshop/           # Workshops & events
│   ├── summer-camp/        # Summer camp
│   ├── contatti/           # Contact page
│   └── api/                # API Routes
│       ├── auth/[...nextauth]/  # NextAuth routes
│       ├── quiz/           # Quiz endpoints
│       ├── admin/          # Admin CRUD
│       └── users/          # User management
├── components/
│   ├── navbar.tsx          # Main navigation with dropdown
│   └── ui/                 # shadcn/ui components
└── lib/
    ├── auth.ts             # NextAuth configuration
    ├── db.ts               # Prisma client singleton
    └── utils.ts            # Helper functions (cn, etc.)
```

### Database Schema (3 Models)

**User**
- Fields: `id`, `email` (unique), `password` (bcrypt hashed), `name`, `role` (USER/ADMIN), timestamps
- Relations: One-to-many with QuizResponse
- RBAC: `role` field controls access to admin routes

**Question**
- Fields: `id`, `question`, `options` (JSON: {a, b, c, d}), `points` (JSON: {a: 0-5, b: 0-5, c: 0-5, d: 0-5}), `category`, `order`, timestamps
- Relations: One-to-many with QuizResponse
- Note: `options` and `points` are stored as JSON strings and parsed in code

**QuizResponse**
- Fields: `id`, `userId`, `questionId`, `answer` (a/b/c/d), `createdAt`
- Relations: Many-to-one with User and Question (cascade delete)
- Unique constraint: `[userId, questionId]` (one response per question per user)

### API Routes Pattern

All API routes return JSON responses. Protected routes check session/role via `getServerSession()`.

**Example pattern:**
```typescript
// src/app/api/admin/questions/route.ts
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ... fetch and return data
}
```

### Authentication Flow (NextAuth.js)

**Configuration:** `src/lib/auth.ts`
- Provider: Credentials (email/password)
- Session strategy: JWT (stateless, no database sessions)
- Password hashing: bcryptjs with 10 salt rounds
- Auto-login: Registration form immediately signs in after creating user

**Middleware:** Protected routes check session server-side via `getServerSession(authOptions)`

**Role-based access:**
- PUBLIC: Homepage, info pages, auth pages
- USER: Quiz, profile
- ADMIN: Admin dashboard, question management, view all responses

### Quiz System

**Flow:**
1. User navigates to `/quiz` (protected route)
2. Fetch questions via `GET /api/quiz`
3. Display one question at a time with 4 radio button options (a/b/c/d)
4. Save answer to state, auto-advance to next question
5. Back button allows reviewing previous answers
6. On completion, submit all answers via `POST /api/quiz/submit`
7. Calculate total score per category, display radar chart with Chart.js

**Scoring:** Each answer option has 0-5 points. Scores are summed per category for radar chart visualization.

### Component Organization

**Layout components:**
- `navbar.tsx`: Navigation with dropdown menu (Logo, Schools, Workshop, Summer Camp, Psych Support, Contact, Login/Logout)
- `src/app/layout.tsx`: Root layout with `SessionProvider` from NextAuth

**UI library:**
- Uses shadcn/ui components built on Radix UI primitives
- Components in `src/components/ui/`: Button, Card, Input, Label, Progress, RadioGroup, Tabs
- Styling: Tailwind CSS with custom theme in `src/app/globals.css`

**Custom components:**
- Quiz: Question card, answer options, progress bar, radar chart
- Admin: User list with search/sort, question CRUD forms

## Key Integrations

### NextAuth.js
- Configuration in `src/lib/auth.ts`
- Credentials provider validates against Prisma User model
- JWT includes user `id`, `email`, `role`
- Session object typed in `next-auth.d.ts`

### Prisma
- Client singleton in `src/lib/db.ts` prevents multiple instances in dev
- Schema: `prisma/schema.prisma`
- Migrations: Use `prisma db push` for schema sync (SQLite doesn't support migrations)
- Seed script: `prisma/seed.ts` (creates admin user, sample questions)

### Tailwind CSS
- Config: `tailwind.config.ts`
- Global styles: `src/app/globals.css`
- Uses CSS variables for theming (defined in `:root`)
- Integrates with shadcn/ui component system

### Chart.js
- Radar chart for quiz results visualization
- Installed via `chart.js` and `react-chartjs-2`
- Displays category scores (0-25 range) on radar axes

### Firebase (Optional Alternative)
- Project ID: `orientamente-01`
- Firestore collections: users, questions, quizResponses
- Security rules: `firestore.rules`
- Migration script: `migrate-to-firestore.js` (SQLite → Firestore)

## Important Patterns & Conventions

### Server vs Client Components
- **Server components (default)**: Fetch data, access database, handle auth
- **Client components**: Interactive UI, forms, state management (marked with `'use client'`)
- Use `getServerSession()` for auth checks in Server Components
- Use `useSession()` hook for auth in Client Components

### Data Fetching
- Prefer server-side data fetching in page components
- Use Prisma client directly in Server Components and API routes
- Always handle errors and return appropriate status codes

### Form Handling
- Forms use Client Components with React state
- Submit handlers call API routes via `fetch()`
- Show loading states during async operations
- Display success/error messages to users

### Type Safety
- TypeScript strict mode enabled
- Prisma auto-generates types for database models
- NextAuth session types extended in `next-auth.d.ts`
- Use type assertions carefully; prefer type guards

### Styling
- Use Tailwind utility classes for styling
- Follow shadcn/ui patterns for component composition
- Responsive design: mobile-first approach
- Use `cn()` utility (from `src/lib/utils.ts`) to merge class names

## Environment Variables

Required for production:
```env
DATABASE_URL="postgresql://user:pass@host:5432/dbname"  # Or MySQL
NEXTAUTH_SECRET="<generated-secret>"  # Run: openssl rand -base64 32
NEXTAUTH_URL="https://yourdomain.com"
```

Development (auto-created if missing):
```env
DATABASE_URL="file:./dev.db"  # SQLite
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel dashboard
3. Set environment variables (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL)
4. Deploy (automatic builds on push)

### Database Migration for Production
- Switch from SQLite to PostgreSQL:
  1. Update `DATABASE_URL` in `.env` to PostgreSQL connection string
  2. Run `npx prisma db push` to create tables
  3. Run `npm run db:seed` to populate data

### Testing Deployment
- Build locally: `npm run build`
- Test production build: `npm run start`
- Check for build errors before deploying

## Common Tasks

### Adding a New Question
1. Login as admin (`admin@orientamente.org`)
2. Navigate to `/admin`
3. Click "Questions" tab
4. Click "Add Question" button
5. Fill form: question text, 4 options, points per option (0-5), category
6. Save

### Managing Users
1. Login as admin
2. Navigate to `/admin`
3. "Users" tab shows all users with:
   - Email, name, quiz score
   - Search by email/name
   - Sort by score (high to low)

### Viewing Quiz Results
- Admin: See all user responses in admin dashboard
- User: After completing quiz, radar chart displays scores by category

### Database Inspection
```bash
npm run db:studio  # Opens Prisma Studio at http://localhost:5555
```
Use Prisma Studio GUI to view/edit database records directly.

### Resetting Database
```bash
rm -f prisma/dev.db       # Delete SQLite file
npx prisma db push        # Recreate schema
npm run db:seed           # Repopulate data
```

## Troubleshooting

**Port 3000 already in use:**
```bash
PORT=3001 npm run dev
```

**Prisma client errors:**
```bash
npx prisma generate  # Regenerate Prisma client
```

**NextAuth session issues:**
- Verify `NEXTAUTH_SECRET` is set
- Clear browser cookies
- Check `NEXTAUTH_URL` matches current URL

**Build failures:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

## Testing

E2E tests use Puppeteer. Ensure dev server is running before testing.

**Available tests:**
- `test-admin-complete.js` - Full admin workflow
- `test-admin-search-sort.js` - User search/sort functionality
- `test-auto-login.js` - Auto-login after registration
- `test-quiz.js` - Quiz flow from start to results
- `test-logo.js` - Visual regression for logo
- `test-final.js` - Full application flow

**Run example:**
```bash
npm run dev              # Terminal 1: Start dev server
node test-admin.js       # Terminal 2: Run test
```

## Security Notes

- Passwords hashed with bcryptjs (10 salt rounds) before storage
- JWT tokens stored in HTTP-only cookies (not accessible to client JS)
- CSRF protection via NextAuth
- SQL injection prevented by Prisma ORM (parameterized queries)
- Role-based access control enforced on both client and server
- Never commit `.env` file or expose secrets

## Additional Documentation

- `README.md` - User-facing setup guide (Italian)
- `PROGETTO-COMPLETATO.md` - Project completion details
- `DEPLOY.md` - Detailed deployment instructions
- `README-DEPLOY.md` - Alternative deployment guide
