# Requirements Document

## Introduction

This document specifies the requirements for an AI Image Model Comparison Voting Application. The system enables users to evaluate and vote on AI-generated images from different models using identical prompts. The application ingests a local folder structure containing prompts and images, deploys to Vercel with Next.js, and tracks votes and impressions in a Postgres database. A fairness algorithm ensures balanced exposure across all models to produce statistically meaningful comparison data.

## Glossary

- **Voting System**: The web application that displays prompts and images for user evaluation
- **Model**: An AI image generation system (ByteDance, ChatGPT, Flux, Grok, Ideogram, Leonardo, Midjourney, NanoBananaPro, Qwen, Reve)
- **Prompt**: A text description used to generate images across different models
- **Challenge**: A top-level folder containing a prompt and model-specific image outputs
- **Impression**: A single instance of an image being displayed to a user
- **Vote**: A user's selection of one image from the displayed set
- **Fairness Algorithm**: A selection mechanism that prioritizes showing images with the lowest impression counts
- **Ingestion Process**: The pre-deployment step that converts local folder structure into database records and deployed assets
- **Session**: A unique browsing session identified by a client-side UUID cookie
- **Admin Panel**: A protected interface for viewing analytics and exporting data

## Requirements

### Requirement 1

**User Story:** As a site visitor, I want to view a prompt with four AI-generated images and vote on my favorite, so that I can contribute to model comparison data.

#### Acceptance Criteria

1. WHEN a user navigates to a prompt page THEN the Voting System SHALL display the prompt text and exactly four images from four different models
2. WHEN images are displayed THEN the Voting System SHALL arrange them in a 2×2 grid with equal sizing
3. WHEN a user clicks or taps on one of the four images THEN the Voting System SHALL record the vote with the chosen model and all metadata
4. WHEN a vote is recorded THEN the Voting System SHALL display a confirmation message to the user
5. WHEN a user hovers over an image on desktop THEN the Voting System SHALL provide visual feedback highlighting that image

### Requirement 2

**User Story:** As the application owner, I want to ingest my local folder structure into a deployed application, so that the voting system can operate independently on Vercel without accessing my local filesystem.

#### Acceptance Criteria

1. WHEN the ingestion process scans a challenge folder THEN the Voting System SHALL read the _prompt.txt file and create a prompt record with slug and text
2. WHEN the ingestion process encounters a model subfolder THEN the Voting System SHALL normalize the model name according to the standard mapping
3. WHEN the ingestion process finds image files THEN the Voting System SHALL copy or upload each image to a runtime-accessible location
4. WHEN the ingestion process completes THEN the Voting System SHALL generate database seed data for all prompts and images
5. WHEN the application runs on Vercel THEN the Voting System SHALL serve images from the deployed location using image_path values from the database

### Requirement 3

**User Story:** As the application owner, I want each model and image to be shown approximately the same number of times, so that my comparison statistics are unbiased and meaningful.

#### Acceptance Criteria

1. WHEN selecting images for a prompt THEN the Voting System SHALL query all images for that prompt and retrieve their impression counts
2. WHEN multiple images are available THEN the Voting System SHALL select the four images with the lowest impression counts
3. WHEN multiple images share the same lowest impression count THEN the Voting System SHALL break ties randomly
4. WHEN four images are selected THEN the Voting System SHALL randomize their display positions to avoid position bias
5. WHEN images are displayed to a user THEN the Voting System SHALL increment the impression_count for each of the four images

### Requirement 4

**User Story:** As the application owner, I want to capture comprehensive metadata with each vote, so that I can perform detailed statistical analysis.

#### Acceptance Criteria

1. WHEN a vote is submitted THEN the Voting System SHALL capture the IP address from request headers
2. WHEN a vote is submitted THEN the Voting System SHALL capture and parse the user agent string to extract browser, OS, and device type
3. WHEN a vote is submitted THEN the Voting System SHALL capture the country from the x-vercel-ip-country header
4. WHEN a vote is submitted THEN the Voting System SHALL capture the region or city from the x-vercel-ip-city header
5. WHEN a vote is submitted THEN the Voting System SHALL record a UTC timestamp, session ID, chosen model, and the list of all four shown models

### Requirement 5

