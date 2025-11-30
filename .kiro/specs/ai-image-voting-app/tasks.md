# Implementation Plan

- [x] 1. Initialize Next.js project and configure dependencies
  - Create Next.js 15+ project with App Router and TypeScript
  - Install dependencies: Prisma, Tailwind CSS, shadcn/ui, ua-parser-js, fast-check, vitest
  - Configure Tailwind CSS and set up base styles
  - Set up TypeScript configuration for strict type checking
  - _Requirements: 9.1_

- [x] 2. Set up database schema and Prisma configuration
  - Create Prisma schema with prompts, images, votes, and image_impressions models
  - Configure Prisma for serverless connection pooling
  - Add database indexes for performance optimization
  - Create initial migration files
  - _Requirements: 5.1, 9.3_

- [x] 3. Build ingestion script for local folder structure
  - [x] 3.1 Implement folder scanning and prompt reading
    - Create scanChallenges function to recursively scan challenge folders
    - Implement readPrompt function to read _prompt.txt files
    - Generate slugs from folder names (sanitize, lowercase, replace spaces)
    - _Requirements: 2.1_

  - [x] 3.2 Implement model name normalization
    - Create MODEL_NAME_MAP constant with all model mappings
    - Implement normalizeModelName function with fallback handling
    - Handle edge case: "Nano Banana Pro" → "NanoBananaPro"
    - _Requirements: 2.2_

  - [x] 3.3 Write property test for model name normalization
    - **Property 4: Model name normalization consistency**
    - **Validates: Requirements 2.2**

  - [x] 3.4 Implement image file processing
    - Scan model subfolders for image files
    - Copy images to /public/images/[challenge_slug]/[model_name]/ structure
    - Generate image records with promptId, modelName, imagePath
    - _Requirements: 2.3_

  - [x] 3.5 Write property test for image accessibility
    - **Property 5: Image files are accessible at runtime**
    - **Validates: Requirements 2.3, 2.5**

  - [x] 3.6 Generate Prisma seed data
    - Create generateSeed function to produce seed.ts file
    - Include all prompts and images from scanned folders
    - Add error handling for missing files and duplicate slugs
    - _Requirements: 2.4_

  - [x] 3.7 Write property test for ingestion prompt records
    - **Property 3: Ingestion creates valid prompt records**
    - **Validates: Requirements 2.1**

- [x] 4. Implement fairness algorithm for image selection
  - [x] 4.1 Create selectFairImages function
    - Query images by promptId ordered by impressionCount ascending
    - Group images by impression count
    - Select 4 images with lowest counts, breaking ties randomly
    - Shuffle final selection to randomize positions
    - _Requirements: 3.1, 3.2_

  - [x] 4.2 Write property test for lowest impression count selection
    - **Property 6: Fairness algorithm selects lowest impression counts**
    - **Validates: Requirements 3.2**

  - [x] 4.3 Write property test for tie-breaking randomness
    - **Property 7: Tie-breaking is non-deterministic**
    - **Validates: Requirements 3.3**

  - [x] 4.4 Write property test for position randomization
    - **Property 8: Position randomization**
    - **Validates: Requirements 3.4**

  - [x] 4.5 Implement impression count updates
    - Increment impressionCount for selected images using Prisma updateMany
    - Optionally insert rows in image_impressions table
    - Use database transaction to ensure atomicity
    - _Requirements: 3.5_

  - [x] 4.6 Write property test for impression count increments
    - **Property 9: Impression counts increment correctly**
    - **Validates: Requirements 3.5**

