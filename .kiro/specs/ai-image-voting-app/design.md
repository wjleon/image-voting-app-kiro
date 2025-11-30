# Design Document

## Overview

The AI Image Model Comparison Voting Application is a Next.js-based web application that enables unbiased evaluation of AI-generated images from ten different models. The system consists of three main phases: (1) a local ingestion process that converts a folder structure into database records and deployed assets, (2) a runtime voting interface that displays prompts and images using a fairness algorithm, and (3) an admin analytics panel for data analysis.

The application prioritizes statistical validity through a fairness algorithm that ensures balanced exposure across all models by tracking impression counts and selecting the least-viewed images. All data persists in Postgres, and the system captures comprehensive metadata for each vote including geolocation, device information, and session tracking.

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Local Development                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Challenge Folders (images/, _prompt.txt files)    │    │
│  └──────────────────┬─────────────────────────────────┘    │
│                     │                                        │
│                     ▼                                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Ingestion Script (Node.js)                 │    │
│  │  - Scans folder structure                          │    │
│  │  - Normalizes model names                          │    │
│  │  - Copies images to /public or cloud storage       │    │
│  │  - Generates DB seed data                          │    │
│  └──────────────────┬─────────────────────────────────┘    │
└────────────────────┼──────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Deployment                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Next.js App Router                    │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────┐    │    │
│  │  │  Pages (React Server Components)         │    │    │
│  │  │  - / (redirect to random prompt)         │    │    │
│  │  │  - /p/[slug] (prompt voting page)        │    │    │
│  │  │  - /admin (analytics dashboard)          │    │    │
│  │  └──────────────────────────────────────────┘    │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────┐    │    │
│  │  │  API Routes (Route Handlers)             │    │    │
│  │  │  - POST /api/vote                        │    │    │
│  │  │  - GET /api/prompts/random               │    │    │
│  │  │  - GET /api/admin/stats                  │    │    │
│  │  └──────────────────────────────────────────┘    │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────┐    │    │
│  │  │  Client Components                       │    │    │
│  │  │  - ImageGrid (voting interface)          │    │    │
│  │  │  - VoteConfirmation (toast/modal)        │    │    │
│  │  │  - SessionManager (cookie handling)      │    │    │
│  │  └──────────────────────────────────────────┘    │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Image Storage                              │    │
│  │  - /public/images/... (static files)               │    │
│  │  OR Vercel Blob / Cloudinary (cloud URLs)          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Postgres Database                          │    │
│  │  - prompts, images, votes, image_impressions       │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend Framework**: Next.js 15+ (App Router, TypeScript)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Postgres (via Vercel Postgres or external provider)
- **ORM**: Prisma for type-safe database access
- **Image Optimization**: Next.js Image component
- **Deployment**: Vercel serverless platform
- **Session Management**: Client-side UUID cookies
- **Metadata Parsing**: ua-parser-js for user agent analysis

### Data Flow

1. **Ingestion Phase (Pre-deployment)**:
   - Script scans local challenge folders
   - Reads _prompt.txt files and image files
   - Normalizes model names (e.g., "Nano Banana Pro" → "NanoBananaPro")
   - Copies images to /public/images/[challenge]/[model]/ or uploads to cloud
   - Generates Prisma seed file with prompts and images records

2. **Runtime Phase (Vercel)**:
   - User requests a prompt page
   - Server fetches prompt and all associated images from Postgres
   - Fairness algorithm selects 4 images with lowest impression counts
   - Server increments impression_count for selected images
   - Page renders with prompt text and 4 anonymized images
   - User clicks an image to vote
   - Client sends vote to POST /api/vote with metadata
   - Server captures IP, user agent, geo data from headers
   - Vote record persists to Postgres
   - Client shows confirmation and offers next prompt

3. **Admin Phase**:
   - Admin accesses /admin with authentication
   - Server queries aggregated statistics from votes and images tables
   - Admin applies filters and views metrics
   - Admin exports CSV data

## Components and Interfaces

### Ingestion Script

**Purpose**: Convert local folder structure into database-ready format

**Key Functions**:
- `scanChallenges(rootPath: string): Challenge[]` - Recursively scans challenge folders
- `readPrompt(challengePath: string): string` - Reads _prompt.txt file
- `normalizeModelName(folderName: string): ModelName` - Maps folder names to standard model names
- `copyImages(sourcePath: string, destPath: string): void` - Copies images to /public or uploads to cloud
- `generateSeed(challenges: Challenge[]): SeedData` - Creates Prisma seed data structure