**User Story:** As the application owner, I want all voting and impression data persisted in Postgres, so that I have a reliable and queryable data store.

#### Acceptance Criteria

1. WHEN the database is initialized THEN the Voting System SHALL create tables for prompts, images, votes, and optionally image_impressions
2. WHEN a prompt is created THEN the Voting System SHALL store an id, text, and slug in the prompts table
3. WHEN an image is created THEN the Voting System SHALL store an id, prompt_id, model_name, image_path, and impression_count in the images table
4. WHEN a vote is recorded THEN the Voting System SHALL insert a row in the votes table with all required metadata fields
5. WHEN an image is displayed THEN the Voting System SHALL either increment images.impression_count or insert a row in image_impressions

### Requirement 6

**User Story:** As the application owner, I want an admin panel to view analytics and export data, so that I can analyze voting patterns and model performance.

#### Acceptance Criteria

1. WHEN an admin accesses the admin panel THEN the Voting System SHALL require authentication via password or Vercel protection
2. WHEN the admin panel loads THEN the Voting System SHALL display aggregated statistics including vote counts, impression counts, win rates, and click-through rates per model
3. WHEN an admin applies filters THEN the Voting System SHALL filter results by prompt, model, or date range
4. WHEN an admin requests data export THEN the Voting System SHALL generate a CSV file containing votes or impressions data
5. WHEN the admin panel displays statistics THEN the Voting System SHALL calculate win rate as votes per model divided by total votes and CTR as votes divided by impressions

### Requirement 7

**User Story:** As a site visitor on any device, I want a fast and responsive interface, so that I can vote efficiently on mobile or desktop.

#### Acceptance Criteria

1. WHEN the application renders images THEN the Voting System SHALL use Next.js Image component for optimization and lazy loading
2. WHEN a user accesses the site on mobile THEN the Voting System SHALL display a mobile-responsive layout with touch-friendly controls
3. WHEN a user accesses the site THEN the Voting System SHALL apply modern styling using Tailwind CSS or similar framework
4. WHEN images load THEN the Voting System SHALL implement caching strategies to minimize load times
5. WHEN a prompt page is accessed THEN the Voting System SHALL generate SEO-friendly metadata including Open Graph tags

### Requirement 8

**User Story:** As a site visitor, I want to see images without knowing which model created them, so that my vote is unbiased.

#### Acceptance Criteria

1. WHEN images are displayed to a user THEN the Voting System SHALL NOT show model names or identifiable information in the UI
2. WHEN image filenames are generated THEN the Voting System SHALL use anonymized naming that does not reveal the model identity
3. WHEN a user inspects the page source THEN the Voting System SHALL ensure image paths do not obviously indicate the model name
4. WHEN a vote is submitted THEN the Voting System SHALL internally track the model mapping without exposing it to the client
5. WHEN the confirmation message is shown THEN the Voting System SHALL NOT reveal which model the user voted for

### Requirement 9

**User Story:** As a developer, I want the application to be fully compatible with Vercel's serverless architecture, so that deployment and scaling are seamless.

#### Acceptance Criteria

1. WHEN the application is built THEN the Voting System SHALL use Next.js 15+ with App Router and TypeScript
2. WHEN API routes are implemented THEN the Voting System SHALL use serverless-compatible patterns without background workers
3. WHEN database connections are established THEN the Voting System SHALL use connection pooling appropriate for serverless environments
4. WHEN environment variables are needed THEN the Voting System SHALL read them from Vercel's environment configuration
5. WHEN the application is deployed THEN the Voting System SHALL function correctly in Vercel's Node.js serverless runtime

### Requirement 10

**User Story:** As a site visitor, I want to navigate between different prompts easily, so that I can vote on multiple comparisons.

#### Acceptance Criteria

1. WHEN a user completes a vote THEN the Voting System SHALL provide an option to advance to the next prompt
2. WHEN a user requests a random prompt THEN the Voting System SHALL select a prompt and apply the fairness algorithm to choose four images
3. WHEN a prompt is accessed THEN the Voting System SHALL use a dedicated route pattern such as /p/[slug]
4. WHEN a user navigates to the root path THEN the Voting System SHALL redirect to a random prompt or display a prompt selection interface
5. WHEN a prompt page loads THEN the Voting System SHALL display the prompt text prominently above the image grid
