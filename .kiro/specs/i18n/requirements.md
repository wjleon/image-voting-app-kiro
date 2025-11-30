# Requirements Document

## Introduction

This document specifies the requirements for adding internationalization (i18n) support to the AI Image Model Comparison Voting App. The feature will enable the application to support multiple languages, starting with English (en) and Spanish (es), including both user interface localization and dynamic content translation from the database.

## Glossary

- **i18n**: Internationalization - the process of designing software to support multiple languages and regions
- **Locale**: A set of parameters defining the user's language, region, and cultural preferences (e.g., "en" for English, "es" for Spanish)
- **Translation**: The process of converting text from one language to another
- **Fallback Language**: The default language (English) used when a translation is not available
- **Prompt Translation**: A database record containing the translated text of a prompt in a specific language
- **Language Switcher**: A UI component that allows users to change the application language
- **next-intl**: A library for internationalization in Next.js applications
- **OpenAI API**: An AI service used for automated translation of prompts

## Requirements

### Requirement 1: Language Detection and Routing

**User Story:** As a user, I want the application to automatically detect my preferred language and display content in that language, so that I have a seamless experience.

#### Acceptance Criteria

1. WHEN a user visits the root path ("/") THEN the system SHALL redirect the user to a localized path based on their browser's Accept-Language header
2. WHEN a user's preferred language is English THEN the system SHALL redirect to "/en"
3. WHEN a user's preferred language is Spanish THEN the system SHALL redirect to "/es"
4. WHEN a user's preferred language is not supported THEN the system SHALL redirect to "/en" as the fallback
5. WHEN a user selects a language THEN the system SHALL store the preference in a cookie with 365-day expiration

### Requirement 2: URL Structure and Navigation

**User Story:** As a user, I want to access content through language-specific URLs, so that I can bookmark and share links in my preferred language.

#### Acceptance Criteria

1. THE system SHALL use path-based routing with language prefixes (e.g., "/en/", "/es/")
2. WHEN a user navigates to "/en/p/[slug]" THEN the system SHALL display the prompt page in English
3. WHEN a user navigates to "/es/p/[slug]" THEN the system SHALL display the prompt page in Spanish
4. WHEN a user navigates to a localized path THEN the system SHALL maintain the locale throughout the session
5. THE system SHALL ensure all internal links include the current locale prefix

### Requirement 3: Language Switcher Component

**User Story:** As a user, I want to easily switch between languages using a toggle in the navigation, so that I can view content in my preferred language without losing my current context.

#### Acceptance Criteria

1. THE system SHALL display a language switcher component in the global navigation bar
2. WHEN a user clicks the language switcher THEN the system SHALL display available languages (English and Spanish)
3. WHEN a user selects a different language THEN the system SHALL navigate to the equivalent page in the new locale
4. WHEN a user switches languages on "/en/p/example" THEN the system SHALL navigate to "/es/p/example"
5. WHEN a user switches languages THEN the system SHALL preserve the current page context (prompt, voting state)

### Requirement 4: UI Text Localization

**User Story:** As a user, I want all interface elements (buttons, labels, messages) to appear in my selected language, so that I can understand and use the application effectively.

#### Acceptance Criteria

1. THE system SHALL externalize all static UI text into JSON message files
2. THE system SHALL maintain separate message files for each supported language (messages/en.json, messages/es.json)
3. WHEN rendering UI components THEN the system SHALL load text from the message file corresponding to the current locale
4. THE system SHALL use the next-intl library for server and client-side rendering of localized strings
5. WHEN a translation key is missing THEN the system SHALL display the English text as fallback

### Requirement 5: Prompt Content Localization

**User Story:** As a user, I want to see image prompts in my selected language, so that I can accurately judge which AI-generated image best matches the prompt.

#### Acceptance Criteria

1. THE system SHALL store prompt translations in a dedicated database table (PromptTranslation)
2. WHEN fetching a prompt THEN the system SHALL retrieve the translation corresponding to the current locale
3. WHEN a translation exists for the current locale THEN the system SHALL display the translated prompt text
4. WHEN a translation does not exist for the current locale THEN the system SHALL display the English prompt text as fallback
5. THE system SHALL maintain a one-to-many relationship between Prompt and PromptTranslation records

