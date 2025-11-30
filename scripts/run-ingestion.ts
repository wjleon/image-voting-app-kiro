import fs from 'fs';
import path from 'path';
import { scanChallenges, copyImagesToPublic, generateSeed } from './ingest';

/**
 * Main ingestion script
 * Scans the images folder, copies files to public, and generates seed data
 */
async function main() {
  console.log('='.repeat(60));
  console.log('AI Image Voting App - Ingestion Script');
  console.log('='.repeat(60));
  console.log();

  const imagesPath = path.join(process.cwd(), 'images');
  const publicPath = path.join(process.cwd(), 'public');
  const seedPath = path.join(process.cwd(), 'prisma', 'seed.ts');

  // Step 1: Scan challenges
  console.log('Step 1: Scanning challenge folders...\n');
  const challenges = scanChallenges(imagesPath);

  if (challenges.length === 0) {
    console.error('No challenges found! Exiting.');
    process.exit(1);
  }

  // Step 2: Copy images to public directory
  console.log('\nStep 2: Copying images to public directory...\n');
  let totalImagesCopied = 0;

  for (const challenge of challenges) {
    for (const model of challenge.models) {
      copyImagesToPublic(model.images, publicPath);
      totalImagesCopied += model.images.length;
    }
  }

  console.log(`✓ Copied ${totalImagesCopied} images to public directory`);

  // Step 3: Generate seed file
  console.log('\nStep 3: Generating Prisma seed file...\n');
  const seedCode = generateSeed(challenges);
  fs.writeFileSync(seedPath, seedCode, 'utf-8');
  console.log(`✓ Generated seed file at ${seedPath}`);

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Ingestion Complete!');
  console.log('='.repeat(60));
  console.log(`Challenges processed: ${challenges.length}`);
  console.log(`Images copied: ${totalImagesCopied}`);
  console.log(`Seed file: ${seedPath}`);
  console.log();
  console.log('Next steps:');
  console.log('  1. Run: npm run db:push (to create database tables)');
  console.log('  2. Run: npm run db:seed (to populate the database)');
  console.log('  3. Run: npm run db:studio (to view the data)');
  console.log();
}

main().catch((error) => {
  console.error('Ingestion failed:', error);
  process.exit(1);
});