- [x] 5. Create API route for vote submission
  - [x] 5.1 Implement POST /api/vote route handler
    - Parse request body (promptId, selectedModel, shownModels, sessionId)
    - Extract IP from x-forwarded-for or x-real-ip headers
    - Extract country from x-vercel-ip-country header
    - Extract region from x-vercel-ip-city header
    - Parse user agent using ua-parser-js to extract browser, OS, device
    - Create vote record in database with all metadata
    - Return success response
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 5.2 Write property test for vote metadata capture
    - **Property 2: Vote records contain all metadata**
    - **Validates: Requirements 1.3, 4.5**

  - [x] 5.3 Write property test for IP address capture
    - **Property 10: IP address captured from headers**
    - **Validates: Requirements 4.1**

  - [x] 5.4 Write property test for user agent parsing
    - **Property 11: User agent parsing extracts all fields**
    - **Validates: Requirements 4.2**

  - [x] 5.5 Write property test for geolocation headers
    - **Property 12: Geolocation from Vercel headers**
    - **Validates: Requirements 4.3, 4.4**

  - [x] 5.6 Add error handling for vote submission
    - Handle database write failures with retry logic
    - Validate request body schema
    - Return appropriate error responses (400, 500)
    - _Requirements: 1.3_

- [x] 6. Create API route for random prompt selection
  - [x] 6.1 Implement GET /api/prompts/random route handler
    - Select random prompt from database
    - Fetch all images for selected prompt
    - Call selectFairImages to choose 4 images
    - Return prompt data with anonymized image URLs
    - _Requirements: 10.2_

  - [x] 6.2 Write property test for random prompt fairness
    - **Property 24: Random prompt endpoint applies fairness**
    - **Validates: Requirements 10.2**

  - [x] 6.3 Add optional exclude parameter
    - Accept ?exclude=[slug] query parameter
    - Filter out excluded prompt from random selection
    - Handle case where all prompts are excluded
    - _Requirements: 10.2_

- [x] 7. Implement session management
  - [x] 7.1 Create SessionManager client component
    - Check for existing session cookie on mount
    - Generate UUID if no session exists
    - Store session ID in cookie with 30-day expiration
    - Provide session ID via React context
    - _Requirements: 4.5_

  - [x] 7.2 Write unit test for session ID generation
    - Verify UUID format is valid
    - Verify cookie is set with correct expiration
    - _Requirements: 4.5_

- [x] 8. Build voting interface components
  - [x] 8.1 Create ImageGrid client component
    - Accept promptId, promptText, candidates, sessionId as props
    - Render 2×2 grid using CSS Grid or Flexbox
    - Use Next.js Image component for each image
    - Handle click/tap events on images
    - Call POST /api/vote on image selection
    - Show loading state during submission
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 8.2 Write property test for four distinct models
    - **Property 1: Four distinct models displayed**
    - **Validates: Requirements 1.1**

  - [x] 8.3 Create VoteConfirmation component
    - Display toast or modal with "Thanks for voting!" message
    - Provide "Next prompt" button
    - Accept onNext callback prop
    - Auto-dismiss after 3 seconds (optional)
    - _Requirements: 1.4_

  - [x] 8.4 Write property test for confirmation display
    - **Property 23: Navigation option after voting**
    - **Validates: Requirements 10.1**

  - [x] 8.5 Ensure model anonymization in UI
    - Verify image URLs don't expose model names
    - Ensure no model names in visible text
    - Use image IDs or obfuscated paths
    - _Requirements: 8.1, 8.3_

  - [x] 8.6 Write property test for UI anonymization
    - **Property 18: Model names not visible in UI**
    - **Validates: Requirements 8.1**

  - [x] 8.7 Write property test for URL anonymization
    - **Property 19: Image URLs are anonymized**
    - **Validates: Requirements 8.3**

- [x] 9. Create prompt page with dynamic routing
  - [x] 9.1 Implement /p/[slug] page
    - Create app/p/[slug]/page.tsx with Server Component
    - Fetch prompt by slug from database
    - Call selectFairImages to get 4 images
    - Render prompt text prominently above image grid
    - Pass data to ImageGrid client component
    - _Requirements: 10.3, 10.5_

  - [x] 9.2 Write property test for prompt text positioning
    - **Property 25: Prompt text appears before images in DOM**
    - **Validates: Requirements 10.5**

  - [x] 9.3 Add SEO metadata and Open Graph tags
    - Generate metadata with prompt text as title
    - Include og:title, og:description, og:image tags
    - Set appropriate meta tags for social sharing
    - _Requirements: 7.5_

  - [x] 9.4 Write property test for SEO metadata
    - **Property 17: SEO metadata present on prompt pages**
    - **Validates: Requirements 7.5**

  - [x] 9.5 Implement root path redirect
    - Create app/page.tsx that redirects to random prompt
    - Use Next.js redirect() function
    - _Requirements: 10.4_

