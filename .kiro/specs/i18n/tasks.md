# Implementation Plan

- [ ] 1. Set up next-intl and create message files
  - [x] 1.1 Install next-intl dependency
    - Run `npm install next-intl`
    - Verify installation in package.json
    - _Requirements: 4.4_

  - [x] 1.2 Create message files for English and Spanish
    - Create `messages/en.json` with all UI strings
    - Create `messages/es.json` with Spanish translations
    - Include keys for: navigation, buttons, voting UI, admin dashboard, error messages
    - _Requirements: 4.1, 4.2_

  - [x] 1.3 Configure next-intl in Next.js
    - Create `i18n.ts` configuration file
    - Define supported locales: ['en', 'es']
    - Set default locale to 'en'
    - Configure message loading
    - _Requirements: 4.4_

- [ ] 2. Update database schema for translations
  - [x] 2.1 Create PromptTranslation model in Prisma schema
    - Add PromptTranslation model with id, promptId, language, text fields
    - Add unique constraint on [promptId, language]
    - Add index on language field
    - Add relation to Prompt model with cascade delete
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ] 2.2 Write property test for unique translation constraint
    - **Property 9: Unique translation constraint**
    - **Validates: Requirements 6.2**

  - [ ] 2.3 Write property test for cascade deletion
    - **Property 10: Cascade deletion**
    - **Validates: Requirements 6.4**

  - [x] 2.4 Generate Prisma client and run migration
    - Run `npx prisma generate`
    - Run `npx prisma migrate dev --name add-translations`
    - Verify migration creates PromptTranslation table
    - _Requirements: 6.1_