**Output**:
- Images in /public/images/[challenge_slug]/[model_name]/[filename]
- prisma/seed.ts file with prompts and images data

### Database Layer (Prisma)

**Schema**:

```prisma
model Prompt {
  id        String   @id @default(uuid())
  text      String
  slug      String   @unique
  images    Image[]
  votes     Vote[]
  createdAt DateTime @default(now())
}

model Image {
  id              String            @id @default(uuid())
  promptId        String
  prompt          Prompt            @relation(fields: [promptId], references: [id])
  modelName       String
  imagePath       String
  impressionCount Int               @default(0)
  votes           Vote[]
  impressions     ImageImpression[]
  createdAt       DateTime          @default(now())
  
  @@index([promptId, impressionCount])
}

model Vote {
  id           String   @id @default(uuid())
  promptId     String
  prompt       Prompt   @relation(fields: [promptId], references: [id])
  imageId      String?
  image        Image?   @relation(fields: [imageId], references: [id])
  chosenModel  String
  shownModels  Json     // Array of 4 model names
  userIp       String
  userAgent    String
  browser      String?
  os           String?
  device       String?
  country      String?
  region       String?
  sessionId    String
  timestamp    DateTime @default(now())
  
  @@index([promptId])
  @@index([chosenModel])
  @@index([timestamp])
}

model ImageImpression {
  id        String   @id @default(uuid())
  promptId  String
  imageId   String
  image     Image    @relation(fields: [imageId], references: [id])
  modelName String
  sessionId String?
  timestamp DateTime @default(now())
  
  @@index([imageId])
  @@index([timestamp])
}
```

### API Routes

#### POST /api/vote

**Request Body**:
```typescript
interface VoteRequest {
  promptId: string;
  selectedModel: string;
  shownModels: string[]; // Array of 4 model names
  sessionId: string;
}
```

**Response**:
```typescript
interface VoteResponse {
  success: boolean;
  error?: string;
}
```

**Implementation**:
1. Extract IP from `x-forwarded-for` or `x-real-ip` headers
2. Extract country from `x-vercel-ip-country` header
3. Extract region from `x-vercel-ip-city` header
4. Parse user agent using ua-parser-js
5. Create vote record in database
6. Return success response

#### GET /api/prompts/random

**Query Parameters**: None (or optional `?exclude=[slug]` to avoid repeats)

**Response**:
```typescript
interface RandomPromptResponse {
  promptId: string;
  promptSlug: string;
  promptText: string;
  candidates: Array<{
    modelName: string;
    imageId: string;
    imageUrl: string;
  }>;
}
```

**Implementation**:
1. Select a random prompt from database
2. Fetch all images for that prompt
3. Apply fairness algorithm to select 4 images
4. Increment impression_count for selected images
5. Optionally insert rows in image_impressions table
6. Return prompt and anonymized image data

#### GET /api/admin/stats

**Query Parameters**:
- `promptId?: string`
- `modelName?: string`
- `startDate?: string`
- `endDate?: string`

**Response**:
```typescript
interface StatsResponse {
  totalVotes: number;
  totalImpressions: number;
  modelStats: Array<{
    modelName: string;
    votes: number;
    impressions: number;
    winRate: number; // votes / totalVotes
    ctr: number; // votes / impressions
  }>;
  promptStats?: Array<{
    promptSlug: string;
    promptText: string;
    votes: number;
    impressions: number;
  }>;
}
```

### Frontend Components

#### ImageGrid Component

**Props**:
```typescript
interface ImageGridProps {
  promptId: string;
  promptText: string;
  candidates: Array<{
    modelName: string;
    imageId: string;
    imageUrl: string;
  }>;
  sessionId: string;
}
```

**Behavior**:
- Renders 2×2 grid of images using Next.js Image component
- Handles click/tap events on images
- Calls POST /api/vote when image is selected
- Shows loading state during vote submission
- Triggers VoteConfirmation component on success

#### VoteConfirmation Component

**Props**:
```typescript
interface VoteConfirmationProps {
  onNext: () => void;
}
```

**Behavior**:
- Displays toast or modal with "Thanks for voting!" message
- Provides "Next prompt" button
- Auto-dismisses after 2-3 seconds (optional)

#### SessionManager Component

**Purpose**: Manage client-side session UUID

**Behavior**:
- Checks for existing session cookie on mount
- Generates new UUID if no session exists
- Stores session ID in cookie with appropriate expiration
- Provides session ID to voting components

### Fairness Algorithm Implementation

**Function**: `selectFairImages(promptId: string, count: number = 4): Promise<Image[]>`

