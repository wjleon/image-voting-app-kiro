# Image Ingestion Guide

This guide explains how to ingest images from your local folder structure into the database.

## Prerequisites

- Database is set up and accessible
- Environment variables are configured (`.env` file exists)
- Images are organized in the correct folder structure

## Folder Structure

Images should be organized as follows:

```
images/
├── Challenge Name 1/
│   ├── _prompt.txt          # Contains the prompt text
│   ├── Model Name 1/
│   │   ├── image1.jpg
│   │   ├── image2.png
│   │   └── ...
│   ├── Model Name 2/
│   │   └── ...
│   └── ...
├── Challenge Name 2/
│   └── ...
└── ...
```

### Folder Naming Conventions

- **Challenge folders**: Any name (will be converted to slug)
- **Model folders**: Must match model names in the system:
  - ByteDance
  - ChatGPT
  - Claude
  - Flux
  - Grok
  - Ideogram
  - Leonardo
  - Midjourney
  - NanoBananaPro (or "Nano Banana Pro")
  - Qwen
  - Reve

### Prompt File

Each challenge folder must contain a `_prompt.txt` file with the prompt text.

## Running the Ingestion

### Step 1: Verify Database Connection

```bash
# Test database connection
npm run db:studio
```

This opens Prisma Studio. If it works, your database connection is good.

### Step 2: Run the Ingestion Script

```bash
# Run the ingestion script
npx tsx scripts/run-ingestion.ts
```

This script will:
1. Scan the `images/` folder
2. Read all `_prompt.txt` files
3. Copy images to `/public/images/[slug]/[model]/`
4. Generate a seed file at `prisma/seed.ts`

### Step 3: Seed the Database

```bash
# Run the seed to populate the database
npm run db:seed
```

This will:
1. Clear existing data (votes, images, prompts)
2. Create all prompts from the seed file
3. Create all image records
4. Set impression counts to 0

### Step 4: Verify the Data

```bash
# Open Prisma Studio to verify
npm run db:studio
```

Check that:
- [ ] All prompts are created
- [ ] All images are linked to prompts
- [ ] Image paths are correct
- [ ] Model names are normalized

## Troubleshooting

### Issue: "Cannot find images folder"

**Solution**: Ensure the `images/` folder exists in the project root.

### Issue: "No _prompt.txt found"

**Solution**: Each challenge folder must have a `_prompt.txt` file with the prompt text.

### Issue: "Model name not recognized"

**Solution**: Check that model folder names match the expected names. The script will normalize some variations:
- "Nano Banana Pro" → "NanoBananaPro"
- Case variations are handled automatically

### Issue: "Images not copying"

**Solution**: 
- Check file permissions
- Ensure `/public/images/` directory exists
- Verify image file extensions are supported (.jpg, .jpeg, .png, .webp)

### Issue: "Seed fails with duplicate slug"

**Solution**: 
- Check for duplicate challenge folder names
- Slugs are generated from folder names (lowercase, spaces to hyphens)
- Rename folders to be unique

## Manual Verification

After ingestion, verify:

1. **Image Files**:
   ```bash
   ls -R public/images/
   ```
   Should show all copied images in organized folders.

2. **Database Records**:
   - Open Prisma Studio
   - Check `Prompt` table for all prompts
   - Check `Image` table for all images
   - Verify `imagePath` values match actual files

3. **Test the App**:
   ```bash
   npm run dev
   ```
   - Navigate to homepage
   - Should redirect to a random prompt
   - Images should display correctly
   - Voting should work

## Re-running Ingestion

To re-run ingestion:

1. **Clear the database**:
   ```bash
   npm run db:reset
   ```
   ⚠️ This deletes ALL data including votes!

2. **Re-run ingestion**:
   ```bash
   npx tsx scripts/run-ingestion.ts
   npm run db:seed
   ```

## Production Ingestion

For production deployment:

1. Run ingestion locally first
2. Commit the generated `prisma/seed.ts` file
3. Commit images in `/public/images/` to Git
4. Deploy to Vercel
5. Run seed on production:
   ```bash
   DATABASE_URL="your-prod-url" npx prisma db seed
   ```

## Image Optimization Tips

- Use compressed images (< 500KB per image)
- Prefer JPEG for photos, PNG for graphics
- Next.js will automatically optimize images at runtime
- Consider using WebP format for better compression

## Monitoring

After ingestion, monitor:
- Database size
- Image storage usage
- Number of prompts and images
- Impression counts (should all be 0 initially)