- [ ] 3. Implement locale detection middleware
  - [x] 3.1 Create middleware for locale detection
    - Create `middleware.ts` in project root
    - Implement locale detection from cookie and Accept-Language header
    - Implement redirect logic for root path
    - Set NEXT_LOCALE cookie with 365-day expiration
    - Skip middleware for /api/* and /_next/* routes
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 11.1, 11.2, 11.3, 11.5_

  - [ ] 3.2 Write property test for locale detection
    - **Property 1: Locale detection consistency**
    - **Validates: Requirements 1.1, 1.4**

  - [ ] 3.3 Write property test for cookie persistence
    - **Property 2: Locale cookie persistence**
    - **Validates: Requirements 1.5, 12.2, 12.3**

  - [ ] 3.4 Write property test for cookie priority
    - **Property 16: Cookie priority over header**
    - **Validates: Requirements 11.4**

  - [ ] 3.5 Write property test for middleware route filtering
    - **Property 15: Middleware route filtering**
    - **Validates: Requirements 11.5**

- [ ] 4. Restructure app directory for locale routing
  - [x] 4.1 Create [locale] dynamic route segment
    - Create `app/[locale]/` directory
    - Move existing pages into `app/[locale]/`
    - Update imports and paths
    - _Requirements: 2.1_

  - [x] 4.2 Create locale layout with next-intl provider
    - Create `app/[locale]/layout.tsx`
    - Wrap children with NextIntlClientProvider
    - Load messages for current locale
    - Set HTML lang attribute
    - _Requirements: 4.3, 4.4_

  - [x] 4.3 Update page components to use locale parameter
    - Update `app/[locale]/page.tsx`
    - Update `app/[locale]/p/[slug]/page.tsx`
    - Update `app/[locale]/admin/page.tsx`
    - Pass locale to API calls
    - _Requirements: 2.2, 2.3, 2.4_

  - [ ] 4.4 Write property test for locale preservation
    - **Property 4: Locale preservation across navigation**
    - **Validates: Requirements 2.4**

- [ ] 5. Create language switcher component
  - [x] 5.1 Implement LanguageSwitcher component
    - Create `components/LanguageSwitcher.tsx`
    - Display current language
    - Show dropdown/toggle for available languages
    - Handle language selection and navigation
    - Preserve current path when switching
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ] 5.2 Write property test for language switcher navigation
    - **Property 5: Language switcher navigation**
    - **Validates: Requirements 3.3, 3.5**

  - [x] 5.3 Add LanguageSwitcher to global layout
    - Import LanguageSwitcher in `app/[locale]/layout.tsx`
    - Position in navigation bar
    - Style consistently with app design
    - _Requirements: 3.1_

- [ ] 6. Localize UI components
  - [x] 6.1 Update ImageGrid component with translations
    - Replace hardcoded strings with `useTranslations()` hook
    - Update prompt text, instructions, error messages
    - _Requirements: 4.3_

  - [x] 6.2 Update VoteConfirmation component with translations
    - Replace hardcoded strings with translations
    - Update success message, button text
    - _Requirements: 4.3_

  - [x] 6.3 Update admin dashboard with translations
    - Replace hardcoded strings in admin page
    - Update table headers, stat labels
    - _Requirements: 4.3_

  - [ ] 6.4 Write property test for UI text localization
    - **Property 6: UI text localization**
    - **Validates: Requirements 4.3**

  - [ ] 6.5 Write property test for translation key fallback
    - **Property 7: Translation key fallback**
    - **Validates: Requirements 4.5**

- [ ] 7. Implement prompt translation retrieval
  - [x] 7.1 Create translation utility functions
    - Create `lib/translations.ts`
    - Implement `getPromptTranslation(promptId, locale)`
    - Implement fallback to English logic
    - Add error handling
    - _Requirements: 5.2, 5.3, 5.4_

  - [ ] 7.2 Write property test for prompt translation retrieval
    - **Property 8: Prompt translation retrieval**
    - **Validates: Requirements 5.2, 5.3, 5.4**

  - [x] 7.3 Update prompt fetching to include translations
    - Modify prompt queries to join PromptTranslation
    - Update `app/[locale]/p/[slug]/page.tsx`
    - Update `lib/fairness.ts` if needed
    - _Requirements: 5.2_

- [ ] 8. Update API routes for locale support
  - [x] 8.1 Add locale parameter to /api/prompts/random
    - Accept `locale` query parameter
    - Fetch translation for specified locale
    - Return translated prompt text
    - Fallback to English if translation missing
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ] 8.2 Write property test for API locale parameter handling
    - **Property 11: API locale parameter handling**
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.5**

  - [x] 8.3 Update vote API to handle locale context
    - Ensure vote records maintain context
    - No changes needed if locale not stored with votes
    - _Requirements: 7.1_

- [ ] 9. Create translation scripts
  - [x] 9.1 Create OpenAI translation script
    - Create `scripts/translate-openai.ts`
    - Connect to OpenAI API using OPENAI_API_KEY
    - Fetch all prompts without Spanish translations
    - Generate Spanish translations using GPT-3.5-turbo or GPT-4
    - Upsert translations to PromptTranslation table
    - Log progress and errors
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [ ] 9.2 Write property test for translation script completeness
    - **Property 12: Translation script completeness**
    - **Validates: Requirements 8.2, 8.4**

  - [x] 9.3 Create translation verification script
    - Create `scripts/check-translations.ts`
    - Count total prompts
    - Count prompts with Spanish translations
    - List prompts missing translations
    - Calculate and display coverage percentage
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ] 9.4 Write property test for translation verification accuracy
    - **Property 13: Translation verification accuracy**
    - **Validates: Requirements 9.2, 9.3, 9.5**

- [ ] 10. Update ingestion script for translations
  - [x] 10.1 Modify ingest.ts to create English translations
    - When creating a prompt, also create English PromptTranslation
    - Set translation text to match original prompt text
    - Add error handling for translation creation
    - Log translation creation status
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ] 10.2 Write property test for ingestion translation creation
    - **Property 14: Ingestion translation creation**
    - **Validates: Requirements 10.1, 10.2**

  - [x] 10.3 Update seed script to include translations
    - Modify `prisma/seed.ts` to create PromptTranslation records
    - Create English translations for all seeded prompts
    - _Requirements: 10.1_

- [ ] 11. Backfill existing prompts with English translations
  - [x] 11.1 Create backfill script for English translations
    - Create `scripts/backfill-english-translations.ts`
    - Fetch all prompts without English translations
    - Create English PromptTranslation records
    - Set text to match original prompt text
    - _Requirements: 10.1, 10.2_

  - [x] 11.2 Run backfill script on existing database
    - Execute backfill script
    - Verify all prompts have English translations
    - _Requirements: 10.1_

- [ ] 12. Generate Spanish translations
  - [ ] 12.1 Run OpenAI translation script
    - Set OPENAI_API_KEY environment variable
    - Execute `npx tsx scripts/translate-openai.ts`
    - Monitor progress and errors
    - _Requirements: 8.1, 8.2, 8.4_

  - [ ] 12.2 Verify translation coverage
    - Run `npx tsx scripts/check-translations.ts`
    - Verify 100% coverage or identify missing translations
    - _Requirements: 9.1, 9.2, 9.3, 9.5_

- [ ] 13. Update environment variables and configuration
  - [x] 13.1 Add i18n environment variables to .env.example
    - Add OPENAI_API_KEY
    - Add SUPPORTED_LOCALES (optional)
    - Add DEFAULT_LOCALE (optional)
    - Document each variable
    - _Requirements: 8.1_

  - [x] 13.2 Update README with i18n setup instructions
    - Document locale structure
    - Document translation workflow
    - Document how to add new languages
    - _Requirements: 8.1, 9.1_

- [ ] 14. Testing and verification
  - [x] 14.1 Test locale detection and routing
    - Visit / with different Accept-Language headers
    - Verify redirect to correct locale
    - Test cookie persistence
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 14.2 Test language switcher functionality
    - Switch between English and Spanish
    - Verify URL changes
    - Verify UI text changes
    - Verify prompt text changes
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 14.3 Test translation fallback behavior
    - Remove a Spanish translation
    - Verify English fallback displays
    - Verify no errors occur
    - _Requirements: 4.5, 5.4, 7.5_

  - [x] 14.4 Run all property-based tests
    - Execute `npm test`
    - Verify all i18n property tests pass
    - Fix any failing tests
    - _Requirements: All_

- [x] 15. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