**Algorithm**:
```typescript
async function selectFairImages(promptId: string, count: number = 4): Promise<Image[]> {
  // 1. Fetch all images for this prompt, ordered by impression count (ascending)
  const allImages = await prisma.image.findMany({
    where: { promptId },
    orderBy: { impressionCount: 'asc' },
  });
  
  // 2. Group images by impression count
  const grouped = new Map<number, Image[]>();
  for (const image of allImages) {
    const count = image.impressionCount;
    if (!grouped.has(count)) {
      grouped.set(count, []);
    }
    grouped.get(count)!.push(image);
  }
  
  // 3. Select images with lowest counts, breaking ties randomly
  const selected: Image[] = [];
  const sortedCounts = Array.from(grouped.keys()).sort((a, b) => a - b);
  
  for (const count of sortedCounts) {
    const imagesAtThisCount = grouped.get(count)!;
    
    // Shuffle images at this count level
    const shuffled = imagesAtThisCount.sort(() => Math.random() - 0.5);
    
    // Take as many as we need
    const needed = count - selected.length;
    selected.push(...shuffled.slice(0, needed));
    
    if (selected.length >= count) break;
  }
  
  // 4. Shuffle final positions to avoid position bias
  const finalSelection = selected.sort(() => Math.random() - 0.5);
  
  // 5. Increment impression counts
  await prisma.image.updateMany({
    where: { id: { in: finalSelection.map(img => img.id) } },
    data: { impressionCount: { increment: 1 } },
  });
  
  // 6. Optionally log impressions
  await prisma.imageImpression.createMany({
    data: finalSelection.map(img => ({
      promptId,
      imageId: img.id,
      modelName: img.modelName,
      timestamp: new Date(),
    })),
  });
  
  return finalSelection;
}
```

## Data Models

### Model Name Normalization

The system uses a strict mapping from folder names to normalized model names:

```typescript
const MODEL_NAME_MAP: Record<string, string> = {
  'ByteDance': 'ByteDance',
  'ChatGPT': 'ChatGPT',
  'Flux': 'Flux',
  'Grok': 'Grok',
  'Ideogram': 'Ideogram',
  'Leonardo': 'Leonardo',
  'Midjourney': 'Midjourney',
  'Nano Banana Pro': 'NanoBananaPro',
  'Nano Banana': 'NanoBananaPro', // Fallback
  'Qwen': 'Qwen',
  'Reve': 'Reve',
};

type ModelName = 
  | 'ByteDance'
  | 'ChatGPT'
  | 'Flux'
  | 'Grok'
  | 'Ideogram'
  | 'Leonardo'
  | 'Midjourney'
  | 'NanoBananaPro'
  | 'Qwen'
  | 'Reve';
```

### Challenge Folder Structure

```typescript
interface Challenge {
  folderName: string; // e.g., "Claude 2 Asian Woman Character"
  slug: string; // e.g., "claude-2-asian-woman-character"
  promptText: string; // Content of _prompt.txt
  models: ModelOutput[];
}

interface ModelOutput {
  modelName: ModelName;
  images: ImageFile[];
}

interface ImageFile {
  originalPath: string;
  deployedPath: string; // /public/images/... or cloud URL
  filename: string; // Follows naming convention
  sequence: number; // 1, 2, 3, etc.
}
```

### Vote Metadata Structure

