# Design Document: Internationalization (i18n)

## Overview

This document describes the design for adding internationalization support to the AI Image Model Comparison Voting App. The system will support English (en) and Spanish (es) locales through path-based routing, UI localization with next-intl, and database-stored prompt translations.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Accept-Lang  │  │ Locale Cookie│  │ Language     │      │
│  │ Header       │  │              │  │ Switcher     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Middleware                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 1. Detect locale (cookie > header > default)        │   │
│  │ 2. Redirect / → /[locale]                           │   │
│  │ 3. Set NEXT_LOCALE cookie                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ /[locale]/                                           │   │
│  │ /[locale]/p/[slug]/                                  │   │
│  │ /[locale]/admin/                                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   next-intl Provider     │  │   API Routes             │
│  ┌────────────────────┐  │  │  ┌────────────────────┐  │
│  │ messages/en.json   │  │  │  │ /api/prompts/      │  │
│  │ messages/es.json   │  │  │  │   random?locale=   │  │
│  └────────────────────┘  │  │  └────────────────────┘  │
└──────────────────────────┘  └──────────────────────────┘
                                          │
                                          ▼
                            ┌──────────────────────────┐
                            │      Database            │
                            │  ┌────────────────────┐  │
                            │  │ Prompt             │  │
                            │  │ PromptTranslation  │  │
                            │  └────────────────────┘  │
                            └──────────────────────────┘
```

### Locale Detection Flow

1. User requests a page
2. Middleware checks for NEXT_LOCALE cookie
3. If cookie exists, use that locale
4. If no cookie, parse Accept-Language header
5. If supported locale found, use it
6. Otherwise, default to 'en'
7. Redirect to /[locale]/[path]
8. Set NEXT_LOCALE cookie

## Components and Interfaces

### 1. Middleware (middleware.ts)

**Purpose:** Intercept requests, detect locale, and handle redirects.

**Interface:**
```typescript
export function middleware(request: NextRequest): NextResponse

function detectLocale(request: NextRequest): string
function createLocaleResponse(locale: string, pathname: string): NextResponse
```

**Responsibilities:**
- Read NEXT_LOCALE cookie
- Parse Accept-Language header
- Redirect root path to localized path
- Set locale cookie with 365-day expiration
- Skip processing for API routes and static assets

### 2. Language Switcher Component

**Purpose:** Allow users to switch between languages.

**Interface:**
```typescript
interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps): JSX.Element
```

**Responsibilities:**
- Display current language
- Show available languages (en, es)
- Navigate to equivalent page in new locale
- Preserve current page context

### 3. Localized Layout

**Purpose:** Wrap pages with next-intl provider.

**Interface:**
```typescript
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}): JSX.Element
```

**Responsibilities:**
- Load message files for current locale
- Provide translations to child components
- Set HTML lang attribute

### 4. Translation Utilities

**Purpose:** Helper functions for translation operations.

**Interface:**
```typescript
function getPromptTranslation(
  promptId: string,
  locale: string
): Promise<string>

function translateWithOpenAI(
  text: string,
  targetLocale: string
): Promise<string>