### Requirement 6: Database Schema for Translations

**User Story:** As a developer, I want a robust database schema for storing translations, so that the system can efficiently manage multilingual content.

#### Acceptance Criteria

1. THE system SHALL create a PromptTranslation model with fields: id, promptId, language, text
2. THE system SHALL enforce a unique constraint on the combination of promptId and language
3. THE system SHALL establish a foreign key relationship from PromptTranslation.promptId to Prompt.id
4. WHEN a Prompt is deleted THEN the system SHALL cascade delete all associated PromptTranslation records
5. THE system SHALL index the language field for efficient query performance

### Requirement 7: API Localization

**User Story:** As a developer, I want API endpoints to accept locale parameters and return localized content, so that the frontend can display content in the user's language.

#### Acceptance Criteria

1. THE system SHALL accept a "locale" query parameter on GET /api/prompts/random
2. WHEN the locale parameter is "en" THEN the system SHALL return the English prompt text
3. WHEN the locale parameter is "es" THEN the system SHALL return the Spanish prompt text
4. WHEN the locale parameter is missing THEN the system SHALL default to "en"
5. WHEN a translation is not available THEN the system SHALL return the English text with a fallback indicator

### Requirement 8: Automated Translation with OpenAI

**User Story:** As an admin, I want to automatically translate all prompts using AI, so that I can quickly provide Spanish translations without manual effort.

#### Acceptance Criteria

1. THE system SHALL provide a script (translate-openai.ts) that connects to the OpenAI API
2. WHEN the translation script runs THEN the system SHALL iterate through all prompts without Spanish translations
3. WHEN translating a prompt THEN the system SHALL use GPT-3.5-turbo or GPT-4 for high-quality translation
4. WHEN a translation is generated THEN the system SHALL upsert the record in the PromptTranslation table
5. THE system SHALL log translation progress and any errors encountered

### Requirement 9: Translation Verification

**User Story:** As an admin, I want to verify translation coverage, so that I can identify missing translations and ensure content completeness.

#### Acceptance Criteria

1. THE system SHALL provide a script (check-translations.ts) to verify translation coverage
2. WHEN the verification script runs THEN the system SHALL report the total number of prompts
3. WHEN the verification script runs THEN the system SHALL report the number of prompts with Spanish translations
4. WHEN the verification script runs THEN the system SHALL list prompts missing Spanish translations
5. THE system SHALL calculate and display the translation coverage percentage

### Requirement 10: Ingestion Script Updates

**User Story:** As a developer, I want the ingestion script to create initial translations, so that new prompts are automatically prepared for localization.

#### Acceptance Criteria

1. WHEN the ingestion script processes a new prompt THEN the system SHALL create an English PromptTranslation record
2. WHEN the ingestion script processes a new prompt THEN the system SHALL set the English translation text to match the original prompt text
3. THE system SHALL ensure the ingestion script does not fail if translation creation fails
4. THE system SHALL log any translation creation errors during ingestion
5. WHEN the ingestion script completes THEN the system SHALL report the number of translations created

### Requirement 11: Middleware Locale Handling

**User Story:** As a developer, I want middleware to handle locale detection and routing, so that users are automatically directed to the appropriate language version.

#### Acceptance Criteria

1. THE system SHALL implement middleware to intercept all incoming requests
2. WHEN middleware detects a request to "/" THEN the system SHALL read the Accept-Language header
3. WHEN middleware detects a supported language THEN the system SHALL redirect to the corresponding locale path
4. WHEN middleware detects a locale cookie THEN the system SHALL prioritize the cookie over the Accept-Language header
5. THE system SHALL ensure middleware does not interfere with API routes or static assets

### Requirement 12: Locale Persistence

**User Story:** As a user, I want my language preference to be remembered across sessions, so that I don't have to select my language every time I visit.

#### Acceptance Criteria

1. WHEN a user selects a language THEN the system SHALL set a "NEXT_LOCALE" cookie
2. THE system SHALL set the locale cookie with a 365-day expiration
3. THE system SHALL set the locale cookie with SameSite=Lax for security
4. WHEN a user returns to the site THEN the system SHALL read the locale cookie and redirect accordingly
5. WHEN a user clears cookies THEN the system SHALL fall back to browser language detection
