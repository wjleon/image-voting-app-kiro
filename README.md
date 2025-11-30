# AI Image Model Comparison Voting Application

A Next.js application for evaluating and voting on AI-generated images from different models. Features complete URL anonymization to prevent bias and full internationalization support (English/Spanish).

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Database**: Postgres with Prisma ORM
- **Internationalization**: next-intl with automatic locale detection
- **Testing**: Vitest with fast-check for property-based testing
- **Deployment**: Vercel

## Key Features

- **Unbiased Voting**: Complete URL anonymization - no model names in URLs or paths
- **Multilingual**: Full i18n support with English and Spanish
- **Fair Comparison**: Fairness algorithm ensures balanced model exposure
- **Anonymous Images**: Images served via UUID-based API endpoints
- **Session Tracking**: Cookie-based session management for vote tracking
- **Admin Dashboard**: Protected analytics and data export interface

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Postgres database

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Then edit `.env` with your actual values:

```env
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/ai_image_voting"
ADMIN_PASSWORD="your-secure-password"

# Optional
NODE_ENV="development"
```

See `.env.example` for detailed documentation of all available environment variables.

3. Set up the database:

```bash
npm run db:generate  # Generate Prisma Client
npm run db:push      # Create database tables
npm run db:seed      # Seed database (optional)
```

Or use the initialization script:

```bash
./scripts/init-db.sh
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Internationalization (i18n)

The application supports multiple languages (English and Spanish) with automatic locale detection.

### Supported Languages

- **English (en)**: Default language
- **Spanish (es)**: Fully supported with UI and prompt translations

### How It Works

1. **Automatic Locale Detection**: The app detects the user's preferred language from:
   - Browser cookie (if previously set)
   - Accept-Language header
   - Falls back to English

2. **Language Switcher**: Users can manually switch languages using the dropdown in the top-right corner

3. **Localized URLs**: All pages use locale-prefixed URLs:
   - English: `/en/...`
   - Spanish: `/es/...`

### Translation Management

#### Generating Spanish Translations

To translate all prompts to Spanish using OpenAI:

1. Set your OpenAI API key in `.env`:
   ```env
   OPENAI_API_KEY="sk-..."
   ```

2. Run the translation script:
   ```bash
   npx tsx scripts/translate-openai.ts
   ```

#### Checking Translation Coverage

To verify translation coverage:

```bash
npx tsx scripts/check-translations.ts
```

This will show:
- Total prompts
- Translated prompts
- Missing translations
- Coverage percentage

#### Backfilling English Translations

If you have existing prompts without English translations:

```bash
npx tsx scripts/backfill-english-translations.ts
```

### Adding New Languages

To add support for a new language:

1. Update `i18n.ts` to include the new locale:
   ```typescript
   export const locales = ['en', 'es', 'fr'] as const;
   ```

2. Create a new message file:
   ```bash
   cp messages/en.json messages/fr.json
   ```

3. Translate the UI strings in the new message file

4. Run the translation script for prompts:
   ```bash
   npx tsx scripts/translate-openai.ts
   ```

## URL Anonymization

The application implements complete URL anonymization to prevent voting bias:

### Anonymized Components

1. **Prompt URLs**: Use hash-based slugs instead of descriptive names
   - Before: `/es/p/claude-32-product-packaging`
   - After: `/es/p/prompt-f5fbc1e00008`

2. **Image Paths**: Hash-based filenames in anonymized folders
   - Before: `/images/claude-32-product-packaging/Claude/image.jpg`
   - After: `/images/prompt-f5fbc1e00008/a8387e2d.png`

3. **Image URLs**: Served via UUID-based API endpoint
   - Format: `/api/image/[uuid]`
   - Example: `/api/image/f944a9d7-3353-4d10-8b61-e70ca46808e9`

### Anonymization Scripts

Run these scripts to anonymize existing data:

```bash
# Anonymize prompt slugs
npx tsx scripts/anonymize-prompt-slugs.ts

