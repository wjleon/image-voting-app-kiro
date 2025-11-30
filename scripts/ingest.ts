import fs from 'fs';
import path from 'path';
import { Challenge, ModelName, MODEL_NAME_MAP, ImageFile } from '../types';

/**
 * Generates a URL-friendly slug from a folder name
 * @param folderName - The folder name to convert
 * @returns A slugified string (lowercase, hyphens, no special chars)
 */
export function generateSlug(folderName: string): string {
  return folderName
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Reads the prompt text from a challenge folder
 * Looks for _prompt.txt first, then falls back to prompt.txt
 * @param challengePath - Path to the challenge folder
 * @returns The prompt text content
 */
export function readPrompt(challengePath: string): string {
  const promptFile = path.join(challengePath, '_prompt.txt');
  const altPromptFile = path.join(challengePath, 'prompt.txt');

  try {
    if (fs.existsSync(promptFile)) {
      return fs.readFileSync(promptFile, 'utf-8').trim();
    } else if (fs.existsSync(altPromptFile)) {
      return fs.readFileSync(altPromptFile, 'utf-8').trim();
    } else {
      throw new Error(`No prompt file found in ${challengePath}`);
    }
  } catch (error) {
    console.error(`Error reading prompt from ${challengePath}:`, error);
    throw error;
  }
}

/**
 * Normalizes a model folder name to a standard ModelName
 * @param folderName - The folder name to normalize
 * @returns The normalized ModelName
 * @throws Error if the folder name doesn't match any known model
 */
export function normalizeModelName(folderName: string): ModelName {
  // Direct lookup in the map
  if (folderName in MODEL_NAME_MAP) {
    return MODEL_NAME_MAP[folderName];
  }

  // Try case-insensitive lookup
  const lowerFolderName = folderName.toLowerCase();
  for (const [key, value] of Object.entries(MODEL_NAME_MAP)) {
    if (key.toLowerCase() === lowerFolderName) {
      return value;
    }
  }

  // Handle edge case: "Nano Banana Pro" vs "Nano Banana"
  if (folderName.includes('Nano Banana')) {
    return 'NanoBananaPro';
  }

  throw new Error(`Unknown model folder name: ${folderName}`);
}

/**
 * Checks if a file is a valid image file
 * @param filename - The filename to check
 * @returns True if the file is an image
 */
function isImageFile(filename: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

/**
 * Scans a model folder for image files
 * @param modelPath - Path to the model folder
 * @param challengeSlug - Slug of the parent challenge
 * @param modelName - Normalized model name
 * @returns Array of ImageFile objects
 */
function scanModelImages(
  modelPath: string,
  challengeSlug: string,
  modelName: ModelName
): ImageFile[] {
  const images: ImageFile[] = [];

  try {
    const files = fs.readdirSync(modelPath);

    for (const file of files) {
      const filePath = path.join(modelPath, file);
      const stat = fs.statSync(filePath);

      // Skip directories and non-image files
      if (!stat.isFile() || !isImageFile(file)) {
        continue;
      }

      // Extract sequence number from filename (e.g., "...-1.png" -> 1)
      const match = file.match(/-(\d+)\.\w+$/);
      const sequence = match ? parseInt(match[1], 10) : 1;

      // Generate deployed path: /images/[challenge_slug]/[model_name]/[filename]
      const deployedPath = `/images/${challengeSlug}/${modelName}/${file}`;

      images.push({
        originalPath: filePath,
        deployedPath,
        filename: file,
        sequence,
      });
    }

    return images.sort((a, b) => a.sequence - b.sequence);
  } catch (error) {
    console.error(`Error scanning model images in ${modelPath}:`, error);
    return [];
  }
}

/**
 * Copies image files to the public directory
 * @param images - Array of ImageFile objects
 * @param publicPath - Path to the public directory
 */
export function copyImagesToPublic(images: ImageFile[], publicPath: string): void {
  for (const image of images) {
    const destPath = path.join(publicPath, image.deployedPath);
    const destDir = path.dirname(destPath);

    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Copy the file
    try {
      fs.copyFileSync(image.originalPath, destPath);
    } catch (error) {
      console.error(`Error copying ${image.originalPath} to ${destPath}:`, error);
    }
  }
}

/**
 * Generates Prisma seed data from challenges
 * @param challenges - Array of Challenge objects
 * @returns TypeScript code for the seed file
 */
export function generateSeed(challenges: Challenge[]): string {
  const seedCode = `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.imageImpression.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.image.deleteMany();
  await prisma.prompt.deleteMany();

  console.log('Creating prompts and images...');

${challenges
  .map((challenge, idx) => {
    const promptVar = `prompt${idx + 1}`;
    return `  // ${challenge.folderName}
  const ${promptVar} = await prisma.prompt.create({
    data: {
      text: ${JSON.stringify(challenge.promptText)},
      slug: ${JSON.stringify(challenge.slug)},
    },
  });
  console.log('✓ Created prompt: ${challenge.slug}');

${challenge.models
  .map((model) => {
    return model.images
      .map((image) => {
        return `  await prisma.image.create({
    data: {
      promptId: ${promptVar}.id,
      modelName: ${JSON.stringify(model.modelName)},
      imagePath: ${JSON.stringify(image.deployedPath)},
      impressionCount: 0,
    },
  });`;
      })
      .join('\n');
  })
  .join('\n')}
  console.log('  Created ${challenge.models.reduce((sum, m) => sum + m.images.length, 0)} images for ${challenge.slug}');
`;
  })
  .join('\n')}

  const promptCount = await prisma.prompt.count();
  const imageCount = await prisma.image.count();

  console.log('\\n=== Seed Summary ===');
  console.log(\`Total prompts: \${promptCount}\`);
  console.log(\`Total images: \${imageCount}\`);
  console.log('\\nSeed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

  return seedCode;
}

/**
 * Scans a directory for challenge folders and extracts their data
 * @param rootPath - Path to the root images directory
 * @returns Array of Challenge objects
 */
export function scanChallenges(rootPath: string): Challenge[] {
  const challenges: Challenge[] = [];

  try {
    const entries = fs.readdirSync(rootPath, { withFileTypes: true });

    for (const entry of entries) {
      // Skip files and hidden directories
      if (!entry.isDirectory() || entry.name.startsWith('.')) {
        continue;
      }

      const challengePath = path.join(rootPath, entry.name);
      const promptFile = path.join(challengePath, '_prompt.txt');
      const altPromptFile = path.join(challengePath, 'prompt.txt');

      // Only process folders that have a prompt file
      if (!fs.existsSync(promptFile) && !fs.existsSync(altPromptFile)) {
        console.warn(`Skipping ${entry.name}: No prompt file found`);
        continue;
      }

      try {
        const promptText = readPrompt(challengePath);
        const slug = generateSlug(entry.name);

        const challenge: Challenge = {
          folderName: entry.name,
          slug,
          promptText,
          models: [],
        };

        // Scan for model subfolders
        const modelEntries = fs.readdirSync(challengePath, { withFileTypes: true });
        for (const modelEntry of modelEntries) {
          if (!modelEntry.isDirectory() || modelEntry.name.startsWith('.') || modelEntry.name.startsWith('_')) {
            continue;
          }

          try {
            const modelName = normalizeModelName(modelEntry.name);
            const modelPath = path.join(challengePath, modelEntry.name);
            const images = scanModelImages(modelPath, slug, modelName);

            if (images.length > 0) {
              challenge.models.push({
                modelName,
                images,
              });
            }
          } catch (error) {
            console.warn(`  ⚠ Skipping unknown model folder: ${modelEntry.name}`);
          }
        }

        challenges.push(challenge);
        console.log(`✓ Found challenge: ${entry.name} (slug: ${slug}, ${challenge.models.length} models, ${challenge.models.reduce((sum, m) => sum + m.images.length, 0)} images)`);
      } catch (error) {
        console.error(`Error processing challenge ${entry.name}:`, error);
        // Continue with other challenges
      }
    }

    console.log(`\nTotal challenges found: ${challenges.length}`);
    return challenges;
  } catch (error) {
    console.error(`Error scanning directory ${rootPath}:`, error);
    throw error;
  }
}

// Main execution when run directly
if (require.main === module) {
  const imagesPath = path.join(process.cwd(), 'images');
  console.log('Starting challenge scan...\n');
  console.log(`Scanning directory: ${imagesPath}\n`);

  try {
    const challenges = scanChallenges(imagesPath);
    console.log('\n=== Scan Summary ===');
    console.log(`Total challenges: ${challenges.length}`);
    console.log('\nSample challenges:');
    challenges.slice(0, 5).forEach((c) => {
      console.log(`  - ${c.folderName}`);
      console.log(`    Slug: ${c.slug}`);
      console.log(`    Prompt: ${c.promptText.substring(0, 60)}...`);
    });

    // Test model name normalization
    console.log('\n=== Testing Model Name Normalization ===');
    const testNames = [
      'ByteDance',
      'ChatGPT',
      'Flux',
      'Grok',
      'Ideogram',
      'Leonardo',
      'Midjourney',
      'Nano Banana Pro',
      'Nano Banana',
      'Qwen',
      'Reve',
    ];

    testNames.forEach((name) => {
      try {
        const normalized = normalizeModelName(name);
        console.log(`✓ ${name} → ${normalized}`);
      } catch (error) {
        console.error(`✗ ${name} → ERROR: ${error}`);
      }
    });

    // Test image copying (dry run - just show what would be copied)
    console.log('\n=== Image Copy Test (Sample) ===');
    const sampleChallenge = challenges[0];
    if (sampleChallenge && sampleChallenge.models.length > 0) {
      const sampleModel = sampleChallenge.models[0];
      console.log(`Sample: ${sampleChallenge.folderName} / ${sampleModel.modelName}`);
      console.log(`Images to copy: ${sampleModel.images.length}`);
      sampleModel.images.slice(0, 2).forEach((img) => {
        console.log(`  ${img.originalPath} → public${img.deployedPath}`);
      });
    }
  } catch (error) {
    console.error('Failed to scan challenges:', error);
    process.exit(1);
  }
}
