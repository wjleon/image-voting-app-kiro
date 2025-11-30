#!/usr/bin/env tsx

/**
 * Anonymize Image Paths Script
 * Reorganizes images to remove model names from paths
 */

import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import prisma from '../lib/prisma';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

/**
 * Generate anonymous filename from image ID
 */
function generateAnonymousPath(imageId: string, promptSlug: string, extension: string): string {
  // Create a short hash from the image ID
  const hash = createHash('md5').update(imageId).digest('hex').substring(0, 8);
  return `/images/${promptSlug}/${hash}${extension}`;
}

/**
 * Main anonymization function
 */
async function main() {
  console.log('🔒 Starting image path anonymization...\n');

  // Get all images from database
  const images = await prisma.image.findMany({
    include: {
      prompt: {
        select: {
          slug: true,
        },
      },
    },
  });

  console.log(`Found ${images.length} images to process\n`);

  let successCount = 0;
  let errorCount = 0;
  const updates: Array<{ id: string; oldPath: string; newPath: string }> = [];

  for (const image of images) {
    try {
      const oldPath = image.imagePath;
      const oldFullPath = path.join(PUBLIC_DIR, oldPath);

      // Check if file exists
      if (!fs.existsSync(oldFullPath)) {
        console.warn(`⚠️  File not found: ${oldPath}`);
        continue;
      }

      // Get file extension
      const extension = path.extname(oldPath);

      // Generate new anonymous path
      const newPath = generateAnonymousPath(image.id, image.prompt.slug, extension);
      const newFullPath = path.join(PUBLIC_DIR, newPath);

      // Create directory if it doesn't exist
      const newDir = path.dirname(newFullPath);
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });
      }

      // Copy file to new location (don't delete old yet, in case of errors)
      fs.copyFileSync(oldFullPath, newFullPath);

      // Store update for database
      updates.push({
        id: image.id,
        oldPath,
        newPath,
      });

      successCount++;
    } catch (error) {
      console.error(`❌ Error processing image ${image.id}:`, error);
      errorCount++;
    }
  }

  // Update database
  console.log(`\n📝 Updating database with ${updates.length} new paths...`);

  for (const update of updates) {
    try {
      await prisma.image.update({
        where: { id: update.id },
        data: { imagePath: update.newPath },
      });
    } catch (error) {
      console.error(`❌ Error updating database for image ${update.id}:`, error);
      errorCount++;
    }
  }

  // Clean up old directory structure
  console.log('\n🧹 Cleaning up old directory structure...');

  const promptDirs = fs.readdirSync(IMAGES_DIR);
  for (const promptDir of promptDirs) {
    const promptPath = path.join(IMAGES_DIR, promptDir);
    if (!fs.statSync(promptPath).isDirectory()) continue;

    // Check for model subdirectories
    const contents = fs.readdirSync(promptPath);
    for (const item of contents) {
      const itemPath = path.join(promptPath, item);
      if (fs.statSync(itemPath).isDirectory()) {
        // This is a model directory, remove it
        fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`  Removed: ${promptDir}/${item}`);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Anonymization Summary');
  console.log('='.repeat(60));
  console.log(`Total images: ${images.length}`);
  console.log(`✅ Successfully anonymized: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('\n✨ Image anonymization completed!');

  await prisma.$disconnect();
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
