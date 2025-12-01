# URL Anonymization

This application anonymizes URLs to prevent exposing AI model names to users during voting.

## What's Anonymized

### 1. Prompt Slugs
- **Before**: `/en/p/claude-11-the-ai-action-figure`
- **After**: `/en/p/p-f378b9c6`

Slugs are generated using a hash of the prompt ID, creating short, anonymous identifiers.

### 2. Image URLs
- **Before**: `/images/claude-11-the-ai-action-figure/Leonardo/file.jpg`
- **After**: `/api/image/[uuid]`

Images are served through an API endpoint that uses the image's UUID, completely hiding the model name.

## How It Works

### Slug Anonymization

Slugs are generated using SHA-256 hash of the prompt ID:
```typescript
function generateAnonymousSlug(promptId: string): string {
  const hash = createHash('sha256').update(promptId).digest('hex');
  return `p-${hash.substring(0, 8)}`;
}
```

### Image Anonymization

Images are served through `/api/image/[imageId]` which:
1. Looks up the image by UUID
2. Returns a redirect to the actual static file path
3. Hides the model name from the URL

## Running Anonymization

### After Seeding Database

If you've just run `npm run db:seed`, you need to anonymize the slugs:

```bash
npm run anonymize:slugs
```

### Full Anonymization

To anonymize both slugs and images:

```bash
npm run anonymize
```

## Verification

Check that slugs are anonymized:

```bash
npx tsx -e "import prisma from './lib/prisma'; prisma.prompt.findMany({ select: { slug: true } }).then(p => console.log(p)).finally(() => prisma.\$disconnect())"
```

All slugs should start with `p-` followed by 8 hexadecimal characters.

## Why This Matters

Anonymizing URLs ensures:
- Users can't see which AI model generated which image before voting
- Voting results are unbiased
- The blind comparison test remains valid
- Model names are only revealed after a vote is cast