# Reorganize image folders to match new slugs
npx tsx scripts/reorganize-image-folders.ts
```

## Environment Variables

The application requires the following environment variables:

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/dbname` |
| `ADMIN_PASSWORD` | Password for admin dashboard access | `your-secure-password` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Node environment | `development` |
| `NEXT_PUBLIC_APP_URL` | Base URL for the application | - |
| `OPENAI_API_KEY` | OpenAI API key for translations | - |
| `OPENAI_MODEL` | OpenAI model for translations | `gpt-4o-mini` |

### Environment Variable Validation

The application automatically validates required environment variables on startup. If any required variables are missing or invalid, you'll see a clear error message indicating what needs to be fixed.

For security:
- Never commit `.env` files to version control
- Use strong passwords for `ADMIN_PASSWORD` (minimum 8 characters)
- In production, use environment-specific values

## Database Management

View database in Prisma Studio:

```bash
npm run db:studio
```

Create a migration:

```bash
npm run db:migrate
```

Reset database (⚠️ deletes all data):

```bash
npm run db:reset
```

## Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Deployment

### Vercel Deployment

This application is optimized for deployment on Vercel.

#### Prerequisites

1. A Vercel account
2. A PostgreSQL database (Vercel Postgres, Supabase, or other provider)

#### Deployment Steps

1. **Connect your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel will auto-detect Next.js

2. **Configure environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add the following variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `ADMIN_PASSWORD`: Secure password for admin access
   - Make sure to add them for Production, Preview, and Development environments

3. **Set up the database:**
   ```bash
   # Run migrations
   npx prisma migrate deploy
   
   # Seed the database (optional)
   npx prisma db seed
   ```

4. **Deploy:**
   - Push to your main branch
   - Vercel will automatically build and deploy

#### Database Connection Pooling

For serverless environments like Vercel, use connection pooling:

- **Vercel Postgres**: Automatically configured with pooling
- **Supabase**: Use the "Connection Pooling" connection string
- **Other providers**: Consider using Prisma Data Proxy or PgBouncer

#### Post-Deployment

1. Verify environment variables are set correctly
2. Test the admin dashboard at `/admin` (username: `admin`, password: your `ADMIN_PASSWORD`)
3. Run the ingestion script to populate images
4. Monitor logs in Vercel dashboard

### Manual Deployment

If deploying to other platforms:

1. Ensure Node.js 18+ is installed
2. Set environment variables
3. Run build: `npm run build`
4. Start server: `npm start`

## Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── [locale]/                # Internationalized routes
│   │   ├── p/[slug]/           # Dynamic prompt pages
│   │   ├── admin/              # Admin dashboard
│   │   └── layout.tsx          # Locale-aware layout
│   └── api/                     # API routes
│       ├── vote/               # Vote submission
│       ├── prompts/random/     # Random prompt selection
│       ├── image/[imageId]/    # Anonymous image serving
│       └── admin/stats/        # Admin statistics
├── components/                   # React components
│   ├── ImageGrid.tsx           # Voting interface
│   ├── LanguageSwitcher.tsx    # i18n language selector
│   ├── SessionManager.tsx      # Session cookie management
│   └── VoteConfirmation.tsx    # Post-vote feedback
├── lib/                          # Utility functions
│   ├── prisma.ts               # Prisma client
│   ├── fairness.ts             # Image selection algorithm
│   ├── translations.ts         # i18n translation helpers
│   └── env.ts                  # Environment validation
├── messages/                     # i18n translation files
│   ├── en.json                 # English UI strings
│   └── es.json                 # Spanish UI strings
├── middleware.ts                 # i18n locale detection
├── i18n.ts                      # i18n configuration
├── prisma/                       # Database schema and migrations
│   └── schema.prisma           # Database models
├── public/                       # Static assets
│   └── images/                 # Anonymized image storage
│       └── prompt-[hash]/      # Hash-based folders
├── scripts/                      # Utility scripts
│   ├── anonymize-prompt-slugs.ts
│   ├── reorganize-image-folders.ts
│   ├── translate-openai.ts
│   ├── check-translations.ts
│   └── backfill-english-translations.ts
├── tests/                        # Test files
└── types/                        # TypeScript type definitions
```

## License

Private
