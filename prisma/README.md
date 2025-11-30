# Prisma Database Setup

This directory contains the Prisma schema and database configuration for the AI Image Voting Application.

## Database Schema

The application uses four main tables:

### 1. Prompts
Stores the text prompts used to generate images across different AI models.

**Fields:**
- `id` (UUID) - Primary key
- `text` (String) - The prompt text
- `slug` (String) - URL-friendly identifier (unique)
- `createdAt` (DateTime) - Creation timestamp

### 2. Images
Stores information about each AI-generated image.

**Fields:**
- `id` (UUID) - Primary key
- `promptId` (UUID) - Foreign key to Prompt
- `modelName` (String) - AI model that generated the image
- `imagePath` (String) - Path to the image file
- `impressionCount` (Int) - Number of times displayed (default: 0)
- `createdAt` (DateTime) - Creation timestamp

**Indexes:**
- `(promptId, impressionCount)` - For efficient fairness algorithm queries

### 3. Votes
Stores user votes with comprehensive metadata.

**Fields:**
- `id` (UUID) - Primary key
- `promptId` (UUID) - Foreign key to Prompt
- `imageId` (UUID) - Foreign key to Image (nullable)
- `chosenModel` (String) - Model the user voted for
- `shownModels` (JSON) - Array of 4 model names shown
- `userIp` (String) - User's IP address
- `userAgent` (String) - Raw user agent string
- `browser` (String) - Parsed browser name (nullable)
- `os` (String) - Parsed operating system (nullable)
- `device` (String) - Parsed device type (nullable)
- `country` (String) - Country from Vercel headers (nullable)
- `region` (String) - Region/city from Vercel headers (nullable)
- `sessionId` (String) - User session identifier
- `timestamp` (DateTime) - Vote timestamp

**Indexes:**
- `promptId` - For filtering votes by prompt
- `chosenModel` - For aggregating votes by model
- `timestamp` - For date range queries

### 4. ImageImpressions
Optional table for detailed impression tracking.

**Fields:**
- `id` (UUID) - Primary key
- `promptId` (String) - Prompt identifier
- `imageId` (UUID) - Foreign key to Image
- `modelName` (String) - Model name
- `sessionId` (String) - User session identifier (nullable)
- `timestamp` (DateTime) - Impression timestamp

**Indexes:**
- `imageId` - For querying impressions by image
- `timestamp` - For date range queries

## Setup Instructions

### 1. Configure Database Connection

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ai_image_voting"
```

For Vercel Postgres:
```env
DATABASE_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
```

### 2. Create Database Tables

For development (creates tables without migrations):
```bash
npx prisma db push
```

For production (creates migration files):
```bash
npx prisma migrate dev --name init
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

This generates the TypeScript types and client in `node_modules/@prisma/client`.

### 4. Seed Database (Optional)

After running the ingestion script:
```bash
npx prisma db seed
```

## Useful Commands

### View Database in Prisma Studio
```bash
npx prisma studio
```

Opens a web interface at http://localhost:5555 to browse and edit data.

### Reset Database
```bash
npx prisma migrate reset
```

⚠️ Warning: This deletes all data!

### Format Schema
```bash
npx prisma format
```

### Validate Schema
```bash
npx prisma validate
```

## Connection Pooling for Serverless

The Prisma client in `lib/prisma.ts` is configured for serverless environments:

- Reuses connections in development
- Logs queries in development mode
- Optimized for Vercel's serverless functions

For production with high traffic, consider:
- [Prisma Accelerate](https://www.prisma.io/accelerate) for connection pooling
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) with built-in pooling
- External connection pooler like PgBouncer

## Migration Strategy

1. **Development**: Use `prisma db push` for rapid iteration
2. **Production**: Use `prisma migrate deploy` in CI/CD pipeline
3. **Schema Changes**: Create migrations with `prisma migrate dev`

## Troubleshooting

### Connection Issues
- Verify DATABASE_URL is correct
- Check database is running and accessible
- Ensure SSL mode is configured correctly for cloud databases

### Type Errors
- Run `npx prisma generate` after schema changes
- Restart TypeScript server in your editor

### Migration Conflicts
- Use `prisma migrate resolve` to mark migrations as applied
- Consider `prisma migrate reset` for development databases