```typescript
interface VoteMetadata {
  // Core voting data
  promptId: string;
  chosenModel: ModelName;
  shownModels: ModelName[]; // Always length 4
  
  // Session tracking
  sessionId: string; // UUID from cookie
  
  // Network metadata
  userIp: string; // From headers
  userAgent: string; // Raw user agent string
  
  // Parsed user agent
  browser: string | null; // e.g., "Chrome"
  os: string | null; // e.g., "macOS"
  device: string | null; // e.g., "desktop", "mobile", "tablet"
  
  // Geolocation (from Vercel headers)
  country: string | null; // ISO country code from x-vercel-ip-country
  region: string | null; // City/region from x-vercel-ip-city
  
  // Timestamp
  timestamp: Date; // UTC server time
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Four distinct models displayed

*For any* prompt page render, the displayed images must come from exactly four different models.
**Validates: Requirements 1.1**

### Property 2: Vote records contain all metadata

*For any* vote submission, the created vote record must contain all required metadata fields: promptId, chosenModel, shownModels, userIp, userAgent, browser, os, device, country, region, sessionId, and timestamp.
**Validates: Requirements 1.3, 4.5**

### Property 3: Ingestion creates valid prompt records

*For any* challenge folder with a _prompt.txt file, the ingestion process must create a prompt record with a valid id, text (from file content), and slug (derived from folder name).
**Validates: Requirements 2.1**

### Property 4: Model name normalization consistency

*For any* model folder name (including "Nano Banana Pro", "Nano Banana"), the normalization function must map it to the correct standard model name according to MODEL_NAME_MAP.
**Validates: Requirements 2.2**

### Property 5: Image files are accessible at runtime

*For any* image record in the database, the imagePath must point to an accessible resource (either a valid /public path or a valid cloud URL).
**Validates: Requirements 2.3, 2.5**

### Property 6: Fairness algorithm selects lowest impression counts

*For any* prompt with multiple images, when selecting 4 images, the fairness algorithm must choose the 4 images with the lowest impression counts.
**Validates: Requirements 3.2**

### Property 7: Tie-breaking is non-deterministic

*For any* prompt where more than 4 images share the same lowest impression count, multiple invocations of the selection algorithm must produce different selections (demonstrating randomness).
**Validates: Requirements 3.3**

### Property 8: Position randomization

*For any* set of 4 selected images, multiple invocations of the display logic must show the same images in different positions (demonstrating position randomization).
**Validates: Requirements 3.4**

### Property 9: Impression counts increment correctly

*For any* image displayed to a user, after the display operation, the image's impression_count must be exactly 1 greater than before.
**Validates: Requirements 3.5**

### Property 10: IP address captured from headers

*For any* vote submission with request headers containing IP information, the vote record must have the userIp field populated with the IP address from headers.
**Validates: Requirements 4.1**

### Property 11: User agent parsing extracts all fields

*For any* valid user agent string, the parsing function must extract browser, os, and device fields (or null if not parseable).
**Validates: Requirements 4.2**

### Property 12: Geolocation from Vercel headers

*For any* vote submission with x-vercel-ip-country and x-vercel-ip-city headers, the vote record must have country and region fields populated from these headers.
**Validates: Requirements 4.3, 4.4**

### Property 13: Database records persist correctly

*For any* prompt, image, or vote creation operation, querying the database immediately after must return a record with all specified fields correctly populated.
**Validates: Requirements 5.2, 5.3, 5.4**

### Property 14: Statistics calculations are mathematically correct

*For any* set of vote and impression data, the calculated win rate (votes per model / total votes) and CTR (votes / impressions) must match the mathematical formulas exactly.
**Validates: Requirements 6.2, 6.5**

### Property 15: Admin filters narrow results correctly

*For any* admin query with filters (prompt, model, or date range), the returned results must only include records matching all specified filter criteria.
**Validates: Requirements 6.3**

### Property 16: CSV export contains all data

*For any* data export request, the generated CSV must contain all records matching the query with all expected columns present.
**Validates: Requirements 6.4**

### Property 17: SEO metadata present on prompt pages

*For any* prompt page, the rendered HTML must include Open Graph meta tags (og:title, og:description, og:image).
**Validates: Requirements 7.5**

### Property 18: Model names not visible in UI

*For any* rendered prompt page HTML, the visible text content must not contain any of the 10 model names.
**Validates: Requirements 8.1**

### Property 19: Image URLs are anonymized

*For any* image URL served to the client, the URL path must not obviously reveal the model name (e.g., using image IDs or obfuscated paths instead of model names).
**Validates: Requirements 8.3**

### Property 20: Vote API responses don't expose model identity

*For any* successful vote API response, the response body must not contain model identification information.
**Validates: Requirements 8.4**

### Property 21: Confirmation messages are anonymous

*For any* vote confirmation message displayed to the user, the message text must not contain model names.
**Validates: Requirements 8.5**

### Property 22: Environment variables are read correctly

*For any* required environment variable (DATABASE_URL, ADMIN_PASSWORD, etc.), the application must successfully read the value from process.env.
**Validates: Requirements 9.4**

### Property 23: Navigation option after voting

*For any* completed vote, the UI must present a navigation option (button or auto-redirect) to advance to the next prompt.
**Validates: Requirements 10.1**

### Property 24: Random prompt endpoint applies fairness

*For any* request to the random prompt endpoint, the response must include a valid prompt with exactly 4 images selected using the fairness algorithm.
**Validates: Requirements 10.2**

### Property 25: Prompt text appears before images in DOM

*For any* prompt page, the DOM structure must have the prompt text element appearing before the image grid element.
**Validates: Requirements 10.5**

## Error Handling

### Ingestion Phase Errors

1. **Missing _prompt.txt file**:
   - Detection: Check for file existence before reading
   - Handling: Log warning, skip challenge folder, continue with others
   - User feedback: Report skipped folders in ingestion summary

2. **Invalid image files**:
   - Detection: Validate file extensions and readability
   - Handling: Skip invalid files, log warnings
   - User feedback: Report count of skipped files

3. **File system permissions**:
   - Detection: Catch file read/write errors
   - Handling: Fail fast with clear error message
   - User feedback: Display permission error with path

4. **Duplicate slugs**:
   - Detection: Check for slug collisions during ingestion
   - Handling: Append numeric suffix to make unique
   - User feedback: Log warning about renamed slugs

### Runtime Errors

1. **Database connection failures**:
   - Detection: Prisma connection errors
   - Handling: Retry with exponential backoff (3 attempts)
   - User feedback: Display "Service temporarily unavailable" page

2. **Missing images**:
   - Detection: 404 errors when loading images
   - Handling: Display placeholder image, log error
   - User feedback: Show "Image unavailable" in grid

3. **Insufficient images for prompt**:
   - Detection: Fewer than 4 images available for a prompt
   - Handling: Skip prompt in random selection
   - User feedback: Transparent to user (select different prompt)

4. **Vote submission failures**:
   - Detection: Database write errors
   - Handling: Retry once, then show error to user
   - User feedback: "Unable to record vote, please try again"

5. **Invalid session ID**:
   - Detection: Missing or malformed session cookie
   - Handling: Generate new session ID automatically
   - User feedback: Transparent to user

6. **Missing geo headers**:
   - Detection: x-vercel-ip-country header not present
   - Handling: Store null values for country/region
   - User feedback: Transparent to user

### Admin Panel Errors

1. **Authentication failures**:
   - Detection: Invalid credentials or missing auth token
   - Handling: Return 401 Unauthorized
   - User feedback: Redirect to login page

2. **Invalid filter parameters**:
   - Detection: Malformed date ranges or invalid model names
   - Handling: Return 400 Bad Request with validation errors
   - User feedback: Display validation errors in UI

3. **CSV export failures**:
   - Detection: Large dataset causing timeout
   - Handling: Implement pagination or streaming
   - User feedback: Show progress indicator

## Testing Strategy

### Unit Testing

The application will use **Vitest** as the testing framework for unit tests. Unit tests will focus on:

1. **Utility Functions**:
   - Model name normalization
   - Slug generation from folder names
   - User agent parsing
   - Date range validation

2. **Data Validation**:
   - Prisma schema validation
   - API request/response validation
   - Environment variable validation

3. **Edge Cases**:
   - Empty prompt text
   - Missing optional metadata fields
   - Boundary conditions (exactly 4 images available)

4. **Component Rendering**:
   - ImageGrid renders correct number of images
   - VoteConfirmation displays correct message
   - SessionManager generates valid UUIDs

### Property-Based Testing

The application will use **fast-check** for property-based testing in TypeScript. Each property-based test will:

- Run a minimum of 100 iterations
- Be tagged with a comment referencing the design document property
- Use the format: `// Feature: ai-image-voting-app, Property X: [property text]`

