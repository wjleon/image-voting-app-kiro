# AI Image Model Comparison Voting Application

A Next.js application for evaluating and voting on AI-generated images from different models. Features complete URL anonymization to prevent bias and full internationalization support (English/Spanish).

## 📚 Documentation Index

This README serves as the main entry point. For detailed information on specific topics, see:

- **[SETUP.md](./SETUP.md)** - Initial setup and installation guide
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Database configuration and schema
- **[INGESTION_GUIDE.md](./INGESTION_GUIDE.md)** - How to add new images and prompts
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions for Vercel and other platforms
- **[IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md)** - Current implementation status and features
- **[I18N_IMPLEMENTATION_SUMMARY.md](./I18N_IMPLEMENTATION_SUMMARY.md)** - Internationalization implementation details
- **[PROGRESS.md](./PROGRESS.md)** - Development progress and milestones
- **[FINAL_SUMMARY.md](./FINAL_SUMMARY.md)** - Project completion summary
- **[CRITICAL_FIXES_COMPLETE.md](./CRITICAL_FIXES_COMPLETE.md)** - Critical bug fixes log
- **[FIXES_VERIFIED.md](./FIXES_VERIFIED.md)** - Verification of fixes
- **[prisma/README.md](./prisma/README.md)** - Prisma schema documentation
- **[images/AI_Image_Generator_Showdown_2025_Update.md](./images/AI_Image_Generator_Showdown_2025_Update.md)** - Image dataset information

### Spec Documents (Development Process)
- **[.kiro/specs/ai-image-voting-app/](../.kiro/specs/ai-image-voting-app/)** - Original app specification
- **[.kiro/specs/i18n/](../.kiro/specs/i18n/)** - Internationalization specification
- **[.kiro/specs/navigation-about/](../.kiro/specs/navigation-about/)** - Navigation and About page specification

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
- **Global Navigation**: Glassmorphism navigation bar with language switcher
- **About Page**: Creator profile with bio and social media links

## 🚀 Quick Start

For detailed setup instructions, see **[SETUP.md](./SETUP.md)**.

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Postgres database

### Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your database URL and admin password

# 3. Set up database
npm run db:generate
npm run db:push

# 4. Ingest images and generate translations (if you have images)
npm run ingest

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

For more details, see:
- **[SETUP.md](./SETUP.md)** - Complete setup guide
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Database configuration
- **[INGESTION_GUIDE.md](./INGESTION_GUIDE.md)** - Adding images

## 🌍 Internationalization (i18n)

The application supports multiple languages (English and Spanish) with automatic locale detection.

For complete i18n documentation, see **[I18N_IMPLEMENTATION_SUMMARY.md](./I18N_IMPLEMENTATION_SUMMARY.md)**.

### Quick i18n Guide

**Supported Languages:**
- English (en) - Default
- Spanish (es) - Fully supported

**Generate Translations:**
```bash
# Translate all prompts to Spanish
npx tsx scripts/translate-openai.ts

# Check translation coverage
npx tsx scripts/check-translations.ts
```

**Adding New Languages:**
See [I18N_IMPLEMENTATION_SUMMARY.md](./I18N_IMPLEMENTATION_SUMMARY.md) for detailed instructions.

## 👤 Customizing the About Page

To customize the About page with your information:

1. **Update Profile Info** - Edit `messages/en.json` and `messages/es.json`:
   ```json
   {
     "About": {
       "name": "Your Name",
       "tagline": "Your Title",
       "bioText": "Your bio...",
       "linkedinUrl": "https://linkedin.com/in/your-profile",
       "mediumUrl": "https://medium.com/@your-profile",
       "githubUrl": "https://github.com/your-username"
     }
   }
   ```

2. **Update Profile Image** - Replace `public/images/profile.jpg` with your photo (256x256px recommended)

## 🔒 URL Anonymization

The application implements complete URL anonymization to prevent voting bias. All URLs use hash-based identifiers instead of descriptive names.

**Examples:**
- Prompt URLs: `/es/p/prompt-f5fbc1e00008`
- Image URLs: `/api/image/f944a9d7-3353-4d10-8b61-e70ca46808e9`

For details, see **[IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md)**.

## ⚙️ Environment Variables

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `ADMIN_PASSWORD` - Admin dashboard password (min 8 characters)

**Optional:**
- `OPENAI_API_KEY` - For generating translations
- `OPENAI_MODEL` - Translation model (default: `gpt-4o-mini`)

See `.env.example` for complete documentation.

## 📥 Adding Images and Prompts

To add new images to the voting app:

```bash
# Complete ingestion process (recommended)
npm run ingest
```

This will:
1. Scan your `images/` folder
2. Generate seed file
3. Populate database
4. Generate Spanish translations
5. Verify coverage

For detailed instructions, see **[INGESTION_GUIDE.md](./INGESTION_GUIDE.md)**.

## 💾 Database Management

```bash
npm run db:studio    # View database in Prisma Studio
npm run db:migrate   # Create a migration
npm run db:reset     # Reset database (⚠️ deletes all data)
```

For detailed database setup, see **[DATABASE_SETUP.md](./DATABASE_SETUP.md)**.

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

## 🚀 Deployment

This application is optimized for Vercel deployment.

**Quick Deploy:**
1. Connect repository to Vercel
2. Set environment variables (`DATABASE_URL`, `ADMIN_PASSWORD`)
3. Deploy

For complete deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

## Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── [locale]/                # Internationalized routes
│   │   ├── p/[slug]/           # Dynamic prompt pages
│   │   ├── about/              # About page with creator info
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
│   ├── Navigation.tsx          # Global navigation bar
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

## 📖 Additional Documentation

- **[INGESTION_GUIDE.md](./INGESTION_GUIDE.md)** - Complete guide for adding images
- **[PROGRESS.md](./PROGRESS.md)** - Development timeline and milestones
- **[IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md)** - Feature implementation status
- **[FINAL_SUMMARY.md](./FINAL_SUMMARY.md)** - Project completion summary

## 📝 License

Private
