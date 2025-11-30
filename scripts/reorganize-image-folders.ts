#!/usr/bin/env tsx

/**
 * Reorganize Image Folders Script
 * Moves images to folders matching the new anonymized prompt slugs
 */

import fs from 'fs';
import path from 'path';
import prisma from '../lib/prisma';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

/**
 * Main reorganization function
 */
async function main() {
  console.log('📁 Starting image folder reorganization...\n');

  // Get all images with their prompt slugs
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

      // Extract filename from old path
      const filename = path.basename(oldPath);

      // Generate new path with anonymized prompt slug
      const newPath = `/images/${image.prompt.slug}/${filename}`;
      const newFullPath = path.join(PUBLIC_DIR, newPath);

      // Skip if already in correct location
      if (oldPath === newPath) {
        continue;
      }

      // Create directory if it doesn't exist
      const newDir = path.dirname(newFullPath);
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });
      }

      // Move file to new location
      fs.renameSync(oldFullPath, newFullPath);

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

  // Clean up old directories
  console.log('\n🧹 Cleaning up old directories...');

  const allDirs = fs.readdirSync(IMAGES_DIR);
  for (const dir of allDirs) {
    const dirPath = path.join(IMAGES_DIR, dir);
    if (!fs.statSync(dirPath).isDirectory()) continue;

    // Check if directory is empty or only contains subdirectories
    const contents = fs.readdirSync(dirPath);
    if (contents.length === 0) {
      fs.rmdirSync(dirPath);
      console.log(`  Removed empty directory: ${dir}`);
    } else {
      // Check if it only contains empty subdirectories
      let hasFiles = false;
      for (const item of contents) {
        const itemPath = path.join(dirPath, item);
        if (fs.statSync(itemPath).isFile()) {
          hasFiles = true;
          break;
        }
      }
      if (!hasFiles) {
        fs.rmSync(dirPath, { recursive: true, force: true });
        console.log(`  Removed directory with only subdirs: ${dir}`);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Reorganization Summary');
  console.log('='.repeat(60));
  console.log(`Total images: ${images.length}`);
  console.log(`✅ Successfully reorganized: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('\n✨ Image folder reorganization completed!');

  await prisma.$disconnect();
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