Property-based tests will cover:

1. **Fairness Algorithm** (Properties 6, 7, 8):
   - Generate random sets of images with varying impression counts
   - Verify lowest counts are always selected
   - Verify tie-breaking randomness
   - Verify position randomization

2. **Metadata Capture** (Properties 10, 11, 12):
   - Generate random IP addresses, user agents, headers
   - Verify all metadata fields are correctly extracted

3. **Data Persistence** (Property 13):
   - Generate random prompts, images, votes
   - Verify database round-trip preserves all data

4. **Statistics Calculations** (Property 14):
   - Generate random vote/impression datasets
   - Verify win rate and CTR calculations

5. **Filtering Logic** (Property 15):
   - Generate random datasets with various attributes
   - Verify filters correctly narrow results

6. **Anonymization** (Properties 18, 19, 21):
   - Generate random model selections
   - Verify model names don't appear in output

### Integration Testing

Integration tests will verify:

1. **API Endpoints**:
   - POST /api/vote creates database records
   - GET /api/prompts/random returns valid data
   - GET /api/admin/stats calculates correct aggregations

2. **Database Operations**:
   - Ingestion script populates database correctly
   - Fairness algorithm updates impression counts
   - Vote submission creates related records

3. **End-to-End Flows**:
   - Complete voting flow from page load to confirmation
   - Admin authentication and data export
   - Session management across multiple votes

### Testing Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.ts',
      ],
    },
  },
});
```

Property-based test configuration:
```typescript
import fc from 'fast-check';

// Configure fast-check to run 100 iterations minimum
fc.configureGlobal({ numRuns: 100 });
```