- [ ] 10. Build admin analytics dashboard
  - [x] 10.1 Implement GET /api/admin/stats route handler
    - Accept query parameters: promptId, modelName, startDate, endDate
    - Query votes and images tables with filters
    - Calculate aggregated statistics: totalVotes, totalImpressions
    - Calculate per-model stats: votes, impressions, winRate, CTR
    - Return structured stats response
    - _Requirements: 6.2, 6.5_

  - [x] 10.2 Write property test for statistics calculations
    - **Property 14: Statistics calculations are mathematically correct**
    - **Validates: Requirements 6.2, 6.5**

  - [x] 10.3 Write property test for admin filters
    - **Property 15: Admin filters narrow results correctly**
    - **Validates: Requirements 6.3**

  - [x] 10.4 Create admin authentication middleware
    - Check for ADMIN_PASSWORD environment variable
    - Implement basic auth or token-based authentication
    - Protect /admin routes with middleware
    - Return 401 for unauthorized access
    - _Requirements: 6.1_

  - [x] 10.5 Build admin dashboard UI at /admin
    - Create app/admin/page.tsx with authentication check
    - Display aggregated statistics in tables
    - Add filter controls for prompt, model, date range
    - Show vote counts, impression counts, win rates, CTR
    - _Requirements: 6.2_

  - [x] 10.6 Implement CSV export functionality
    - Create GET /api/admin/export route handler
    - Accept query parameters for filtering
    - Generate CSV with all vote or impression records
    - Set appropriate headers for file download
    - _Requirements: 6.4_

  - [x] 10.7 Write property test for CSV export
    - **Property 16: CSV export contains all data**
    - **Validates: Requirements 6.4**

- [ ] 11. Add responsive styling and UI polish
  - [x] 11.1 Implement mobile-responsive layout
    - Use Tailwind responsive classes for breakpoints
    - Ensure 2×2 grid works on mobile screens
    - Make images touch-friendly with adequate tap targets
    - Test on various viewport sizes
    - _Requirements: 7.2_

  - [x] 11.2 Add hover effects and visual feedback
    - Implement hover state for images on desktop
    - Add loading spinners during API calls
    - Style VoteConfirmation toast/modal
    - Ensure accessibility with focus states
    - _Requirements: 1.5_

  - [x] 11.3 Optimize image loading
    - Configure Next.js Image with appropriate sizes
    - Implement lazy loading for images
    - Add blur placeholders for better UX
    - Set cache headers for static images
    - _Requirements: 7.1, 7.4_

- [ ] 12. Configure environment variables and deployment
  - [x] 12.1 Set up environment variables
    - Create .env.example with required variables
    - Document DATABASE_URL, ADMIN_PASSWORD, etc.
    - Implement validation for required env vars
    - _Requirements: 9.4_

  - [x] 12.2 Write property test for environment variable reading
    - **Property 22: Environment variables are read correctly**
    - **Validates: Requirements 9.4**

  - [x] 12.3 Prepare for Vercel deployment
    - Create vercel.json if needed for configuration
    - Ensure all API routes are serverless-compatible
    - Test database connection pooling settings
    - Document deployment steps in README
    - _Requirements: 9.2, 9.5_

- [x] 13. Run ingestion script and seed database
  - Execute ingestion script on local images folder
  - Verify all prompts and images are created in database
  - Check that image files are copied to /public/images/
  - Run Prisma seed to populate database
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 14. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
