/**
 * This script updates the seed.ts file to use anonymous slugs
 * Run this once to update the seed file, then commit the changes
 */

import { readFileSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';

// Read the seed file
const seedPath = 'prisma/seed.ts';
let content = readFileSync(seedPath, 'utf-8');

// Find all slug definitions and replace them with a placeholder
// Pattern: slug: "any-slug-name",
const slugPattern = /slug: "[^"]+",/g;

// Replace all slugs with a temporary marker that we'll update after
content = content.replace(slugPattern, 'slug: "TEMP_SLUG",');

// Add a comment explaining the slug will be updated
const commentToAdd = `
  // Note: Slugs are updated after creation to use anonymous IDs
  // This prevents exposing model names in URLs`;

// Insert the comment before the first prompt creation
content = content.replace(
  '// ChatGPT 1 Person in 4 ages',
  commentToAdd + '\n\n  // ChatGPT 1 Person in 4 ages'
);

// Now we need to add slug updates after each prompt creation
// Find all prompt variable assignments: const prompt1 = await prisma.prompt.create
const promptPattern = /(const prompt\d+ = await prisma\.prompt\.create\({[\s\S]*?}\);)/g;

let matches = content.match(promptPattern);
if (matches) {
  matches.forEach((match, index) => {
    const promptNum = index + 1;
    const updateCode = `
  // Update slug to anonymous ID
  await prisma.prompt.update({
    where: { id: prompt${promptNum}.id },
    data: { slug: generateAnonymousSlug(prompt${promptNum}.id) },
  });`;
    
    content = content.replace(match, match + updateCode);
  });
}

writeFileSync(seedPath, content);
console.log('✅ Updated seed.ts to use anonymous slugs');
console.log('   Run: npm run db:seed to apply changes');