function upsertTranslation(
  promptId: string,
  locale: string,
  text: string
): Promise<void>
```

## Data Models

### PromptTranslation Model

```prisma
model PromptTranslation {
  id        String   @id @default(uuid())
  promptId  String
  language  String   // 'en' | 'es'
  text      String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  prompt    Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)
  
  @@unique([promptId, language])
  @@index([language])
}
```

### Updated Prompt Model

```prisma
model Prompt {
  id           String   @id @default(uuid())
  text         String   @db.Text
  slug         String   @unique
  createdAt    DateTime @default(now())
  
  images       Image[]
  translations PromptTranslation[]
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Locale detection consistency
*For any* request without a locale cookie, the detected locale should match the first supported language in the Accept-Language header, or default to 'en' if none are supported.
**Validates: Requirements 1.1, 1.4**

### Property 2: Locale cookie persistence
*For any* language selection, the NEXT_LOCALE cookie should be set with a 365-day expiration and SameSite=Lax attribute.
**Validates: Requirements 1.5, 12.2, 12.3**

### Property 3: URL locale prefix consistency
*For any* internal link generated by the application, the URL should include the current locale prefix (/en/ or /es/).
**Validates: Requirements 2.1, 2.5**

### Property 4: Locale preservation across navigation
*For any* navigation within the application, the locale should remain consistent throughout the session.
**Validates: Requirements 2.4**

### Property 5: Language switcher navigation
*For any* page at path /[locale]/[...path], switching to a different locale should navigate to /[newLocale]/[...path] preserving the path structure.
**Validates: Requirements 3.3, 3.5**

### Property 6: UI text localization
*For any* UI component, all displayed text should come from the message file corresponding to the current locale.
**Validates: Requirements 4.3**

### Property 7: Translation key fallback
*For any* missing translation key, the system should display the English text from messages/en.json.
**Validates: Requirements 4.5**

### Property 8: Prompt translation retrieval
*For any* prompt and locale, fetching the prompt should return the translation for that locale if it exists, otherwise the English translation.
**Validates: Requirements 5.2, 5.3, 5.4**

### Property 9: Unique translation constraint
*For any* prompt and locale combination, attempting to create a duplicate PromptTranslation record should fail with a unique constraint violation.
**Validates: Requirements 6.2**

### Property 10: Cascade deletion
*For any* prompt, deleting the prompt should automatically delete all associated PromptTranslation records.
**Validates: Requirements 6.4**

### Property 11: API locale parameter handling
*For any* request to /api/prompts/random with a locale parameter, the response should contain the prompt text in the specified locale, or English if the locale is unsupported or translation is missing.
**Validates: Requirements 7.1, 7.2, 7.3, 7.5**

### Property 12: Translation script completeness
*For any* execution of the translation script, all prompts without Spanish translations should be processed and have translations created.
**Validates: Requirements 8.2, 8.4**

### Property 13: Translation verification accuracy
*For any* execution of the verification script, the reported translation coverage percentage should equal (prompts with Spanish translations / total prompts) × 100.
**Validates: Requirements 9.2, 9.3, 9.5**

### Property 14: Ingestion translation creation
*For any* new prompt processed by the ingestion script, an English PromptTranslation record should be created with text matching the original prompt text.
**Validates: Requirements 10.1, 10.2**

### Property 15: Middleware route filtering
*For any* request to /api/* or /_next/*, the middleware should not perform locale detection or redirection.
**Validates: Requirements 11.5**

### Property 16: Cookie priority over header
*For any* request with both a NEXT_LOCALE cookie and Accept-Language header, the locale from the cookie should be used.
**Validates: Requirements 11.4**

## Error Handling

### Translation Errors

**Missing Translation:**
- Fallback to English translation
- Log warning with missing locale and prompt ID
- Continue execution without failure

**OpenAI API Errors:**
- Retry up to 3 times with exponential backoff
- Log error details
- Skip prompt and continue with next
- Report failed translations at end of script

**Database Errors:**
- Catch unique constraint violations gracefully
- Log error with context
- Continue processing remaining translations

### Locale Detection Errors

**Invalid Locale in URL:**
- Redirect to /en/[path]
- Set NEXT_LOCALE cookie to 'en'

**Malformed Accept-Language Header:**
- Default to 'en'
- Log warning

## Testing Strategy

### Unit Tests

**Locale Detection:**
- Test Accept-Language header parsing
- Test cookie reading
- Test priority order (cookie > header > default)
- Test fallback to 'en' for unsupported locales

**Translation Utilities:**
- Test getPromptTranslation with existing translations
- Test getPromptTranslation with missing translations
- Test fallback behavior

**Language Switcher:**
- Test rendering with different locales
- Test navigation on click
- Test path preservation

### Property-Based Tests

**Property Testing Framework:** fast-check (already in use)

**Test Configuration:** Minimum 100 iterations per property

**Property Tests:**

1. **Locale Detection Property Test**
   - Generate random Accept-Language headers
   - Verify detected locale matches expected behavior
   - Tag: `**Feature: i18n, Property 1: Locale detection consistency**`

2. **Cookie Persistence Property Test**
   - Generate random locale selections
   - Verify cookie attributes (expiration, SameSite)
   - Tag: `**Feature: i18n, Property 2: Locale cookie persistence**`

3. **URL Prefix Property Test**
   - Generate random paths
   - Verify all generated URLs include locale prefix
   - Tag: `**Feature: i18n, Property 3: URL locale prefix consistency**`

4. **Translation Retrieval Property Test**
   - Generate random prompt IDs and locales
   - Verify correct translation is returned
   - Verify fallback to English when translation missing
   - Tag: `**Feature: i18n, Property 8: Prompt translation retrieval**`

5. **Unique Constraint Property Test**
   - Generate random prompt/locale combinations
   - Verify duplicate insertions fail
   - Tag: `**Feature: i18n, Property 9: Unique translation constraint**`

6. **Cascade Deletion Property Test**
   - Create prompts with translations
   - Delete prompts
   - Verify translations are deleted
   - Tag: `**Feature: i18n, Property 10: Cascade deletion**`

7. **API Locale Parameter Property Test**
   - Generate random locale parameters
   - Verify API returns correct translation
   - Tag: `**Feature: i18n, Property 11: API locale parameter handling**`

8. **Translation Coverage Property Test**
   - Generate random sets of prompts and translations
   - Verify coverage calculation accuracy
   - Tag: `**Feature: i18n, Property 13: Translation verification accuracy**`

### Integration Tests

**End-to-End Locale Flow:**
- Visit root path
- Verify redirect to /en or /es
- Switch language
- Verify navigation to new locale
- Verify UI text changes
- Verify prompt text changes

**Translation Script:**
- Run translation script on test database
- Verify all prompts have Spanish translations
- Verify translation quality (manual spot check)

**Verification Script:**
- Run verification script
- Verify output matches expected format
- Verify coverage calculation

## Performance Considerations

### Translation Loading

**Strategy:** Eager loading of translations with prompt
- Join PromptTranslation table when fetching prompts
- Cache translations in memory for frequently accessed prompts
- Use database indexes on language field

### Message File Loading

**Strategy:** Static imports at build time
- next-intl loads message files at build time
- No runtime overhead for message loading
- Messages are bundled with the application

### Middleware Performance

**Strategy:** Minimal processing in middleware
- Simple cookie/header reading
- No database queries
- Fast string operations only
- Skip middleware for API routes and static assets

## Security Considerations

### Cookie Security

- Set SameSite=Lax to prevent CSRF
- Set Secure flag in production (HTTPS only)
- Set HttpOnly=false (needs to be readable by client)
- 365-day expiration (reasonable for preference)

### Input Validation

- Validate locale parameter against whitelist ['en', 'es']
- Sanitize Accept-Language header input
- Prevent locale injection in URLs

### Translation Content

- Escape HTML in translated content
- Validate translation text length
- Prevent XSS through translated content

## Deployment Considerations

### Environment Variables

```env
# OpenAI API key for translation script
OPENAI_API_KEY="sk-..."

# Supported locales (comma-separated)
SUPPORTED_LOCALES="en,es"

# Default locale
DEFAULT_LOCALE="en"
```

### Database Migration

1. Create PromptTranslation table
2. Add translations relation to Prompt model
3. Run migration: `npx prisma migrate dev`
4. Backfill English translations from existing prompts
5. Run OpenAI translation script for Spanish

### Vercel Configuration

- No special configuration needed
- Middleware runs on Edge Runtime
- Message files bundled at build time
- Database queries use existing connection pool

## Future Enhancements

### Additional Languages

- Add French (fr), German (de), etc.
- Update SUPPORTED_LOCALES
- Create new message files
- Run translation script for new locales

### Translation Management UI

- Admin interface for editing translations
- Translation approval workflow
- Translation quality ratings

### Automatic Translation

- Trigger translation on prompt creation
- Background job for translation
- Translation queue system

### Locale-Specific Formatting

- Date/time formatting per locale
- Number formatting per locale
- Currency formatting per locale
