import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * IMPORTANT: After running this seed, you MUST run the anonymize-slugs script:
 *   npm run anonymize:slugs
 * 
 * This ensures URLs don't expose model names (e.g., p-f378b9c6 instead of claude-11-the-ai-action-figure)
 * See scripts/anonymize-slugs.ts for the implementation.
 */

async function main() {
  console.log('Starting database seed...');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.imageImpression.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.image.deleteMany();
  await prisma.prompt.deleteMany();

  console.log('Creating prompts and images...');

  // ChatGPT 1 Person in 4 ages
  const prompt1 = await prisma.prompt.create({
    data: {
      text: "Create a single 4-panel image showing the same person at four different stages of life:\n\n1) Age 8 – a curious kid reading a science book on the floor.\n2) Age 22 – a university student coding late at night with a laptop and coffee.\n3) Age 40 – a professional giving a talk on AI at a modern conference.\n4) Age 70 – an older version of the same person teaching a child how to paint.\n\nThe person should clearly be the same individual in all panels: same face structure, eye color, and overall vibe, just aging naturally. \nStyle: ultra-photorealistic but slightly cinematic, soft depth of field.\nLighting: warm, believable indoor lighting in every panel.\nLayout: 4 equal vertical panels in one image, with subtle separators between them.\nAspect ratio: 16:9 overall.",
      slug: "chatgpt-1-person-in-4-ages",
      translations: {
        create: {
          language: 'en',
          text: "Create a single 4-panel image showing the same person at four different stages of life:\n\n1) Age 8 – a curious kid reading a science book on the floor.\n2) Age 22 – a university student coding late at night with a laptop and coffee.\n3) Age 40 – a professional giving a talk on AI at a modern conference.\n4) Age 70 – an older version of the same person teaching a child how to paint.\n\nThe person should clearly be the same individual in all panels: same face structure, eye color, and overall vibe, just aging naturally. \nStyle: ultra-photorealistic but slightly cinematic, soft depth of field.\nLighting: warm, believable indoor lighting in every panel.\nLayout: 4 equal vertical panels in one image, with subtle separators between them.\nAspect ratio: 16:9 overall.",
        },
      },
    },
  });
  console.log('✓ Created prompt: chatgpt-1-person-in-4-ages');

  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "ByteDance",
      imagePath: "/images/chatgpt-1-person-in-4-ages/ByteDance/ChatGPT_1_Person_in_4_ages-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "ChatGPT",
      imagePath: "/images/chatgpt-1-person-in-4-ages/ChatGPT/ChatGPT_1_Person_in_4_ages-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "ChatGPT",
      imagePath: "/images/chatgpt-1-person-in-4-ages/ChatGPT/ChatGPT_1_Person_in_4_ages-ChatGPT-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Flux/ChatGPT_1_Person_in_4_ages-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Flux/ChatGPT_1_Person_in_4_ages-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Flux/ChatGPT_1_Person_in_4_ages-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Flux/ChatGPT_1_Person_in_4_ages-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Grok",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Grok/ChatGPT_1_Person_in_4_ages-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Grok",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Grok/ChatGPT_1_Person_in_4_ages-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Leonardo/ChatGPT_1_Person_in_4_ages-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Leonardo/ChatGPT_1_Person_in_4_ages-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Leonardo/ChatGPT_1_Person_in_4_ages-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Leonardo/ChatGPT_1_Person_in_4_ages-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Leonardo/ChatGPT_1_Person_in_4_ages-Leonardo-5.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Midjourney/ChatGPT_1_Person_in_4_ages-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Midjourney/ChatGPT_1_Person_in_4_ages-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Midjourney/ChatGPT_1_Person_in_4_ages-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Midjourney/ChatGPT_1_Person_in_4_ages-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/chatgpt-1-person-in-4-ages/NanoBananaPro/ChatGPT_1_Person_in_4_ages-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Qwen",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Qwen/ChatGPT_1_Person_in_4_ages-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Reve/ChatGPT_1_Person_in_4_ages-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Reve/ChatGPT_1_Person_in_4_ages-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Reve/ChatGPT_1_Person_in_4_ages-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt1.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-1-person-in-4-ages/Reve/ChatGPT_1_Person_in_4_ages-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 24 images for chatgpt-1-person-in-4-ages');

  // ChatGPT 7 Slide
  const prompt2 = await prisma.prompt.create({
    data: {
      text: "Design a single presentation slide titled \"How This AI System Works\".\n\nLayout requirements:\n- A clear, readable main title at the top: \"How This AI System Works\"\n- A 3-step horizontal diagram in the center:\n  1) \"User Input\"\n  2) \"AI Processing\"\n  3) \"Smart Output\"\n- Each step represented by a simple icon and a short line of text beneath.\n- On the right side, a small box titled \"Key Benefits\" with 3 bullet points:\n  - \"Faster decisions\"\n  - \"Lower manual work\"\n  - \"Continuous learning\"\n\nVisual style:\n- Clean, modern slide design suitable for a tech conference.\n- Color palette: white background with accents in electric blue and charcoal grey.\n- Fonts should be simple and sans-serif.\n- Everything must be readable at typical presentation size.\n\nAspect ratio: 16:9.",
      slug: "chatgpt-7-slide",
      translations: {
        create: {
          language: 'en',
          text: "Design a single presentation slide titled \"How This AI System Works\".\n\nLayout requirements:\n- A clear, readable main title at the top: \"How This AI System Works\"\n- A 3-step horizontal diagram in the center:\n  1) \"User Input\"\n  2) \"AI Processing\"\n  3) \"Smart Output\"\n- Each step represented by a simple icon and a short line of text beneath.\n- On the right side, a small box titled \"Key Benefits\" with 3 bullet points:\n  - \"Faster decisions\"\n  - \"Lower manual work\"\n  - \"Continuous learning\"\n\nVisual style:\n- Clean, modern slide design suitable for a tech conference.\n- Color palette: white background with accents in electric blue and charcoal grey.\n- Fonts should be simple and sans-serif.\n- Everything must be readable at typical presentation size.\n\nAspect ratio: 16:9.",
        },
      },
    },
  });
  console.log('✓ Created prompt: chatgpt-7-slide');

  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "ByteDance",
      imagePath: "/images/chatgpt-7-slide/ByteDance/ChatGPT_7_Slide-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "ChatGPT",
      imagePath: "/images/chatgpt-7-slide/ChatGPT/ChatGPT_7_Slide-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-7-slide/Flux/ChatGPT_7_Slide-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-7-slide/Flux/ChatGPT_7_Slide-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-7-slide/Flux/ChatGPT_7_Slide-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-7-slide/Flux/ChatGPT_7_Slide-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Grok",
      imagePath: "/images/chatgpt-7-slide/Grok/ChatGPT_7_Slide-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Grok",
      imagePath: "/images/chatgpt-7-slide/Grok/ChatGPT_7_Slide-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Ideogram",
      imagePath: "/images/chatgpt-7-slide/Ideogram/ChatGPT_7_Slide-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Ideogram",
      imagePath: "/images/chatgpt-7-slide/Ideogram/ChatGPT_7_Slide-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Ideogram",
      imagePath: "/images/chatgpt-7-slide/Ideogram/ChatGPT_7_Slide-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Ideogram",
      imagePath: "/images/chatgpt-7-slide/Ideogram/ChatGPT_7_Slide-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-7-slide/Leonardo/ChatGPT_7_Slide-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-7-slide/Leonardo/ChatGPT_7_Slide-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-7-slide/Leonardo/ChatGPT_7_Slide-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-7-slide/Leonardo/ChatGPT_7_Slide-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-7-slide/Midjourney/ChatGPT_7_Slide-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-7-slide/Midjourney/ChatGPT_7_Slide-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-7-slide/Midjourney/ChatGPT_7_Slide-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-7-slide/Midjourney/ChatGPT_7_Slide-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/chatgpt-7-slide/NanoBananaPro/ChatGPT_7_Slide-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Qwen",
      imagePath: "/images/chatgpt-7-slide/Qwen/ChatGPT_7_Slide-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-7-slide/Reve/ChatGPT_7_Slide-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-7-slide/Reve/ChatGPT_7_Slide-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-7-slide/Reve/ChatGPT_7_Slide-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt2.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-7-slide/Reve/ChatGPT_7_Slide-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 26 images for chatgpt-7-slide');

  // ChatGPT Nudles Vertical Poster
  const prompt3 = await prisma.prompt.create({
    data: {
      text: "Design a vertical poster for a fictional late-night ramen bar called \n\"NEON NOODLES\".\n\nRequirements:\n- The main headline text, perfectly readable: \"NEON NOODLES\"\n- Subheadline text: \"Open 11 PM – 4 AM • Cyber City District 7\"\n- A smaller tagline near the bottom: \"Fuel for hackers, dreamers & night owls.\"\n\nVisual style:\n- Neon cyberpunk aesthetic with glowing signage and rain reflections.\n- A steaming bowl of ramen as the focal illustration, with chopsticks and glowing broth.\n- Color palette: deep purples, electric cyan, hot pink, accents of golden yellow.\n- Composition: enough negative space around the main title so it can be clearly read in a thumbnail.\n\nAspect ratio: 4:5, optimized for social media posts.",
      slug: "chatgpt-nudles-vertical-poster",
      translations: {
        create: {
          language: 'en',
          text: "Design a vertical poster for a fictional late-night ramen bar called \n\"NEON NOODLES\".\n\nRequirements:\n- The main headline text, perfectly readable: \"NEON NOODLES\"\n- Subheadline text: \"Open 11 PM – 4 AM • Cyber City District 7\"\n- A smaller tagline near the bottom: \"Fuel for hackers, dreamers & night owls.\"\n\nVisual style:\n- Neon cyberpunk aesthetic with glowing signage and rain reflections.\n- A steaming bowl of ramen as the focal illustration, with chopsticks and glowing broth.\n- Color palette: deep purples, electric cyan, hot pink, accents of golden yellow.\n- Composition: enough negative space around the main title so it can be clearly read in a thumbnail.\n\nAspect ratio: 4:5, optimized for social media posts.",
        },
      },
    },
  });
  console.log('✓ Created prompt: chatgpt-nudles-vertical-poster');

  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Flux/ChatGPT_Nudles_Vertical_Poster-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Flux/ChatGPT_Nudles_Vertical_Poster-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Flux/ChatGPT_Nudles_Vertical_Poster-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Flux",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Flux/ChatGPT_Nudles_Vertical_Poster-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Grok",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Grok/ChatGPT_Nudles_Vertical_Poster-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Grok",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Grok/ChatGPT_Nudles_Vertical_Poster-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Ideogram",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Ideogram/ChatGPT_Nudles_Vertical_Poster-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Ideogram",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Ideogram/ChatGPT_Nudles_Vertical_Poster-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Ideogram",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Ideogram/ChatGPT_Nudles_Vertical_Poster-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Ideogram",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Ideogram/ChatGPT_Nudles_Vertical_Poster-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Leonardo/ChatGPT_Nudles_Vertical_Poster-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Leonardo/ChatGPT_Nudles_Vertical_Poster-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Leonardo/ChatGPT_Nudles_Vertical_Poster-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Leonardo",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Leonardo/ChatGPT_Nudles_Vertical_Poster-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Midjourney/ChatGPT_Nudles_Vertical_Poster-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Midjourney/ChatGPT_Nudles_Vertical_Poster-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Midjourney/ChatGPT_Nudles_Vertical_Poster-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Midjourney",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Midjourney/ChatGPT_Nudles_Vertical_Poster-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Qwen",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Qwen/ChatGPT_Nudles_Vertical_Poster-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Reve/ChatGPT_Nudles_Vertical_Poster-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Reve/ChatGPT_Nudles_Vertical_Poster-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Reve/ChatGPT_Nudles_Vertical_Poster-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt3.id,
      modelName: "Reve",
      imagePath: "/images/chatgpt-nudles-vertical-poster/Reve/ChatGPT_Nudles_Vertical_Poster-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 23 images for chatgpt-nudles-vertical-poster');

  // Claude 1.1 The AI Action Figure
  const prompt4 = await prisma.prompt.create({
    data: {
      text: "Create a hyper-realistic action figure in original packaging. The figure is a 46-year-old tech executive with short dark hair, wearing a navy blue suit and holding a tiny laptop. The packaging says \"THE CTO\" at the top in bold metallic letters, with a tagline \"Comes with: Coffee Cup, Server Rack, Burnout Expression.\" The packaging should look like an authentic toy from the 80s with slight wear. Include a plastic window showing the figure, cardboard backing with fake \"Ages 30+\" warning, and a barcode at the bottom.",
      slug: "claude-11-the-ai-action-figure",
      translations: {
        create: {
          language: 'en',
          text: "Create a hyper-realistic action figure in original packaging. The figure is a 46-year-old tech executive with short dark hair, wearing a navy blue suit and holding a tiny laptop. The packaging says \"THE CTO\" at the top in bold metallic letters, with a tagline \"Comes with: Coffee Cup, Server Rack, Burnout Expression.\" The packaging should look like an authentic toy from the 80s with slight wear. Include a plastic window showing the figure, cardboard backing with fake \"Ages 30+\" warning, and a barcode at the bottom.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-11-the-ai-action-figure');

  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-11-the-ai-action-figure/ByteDance/Claude_1.1_The_AI_Action_Figure-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-11-the-ai-action-figure/ByteDance/Claude_1.1_The_AI_Action_Figure-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-11-the-ai-action-figure/ByteDance/Claude_1.1_The_AI_Action_Figure-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-11-the-ai-action-figure/ByteDance/Claude_1.1_The_AI_Action_Figure-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-11-the-ai-action-figure/ByteDance/Claude_1.1_The_AI_Action_Figure-ByteDance-5.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-11-the-ai-action-figure/ByteDance/Claude_1.1_The_AI_Action_Figure-ByteDance-6.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-11-the-ai-action-figure/ByteDance/Claude_1.1_The_AI_Action_Figure-ByteDance-7.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-11-the-ai-action-figure/ByteDance/Claude_1.1_The_AI_Action_Figure-ByteDance-8.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-11-the-ai-action-figure/ChatGPT/Claude_1.1_The_AI_Action_Figure-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Flux",
      imagePath: "/images/claude-11-the-ai-action-figure/Flux/Claude_1.1_The_AI_Action_Figure-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Flux",
      imagePath: "/images/claude-11-the-ai-action-figure/Flux/Claude_1.1_The_AI_Action_Figure-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Flux",
      imagePath: "/images/claude-11-the-ai-action-figure/Flux/Claude_1.1_The_AI_Action_Figure-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Flux",
      imagePath: "/images/claude-11-the-ai-action-figure/Flux/Claude_1.1_The_AI_Action_Figure-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Flux",
      imagePath: "/images/claude-11-the-ai-action-figure/Flux/Claude_1.1_The_AI_Action_Figure-Flux-5.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Flux",
      imagePath: "/images/claude-11-the-ai-action-figure/Flux/Claude_1.1_The_AI_Action_Figure-Flux-6.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Flux",
      imagePath: "/images/claude-11-the-ai-action-figure/Flux/Claude_1.1_The_AI_Action_Figure-Flux-7.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Flux",
      imagePath: "/images/claude-11-the-ai-action-figure/Flux/Claude_1.1_The_AI_Action_Figure-Flux-8.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Grok",
      imagePath: "/images/claude-11-the-ai-action-figure/Grok/Claude_1.1_The_AI_Action_Figure-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Grok",
      imagePath: "/images/claude-11-the-ai-action-figure/Grok/Claude_1.1_The_AI_Action_Figure-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-11-the-ai-action-figure/Ideogram/Claude_1.1_The_AI_Action_Figure-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-11-the-ai-action-figure/Ideogram/Claude_1.1_The_AI_Action_Figure-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-11-the-ai-action-figure/Ideogram/Claude_1.1_The_AI_Action_Figure-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-11-the-ai-action-figure/Ideogram/Claude_1.1_The_AI_Action_Figure-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-11-the-ai-action-figure/Ideogram/Claude_1.1_The_AI_Action_Figure-Ideogram-5.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-11-the-ai-action-figure/Ideogram/Claude_1.1_The_AI_Action_Figure-Ideogram-6.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-11-the-ai-action-figure/Ideogram/Claude_1.1_The_AI_Action_Figure-Ideogram-7.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-11-the-ai-action-figure/Ideogram/Claude_1.1_The_AI_Action_Figure-Ideogram-8.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-11-the-ai-action-figure/Leonardo/Claude_1.1_The_AI_Action_Figure-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-11-the-ai-action-figure/Leonardo/Claude_1.1_The_AI_Action_Figure-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-11-the-ai-action-figure/Leonardo/Claude_1.1_The_AI_Action_Figure-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-11-the-ai-action-figure/Leonardo/Claude_1.1_The_AI_Action_Figure-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-11-the-ai-action-figure/Leonardo/Claude_1.1_The_AI_Action_Figure-Leonardo-5.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-11-the-ai-action-figure/Leonardo/Claude_1.1_The_AI_Action_Figure-Leonardo-6.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-11-the-ai-action-figure/Leonardo/Claude_1.1_The_AI_Action_Figure-Leonardo-7.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-11-the-ai-action-figure/Leonardo/Claude_1.1_The_AI_Action_Figure-Leonardo-8.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-5.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-6.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-7.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-8.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-9.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-10.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-11.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-11-the-ai-action-figure/Midjourney/Claude_1.1_The_AI_Action_Figure-Midjourney-12.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-11-the-ai-action-figure/NanoBananaPro/Claude_1.1_The_AI_Action_Figure-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Qwen",
      imagePath: "/images/claude-11-the-ai-action-figure/Qwen/Claude_1.1_The_AI_Action_Figure-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Reve",
      imagePath: "/images/claude-11-the-ai-action-figure/Reve/Claude_1.1_The_AI_Action_Figure-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Reve",
      imagePath: "/images/claude-11-the-ai-action-figure/Reve/Claude_1.1_The_AI_Action_Figure-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Reve",
      imagePath: "/images/claude-11-the-ai-action-figure/Reve/Claude_1.1_The_AI_Action_Figure-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Reve",
      imagePath: "/images/claude-11-the-ai-action-figure/Reve/Claude_1.1_The_AI_Action_Figure-Reve-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Reve",
      imagePath: "/images/claude-11-the-ai-action-figure/Reve/Claude_1.1_The_AI_Action_Figure-Reve-5.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Reve",
      imagePath: "/images/claude-11-the-ai-action-figure/Reve/Claude_1.1_The_AI_Action_Figure-Reve-6.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Reve",
      imagePath: "/images/claude-11-the-ai-action-figure/Reve/Claude_1.1_The_AI_Action_Figure-Reve-7.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt4.id,
      modelName: "Reve",
      imagePath: "/images/claude-11-the-ai-action-figure/Reve/Claude_1.1_The_AI_Action_Figure-Reve-8.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 57 images for claude-11-the-ai-action-figure');

  // Claude 1.2 Familly Gibli
  const prompt5 = await prisma.prompt.create({
    data: {
      text: "Transform this scene into a Studio Ghibli animated masterpiece: A family of four (two adults, two children) having a picnic in a sunlit meadow. The father has a beard and glasses, the mother has long dark hair, the children are around 5 and 10 years old. Capture the whimsical Ghibli style with soft watercolor skies, detailed grass textures, gentle wind movement in hair and clothes, and the characteristic warm, nostalgic lighting of films like \"My Neighbor Totoro.\" Add subtle magical elements — perhaps Totoro-like creatures peeking from behind distant trees, dust motes floating in sunbeams, and impossibly fluffy clouds.",
      slug: "claude-12-familly-gibli",
      translations: {
        create: {
          language: 'en',
          text: "Transform this scene into a Studio Ghibli animated masterpiece: A family of four (two adults, two children) having a picnic in a sunlit meadow. The father has a beard and glasses, the mother has long dark hair, the children are around 5 and 10 years old. Capture the whimsical Ghibli style with soft watercolor skies, detailed grass textures, gentle wind movement in hair and clothes, and the characteristic warm, nostalgic lighting of films like \"My Neighbor Totoro.\" Add subtle magical elements — perhaps Totoro-like creatures peeking from behind distant trees, dust motes floating in sunbeams, and impossibly fluffy clouds.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-12-familly-gibli');

  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-12-familly-gibli/ByteDance/Claude_1.2_Familly_Gibli-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-12-familly-gibli/ByteDance/Claude_1.2_Familly_Gibli-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-12-familly-gibli/ByteDance/Claude_1.2_Familly_Gibli-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-12-familly-gibli/ByteDance/Claude_1.2_Familly_Gibli-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-12-familly-gibli/ChatGPT/Claude_1.2_Familly_Gibli-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Flux",
      imagePath: "/images/claude-12-familly-gibli/Flux/Claude_1.2_Familly_Gibli-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Flux",
      imagePath: "/images/claude-12-familly-gibli/Flux/Claude_1.2_Familly_Gibli-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Flux",
      imagePath: "/images/claude-12-familly-gibli/Flux/Claude_1.2_Familly_Gibli-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Flux",
      imagePath: "/images/claude-12-familly-gibli/Flux/Claude_1.2_Familly_Gibli-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-12-familly-gibli/Ideogram/Claude_1.2_Familly_Gibli-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-12-familly-gibli/Ideogram/Claude_1.2_Familly_Gibli-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-12-familly-gibli/Ideogram/Claude_1.2_Familly_Gibli-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-12-familly-gibli/Ideogram/Claude_1.2_Familly_Gibli-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-12-familly-gibli/Leonardo/Claude_1.2_Familly_Gibli-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-12-familly-gibli/Leonardo/Claude_1.2_Familly_Gibli-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-12-familly-gibli/Leonardo/Claude_1.2_Familly_Gibli-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-12-familly-gibli/Leonardo/Claude_1.2_Familly_Gibli-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-12-familly-gibli/Midjourney/Claude_1.2_Familly_Gibli-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-12-familly-gibli/Midjourney/Claude_1.2_Familly_Gibli-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-12-familly-gibli/Midjourney/Claude_1.2_Familly_Gibli-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-12-familly-gibli/Midjourney/Claude_1.2_Familly_Gibli-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Qwen",
      imagePath: "/images/claude-12-familly-gibli/Qwen/Claude_1.2_Familly_Gibli-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Reve",
      imagePath: "/images/claude-12-familly-gibli/Reve/Claude_1.2_Familly_Gibli-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Reve",
      imagePath: "/images/claude-12-familly-gibli/Reve/Claude_1.2_Familly_Gibli-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Reve",
      imagePath: "/images/claude-12-familly-gibli/Reve/Claude_1.2_Familly_Gibli-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt5.id,
      modelName: "Reve",
      imagePath: "/images/claude-12-familly-gibli/Reve/Claude_1.2_Familly_Gibli-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 26 images for claude-12-familly-gibli');

  // Claude 1.3 Retro Portrait
  const prompt6 = await prisma.prompt.create({
    data: {
      text: "Create a nostalgic 1990s mall studio portrait. Subject: A confident professional in their 40s with a slight smile. Background: The classic laser gradient background in purple, blue, and pink. Lighting: Soft, diffused studio lighting with a slight halo effect. Add lens flare, the characteristic soft focus of the era, and position the subject at a 3/4 angle. The overall aesthetic should scream \"Sears Portrait Studio, 1992\" with slight color shifting and that warm film grain quality.",
      slug: "claude-13-retro-portrait",
      translations: {
        create: {
          language: 'en',
          text: "Create a nostalgic 1990s mall studio portrait. Subject: A confident professional in their 40s with a slight smile. Background: The classic laser gradient background in purple, blue, and pink. Lighting: Soft, diffused studio lighting with a slight halo effect. Add lens flare, the characteristic soft focus of the era, and position the subject at a 3/4 angle. The overall aesthetic should scream \"Sears Portrait Studio, 1992\" with slight color shifting and that warm film grain quality.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-13-retro-portrait');

  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-13-retro-portrait/ByteDance/Claude_1.3_Retro_Portrait-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-13-retro-portrait/ByteDance/Claude_1.3_Retro_Portrait-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-13-retro-portrait/ByteDance/Claude_1.3_Retro_Portrait-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-13-retro-portrait/ByteDance/Claude_1.3_Retro_Portrait-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-13-retro-portrait/ChatGPT/Claude_1.3_Retro_Portrait-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-13-retro-portrait/ChatGPT/Claude_1.3_Retro_Portrait-ChatGPT-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Flux",
      imagePath: "/images/claude-13-retro-portrait/Flux/Claude_1.3_Retro_Portrait-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Flux",
      imagePath: "/images/claude-13-retro-portrait/Flux/Claude_1.3_Retro_Portrait-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Flux",
      imagePath: "/images/claude-13-retro-portrait/Flux/Claude_1.3_Retro_Portrait-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Flux",
      imagePath: "/images/claude-13-retro-portrait/Flux/Claude_1.3_Retro_Portrait-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-13-retro-portrait/Ideogram/Claude_1.3_Retro_Portrait-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-13-retro-portrait/Ideogram/Claude_1.3_Retro_Portrait-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-13-retro-portrait/Ideogram/Claude_1.3_Retro_Portrait-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-13-retro-portrait/Ideogram/Claude_1.3_Retro_Portrait-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-13-retro-portrait/Leonardo/Claude_1.3_Retro_Portrait-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-13-retro-portrait/Leonardo/Claude_1.3_Retro_Portrait-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-13-retro-portrait/Leonardo/Claude_1.3_Retro_Portrait-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-13-retro-portrait/Leonardo/Claude_1.3_Retro_Portrait-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-13-retro-portrait/Midjourney/Claude_1.3_Retro_Portrait-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-13-retro-portrait/Midjourney/Claude_1.3_Retro_Portrait-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-13-retro-portrait/Midjourney/Claude_1.3_Retro_Portrait-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-13-retro-portrait/Midjourney/Claude_1.3_Retro_Portrait-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-13-retro-portrait/NanoBananaPro/Claude_1.3_Retro_Portrait-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-13-retro-portrait/NanoBananaPro/Claude_1.3_Retro_Portrait-NanoBananaPro-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Qwen",
      imagePath: "/images/claude-13-retro-portrait/Qwen/Claude_1.3_Retro_Portrait-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Reve",
      imagePath: "/images/claude-13-retro-portrait/Reve/Claude_1.3_Retro_Portrait-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Reve",
      imagePath: "/images/claude-13-retro-portrait/Reve/Claude_1.3_Retro_Portrait-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Reve",
      imagePath: "/images/claude-13-retro-portrait/Reve/Claude_1.3_Retro_Portrait-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt6.id,
      modelName: "Reve",
      imagePath: "/images/claude-13-retro-portrait/Reve/Claude_1.3_Retro_Portrait-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 29 images for claude-13-retro-portrait');

  // Claude 2 Asian Woman Character
  const prompt7 = await prisma.prompt.create({
    data: {
      text: "Character design: \"Maya\" — A 35-year-old East Asian woman with shoulder-length black hair with subtle purple highlights, warm brown eyes, small nose piercing, athletic build. She has a distinctive small scar above her left eyebrow and always wears silver hoop earrings. Her style is modern urban professional.",
      slug: "claude-2-asian-woman-character",
      translations: {
        create: {
          language: 'en',
          text: "Character design: \"Maya\" — A 35-year-old East Asian woman with shoulder-length black hair with subtle purple highlights, warm brown eyes, small nose piercing, athletic build. She has a distinctive small scar above her left eyebrow and always wears silver hoop earrings. Her style is modern urban professional.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-2-asian-woman-character');

  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-2-asian-woman-character/ByteDance/Claude_2_Asian_Woman_Character-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-2-asian-woman-character/ByteDance/Claude_2_Asian_Woman_Character-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-2-asian-woman-character/ByteDance/Claude_2_Asian_Woman_Character-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-2-asian-woman-character/ByteDance/Claude_2_Asian_Woman_Character-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-2-asian-woman-character/ChatGPT/Claude_2_Asian_Woman_Character-ChatGPT-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-2-asian-woman-character/ChatGPT/Claude_2_Asian_Woman_Character-ChatGPT-2.webp",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-2-asian-woman-character/ChatGPT/Claude_2_Asian_Woman_Character-ChatGPT-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-2-asian-woman-character/ChatGPT/Claude_2_Asian_Woman_Character-ChatGPT-4.webp",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Flux",
      imagePath: "/images/claude-2-asian-woman-character/Flux/Claude_2_Asian_Woman_Character-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Flux",
      imagePath: "/images/claude-2-asian-woman-character/Flux/Claude_2_Asian_Woman_Character-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Flux",
      imagePath: "/images/claude-2-asian-woman-character/Flux/Claude_2_Asian_Woman_Character-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Flux",
      imagePath: "/images/claude-2-asian-woman-character/Flux/Claude_2_Asian_Woman_Character-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Grok",
      imagePath: "/images/claude-2-asian-woman-character/Grok/Claude_2_Asian_Woman_Character-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Grok",
      imagePath: "/images/claude-2-asian-woman-character/Grok/Claude_2_Asian_Woman_Character-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-2-asian-woman-character/Ideogram/Claude_2_Asian_Woman_Character-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-2-asian-woman-character/Ideogram/Claude_2_Asian_Woman_Character-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-2-asian-woman-character/Ideogram/Claude_2_Asian_Woman_Character-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-2-asian-woman-character/Ideogram/Claude_2_Asian_Woman_Character-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-2-asian-woman-character/Leonardo/Claude_2_Asian_Woman_Character-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-2-asian-woman-character/Leonardo/Claude_2_Asian_Woman_Character-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-2-asian-woman-character/Leonardo/Claude_2_Asian_Woman_Character-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-2-asian-woman-character/Leonardo/Claude_2_Asian_Woman_Character-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-2-asian-woman-character/Midjourney/Claude_2_Asian_Woman_Character-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-2-asian-woman-character/Midjourney/Claude_2_Asian_Woman_Character-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-2-asian-woman-character/Midjourney/Claude_2_Asian_Woman_Character-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-2-asian-woman-character/Midjourney/Claude_2_Asian_Woman_Character-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-2-asian-woman-character/NanoBananaPro/Claude_2_Asian_Woman_Character-NanoBananaPro-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Qwen",
      imagePath: "/images/claude-2-asian-woman-character/Qwen/Claude_2_Asian_Woman_Character-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Reve",
      imagePath: "/images/claude-2-asian-woman-character/Reve/Claude_2_Asian_Woman_Character-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Reve",
      imagePath: "/images/claude-2-asian-woman-character/Reve/Claude_2_Asian_Woman_Character-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Reve",
      imagePath: "/images/claude-2-asian-woman-character/Reve/Claude_2_Asian_Woman_Character-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt7.id,
      modelName: "Reve",
      imagePath: "/images/claude-2-asian-woman-character/Reve/Claude_2_Asian_Woman_Character-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 32 images for claude-2-asian-woman-character');

  // Claude 2.1 Maya Coorporate
  const prompt8 = await prisma.prompt.create({
    data: {
      text: "Maya in a modern glass-walled office, giving a presentation to colleagues. She's wearing a tailored charcoal blazer over a white silk blouse. Confident posture, gesturing toward a holographic display. Morning light streaming through floor-to-ceiling windows. Photorealistic style.",
      slug: "claude-21-maya-coorporate",
      translations: {
        create: {
          language: 'en',
          text: "Maya in a modern glass-walled office, giving a presentation to colleagues. She's wearing a tailored charcoal blazer over a white silk blouse. Confident posture, gesturing toward a holographic display. Morning light streaming through floor-to-ceiling windows. Photorealistic style.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-21-maya-coorporate');

  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-21-maya-coorporate/ByteDance/Claude_2.1_Maya_Coorporate-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-21-maya-coorporate/ByteDance/Claude_2.1_Maya_Coorporate-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-21-maya-coorporate/ByteDance/Claude_2.1_Maya_Coorporate-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-21-maya-coorporate/ByteDance/Claude_2.1_Maya_Coorporate-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-21-maya-coorporate/ChatGPT/Claude_2.1_Maya_Coorporate-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Flux",
      imagePath: "/images/claude-21-maya-coorporate/Flux/Claude_2.1_Maya_Coorporate-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Flux",
      imagePath: "/images/claude-21-maya-coorporate/Flux/Claude_2.1_Maya_Coorporate-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Flux",
      imagePath: "/images/claude-21-maya-coorporate/Flux/Claude_2.1_Maya_Coorporate-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Flux",
      imagePath: "/images/claude-21-maya-coorporate/Flux/Claude_2.1_Maya_Coorporate-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Grok",
      imagePath: "/images/claude-21-maya-coorporate/Grok/Claude_2.1_Maya_Coorporate-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Grok",
      imagePath: "/images/claude-21-maya-coorporate/Grok/Claude_2.1_Maya_Coorporate-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-21-maya-coorporate/Ideogram/Claude_2.1_Maya_Coorporate-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-21-maya-coorporate/Ideogram/Claude_2.1_Maya_Coorporate-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-21-maya-coorporate/Ideogram/Claude_2.1_Maya_Coorporate-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-21-maya-coorporate/Ideogram/Claude_2.1_Maya_Coorporate-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-21-maya-coorporate/Leonardo/Claude_2.1_Maya_Coorporate-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-21-maya-coorporate/Leonardo/Claude_2.1_Maya_Coorporate-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-21-maya-coorporate/Leonardo/Claude_2.1_Maya_Coorporate-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-21-maya-coorporate/Leonardo/Claude_2.1_Maya_Coorporate-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-21-maya-coorporate/Leonardo/Claude_2.1_Maya_Coorporate-Leonardo-5.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-21-maya-coorporate/Midjourney/Claude_2.1_Maya_Coorporate-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-21-maya-coorporate/Midjourney/Claude_2.1_Maya_Coorporate-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-21-maya-coorporate/Midjourney/Claude_2.1_Maya_Coorporate-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-21-maya-coorporate/Midjourney/Claude_2.1_Maya_Coorporate-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-21-maya-coorporate/NanoBananaPro/Claude_2.1_Maya_Coorporate-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Qwen",
      imagePath: "/images/claude-21-maya-coorporate/Qwen/Claude_2.1_Maya_Coorporate-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Reve",
      imagePath: "/images/claude-21-maya-coorporate/Reve/Claude_2.1_Maya_Coorporate-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Reve",
      imagePath: "/images/claude-21-maya-coorporate/Reve/Claude_2.1_Maya_Coorporate-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Reve",
      imagePath: "/images/claude-21-maya-coorporate/Reve/Claude_2.1_Maya_Coorporate-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt8.id,
      modelName: "Reve",
      imagePath: "/images/claude-21-maya-coorporate/Reve/Claude_2.1_Maya_Coorporate-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 30 images for claude-21-maya-coorporate');

  // Claude 2.2 Maya Casual
  const prompt9 = await prisma.prompt.create({
    data: {
      text: "Maya at a farmers market on a sunny Saturday morning, examining fresh produce. She's wearing a vintage band t-shirt, high-waisted jeans, and white sneakers. Her hair is in a messy ponytail. She's laughing at something off-camera. Natural, candid photography style.",
      slug: "claude-22-maya-casual",
      translations: {
        create: {
          language: 'en',
          text: "Maya at a farmers market on a sunny Saturday morning, examining fresh produce. She's wearing a vintage band t-shirt, high-waisted jeans, and white sneakers. Her hair is in a messy ponytail. She's laughing at something off-camera. Natural, candid photography style.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-22-maya-casual');

  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-22-maya-casual/ByteDance/Claude_2.2_Maya_Casual-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-22-maya-casual/ByteDance/Claude_2.2_Maya_Casual-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-22-maya-casual/ByteDance/Claude_2.2_Maya_Casual-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-22-maya-casual/ByteDance/Claude_2.2_Maya_Casual-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-22-maya-casual/ChatGPT/Claude_2.2_Maya_Casual-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Flux",
      imagePath: "/images/claude-22-maya-casual/Flux/Claude_2.2_Maya_Casual-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Flux",
      imagePath: "/images/claude-22-maya-casual/Flux/Claude_2.2_Maya_Casual-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Flux",
      imagePath: "/images/claude-22-maya-casual/Flux/Claude_2.2_Maya_Casual-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Flux",
      imagePath: "/images/claude-22-maya-casual/Flux/Claude_2.2_Maya_Casual-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Grok",
      imagePath: "/images/claude-22-maya-casual/Grok/Claude_2.2_Maya_Casual-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Grok",
      imagePath: "/images/claude-22-maya-casual/Grok/Claude_2.2_Maya_Casual-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-22-maya-casual/Ideogram/Claude_2.2_Maya_Casual-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-22-maya-casual/Ideogram/Claude_2.2_Maya_Casual-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-22-maya-casual/Ideogram/Claude_2.2_Maya_Casual-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-22-maya-casual/Ideogram/Claude_2.2_Maya_Casual-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-22-maya-casual/Leonardo/Claude_2.2_Maya_Casual-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-22-maya-casual/Leonardo/Claude_2.2_Maya_Casual-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-22-maya-casual/Leonardo/Claude_2.2_Maya_Casual-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-22-maya-casual/Leonardo/Claude_2.2_Maya_Casual-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-22-maya-casual/Midjourney/Claude_2.2_Maya_Casual-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-22-maya-casual/Midjourney/Claude_2.2_Maya_Casual-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-22-maya-casual/Midjourney/Claude_2.2_Maya_Casual-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-22-maya-casual/Midjourney/Claude_2.2_Maya_Casual-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-22-maya-casual/NanoBananaPro/Claude_2.2_Maya_Casual-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Qwen",
      imagePath: "/images/claude-22-maya-casual/Qwen/Claude_2.2_Maya_Casual-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Reve",
      imagePath: "/images/claude-22-maya-casual/Reve/Claude_2.2_Maya_Casual-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Reve",
      imagePath: "/images/claude-22-maya-casual/Reve/Claude_2.2_Maya_Casual-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Reve",
      imagePath: "/images/claude-22-maya-casual/Reve/Claude_2.2_Maya_Casual-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt9.id,
      modelName: "Reve",
      imagePath: "/images/claude-22-maya-casual/Reve/Claude_2.2_Maya_Casual-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 29 images for claude-22-maya-casual');

  // Claude 2.3 Maya Formal Event
  const prompt10 = await prisma.prompt.create({
    data: {
      text: "Maya at a glamorous gala event, wearing an elegant emerald green evening gown. Her hair is styled in an updo with loose strands framing her face. She's holding a champagne glass and engaged in conversation. Dramatic evening lighting with bokeh lights in the background.",
      slug: "claude-23-maya-formal-event",
      translations: {
        create: {
          language: 'en',
          text: "Maya at a glamorous gala event, wearing an elegant emerald green evening gown. Her hair is styled in an updo with loose strands framing her face. She's holding a champagne glass and engaged in conversation. Dramatic evening lighting with bokeh lights in the background.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-23-maya-formal-event');

  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-23-maya-formal-event/ByteDance/Claude_2.3_Maya_Formal_Event-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-23-maya-formal-event/ByteDance/Claude_2.3_Maya_Formal_Event-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-23-maya-formal-event/ByteDance/Claude_2.3_Maya_Formal_Event-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-23-maya-formal-event/ByteDance/Claude_2.3_Maya_Formal_Event-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-23-maya-formal-event/ChatGPT/Claude_2.3_Maya_Formal_Event-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Flux",
      imagePath: "/images/claude-23-maya-formal-event/Flux/Claude_2.3_Maya_Formal_Event-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Flux",
      imagePath: "/images/claude-23-maya-formal-event/Flux/Claude_2.3_Maya_Formal_Event-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Flux",
      imagePath: "/images/claude-23-maya-formal-event/Flux/Claude_2.3_Maya_Formal_Event-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Flux",
      imagePath: "/images/claude-23-maya-formal-event/Flux/Claude_2.3_Maya_Formal_Event-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Grok",
      imagePath: "/images/claude-23-maya-formal-event/Grok/Claude_2.3_Maya_Formal_Event-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Grok",
      imagePath: "/images/claude-23-maya-formal-event/Grok/Claude_2.3_Maya_Formal_Event-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-23-maya-formal-event/Ideogram/Claude_2.3_Maya_Formal_Event-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-23-maya-formal-event/Ideogram/Claude_2.3_Maya_Formal_Event-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-23-maya-formal-event/Ideogram/Claude_2.3_Maya_Formal_Event-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-23-maya-formal-event/Ideogram/Claude_2.3_Maya_Formal_Event-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-23-maya-formal-event/Leonardo/Claude_2.3_Maya_Formal_Event-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-23-maya-formal-event/Leonardo/Claude_2.3_Maya_Formal_Event-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-23-maya-formal-event/Leonardo/Claude_2.3_Maya_Formal_Event-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-23-maya-formal-event/Leonardo/Claude_2.3_Maya_Formal_Event-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-23-maya-formal-event/Midjourney/Claude_2.3_Maya_Formal_Event-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-23-maya-formal-event/Midjourney/Claude_2.3_Maya_Formal_Event-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-23-maya-formal-event/Midjourney/Claude_2.3_Maya_Formal_Event-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-23-maya-formal-event/Midjourney/Claude_2.3_Maya_Formal_Event-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-23-maya-formal-event/NanoBananaPro/Claude_2.3_Maya_Formal_Event-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Qwen",
      imagePath: "/images/claude-23-maya-formal-event/Qwen/Claude_2.3_Maya_Formal_Event-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Reve",
      imagePath: "/images/claude-23-maya-formal-event/Reve/Claude_2.3_Maya_Formal_Event-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Reve",
      imagePath: "/images/claude-23-maya-formal-event/Reve/Claude_2.3_Maya_Formal_Event-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Reve",
      imagePath: "/images/claude-23-maya-formal-event/Reve/Claude_2.3_Maya_Formal_Event-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt10.id,
      modelName: "Reve",
      imagePath: "/images/claude-23-maya-formal-event/Reve/Claude_2.3_Maya_Formal_Event-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 29 images for claude-23-maya-formal-event');

  // Claude 2.4 Maya Fitness
  const prompt11 = await prisma.prompt.create({
    data: {
      text: "Maya mid-stride during an early morning run in an urban park. She's wearing black running leggings and a bright coral sports bra. Her hair is in a practical high ponytail. Determined expression, slight sheen of sweat. Dynamic action shot with motion blur in background.",
      slug: "claude-24-maya-fitness",
      translations: {
        create: {
          language: 'en',
          text: "Maya mid-stride during an early morning run in an urban park. She's wearing black running leggings and a bright coral sports bra. Her hair is in a practical high ponytail. Determined expression, slight sheen of sweat. Dynamic action shot with motion blur in background.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-24-maya-fitness');

  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-24-maya-fitness/ByteDance/Claude_2.4_Maya_Fitness-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-24-maya-fitness/ByteDance/Claude_2.4_Maya_Fitness-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-24-maya-fitness/ByteDance/Claude_2.4_Maya_Fitness-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-24-maya-fitness/ByteDance/Claude_2.4_Maya_Fitness-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-24-maya-fitness/ChatGPT/Claude_2.4_Maya_Fitness-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Flux",
      imagePath: "/images/claude-24-maya-fitness/Flux/Claude_2.4_Maya_Fitness-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Flux",
      imagePath: "/images/claude-24-maya-fitness/Flux/Claude_2.4_Maya_Fitness-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Flux",
      imagePath: "/images/claude-24-maya-fitness/Flux/Claude_2.4_Maya_Fitness-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Flux",
      imagePath: "/images/claude-24-maya-fitness/Flux/Claude_2.4_Maya_Fitness-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Flux",
      imagePath: "/images/claude-24-maya-fitness/Flux/Claude_2.4_Maya_Fitness-Flux-5.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Grok",
      imagePath: "/images/claude-24-maya-fitness/Grok/Claude_2.4_Maya_Fitness-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Grok",
      imagePath: "/images/claude-24-maya-fitness/Grok/Claude_2.4_Maya_Fitness-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-24-maya-fitness/Ideogram/Claude_2.4_Maya_Fitness-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-24-maya-fitness/Ideogram/Claude_2.4_Maya_Fitness-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-24-maya-fitness/Ideogram/Claude_2.4_Maya_Fitness-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-24-maya-fitness/Ideogram/Claude_2.4_Maya_Fitness-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-24-maya-fitness/Leonardo/Claude_2.4_Maya_Fitness-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-24-maya-fitness/Leonardo/Claude_2.4_Maya_Fitness-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-24-maya-fitness/Leonardo/Claude_2.4_Maya_Fitness-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-24-maya-fitness/Leonardo/Claude_2.4_Maya_Fitness-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-24-maya-fitness/Midjourney/Claude_2.4_Maya_Fitness-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-24-maya-fitness/Midjourney/Claude_2.4_Maya_Fitness-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-24-maya-fitness/Midjourney/Claude_2.4_Maya_Fitness-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-24-maya-fitness/Midjourney/Claude_2.4_Maya_Fitness-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-24-maya-fitness/NanoBananaPro/Claude_2.4_Maya_Fitness-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Qwen",
      imagePath: "/images/claude-24-maya-fitness/Qwen/Claude_2.4_Maya_Fitness-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Reve",
      imagePath: "/images/claude-24-maya-fitness/Reve/Claude_2.4_Maya_Fitness-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Reve",
      imagePath: "/images/claude-24-maya-fitness/Reve/Claude_2.4_Maya_Fitness-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Reve",
      imagePath: "/images/claude-24-maya-fitness/Reve/Claude_2.4_Maya_Fitness-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt11.id,
      modelName: "Reve",
      imagePath: "/images/claude-24-maya-fitness/Reve/Claude_2.4_Maya_Fitness-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 30 images for claude-24-maya-fitness');

  // Claude 2.5 Maya Artistic
  const prompt12 = await prisma.prompt.create({
    data: {
      text: "Maya in her home art studio, focused on painting a large abstract canvas. She's wearing paint-splattered overalls over a cropped tank top. Her hair is clipped back messily. Natural north-facing window light. Visible paint on her hands and cheek. Intimate, documentary-style photograph.",
      slug: "claude-25-maya-artistic",
      translations: {
        create: {
          language: 'en',
          text: "Maya in her home art studio, focused on painting a large abstract canvas. She's wearing paint-splattered overalls over a cropped tank top. Her hair is clipped back messily. Natural north-facing window light. Visible paint on her hands and cheek. Intimate, documentary-style photograph.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-25-maya-artistic');

  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-25-maya-artistic/ByteDance/Claude_2.5_Maya_Artistic-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-25-maya-artistic/ByteDance/Claude_2.5_Maya_Artistic-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-25-maya-artistic/ByteDance/Claude_2.5_Maya_Artistic-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-25-maya-artistic/ChatGPT/Claude_2.5_Maya_Artistic-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Flux",
      imagePath: "/images/claude-25-maya-artistic/Flux/Claude_2.5_Maya_Artistic-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Flux",
      imagePath: "/images/claude-25-maya-artistic/Flux/Claude_2.5_Maya_Artistic-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Flux",
      imagePath: "/images/claude-25-maya-artistic/Flux/Claude_2.5_Maya_Artistic-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Flux",
      imagePath: "/images/claude-25-maya-artistic/Flux/Claude_2.5_Maya_Artistic-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Grok",
      imagePath: "/images/claude-25-maya-artistic/Grok/Claude_2.5_Maya_Artistic-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Grok",
      imagePath: "/images/claude-25-maya-artistic/Grok/Claude_2.5_Maya_Artistic-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-25-maya-artistic/Ideogram/Claude_2.5_Maya_Artistic-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-25-maya-artistic/Ideogram/Claude_2.5_Maya_Artistic-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-25-maya-artistic/Ideogram/Claude_2.5_Maya_Artistic-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-25-maya-artistic/Ideogram/Claude_2.5_Maya_Artistic-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-25-maya-artistic/Leonardo/Claude_2.5_Maya_Artistic-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-25-maya-artistic/Leonardo/Claude_2.5_Maya_Artistic-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-25-maya-artistic/Leonardo/Claude_2.5_Maya_Artistic-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-25-maya-artistic/Leonardo/Claude_2.5_Maya_Artistic-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-25-maya-artistic/Midjourney/Claude_2.5_Maya_Artistic-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-25-maya-artistic/Midjourney/Claude_2.5_Maya_Artistic-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-25-maya-artistic/Midjourney/Claude_2.5_Maya_Artistic-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-25-maya-artistic/Midjourney/Claude_2.5_Maya_Artistic-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-25-maya-artistic/NanoBananaPro/Claude_2.5_Maya_Artistic-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Qwen",
      imagePath: "/images/claude-25-maya-artistic/Qwen/Claude_2.5_Maya_Artistic-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Reve",
      imagePath: "/images/claude-25-maya-artistic/Reve/Claude_2.5_Maya_Artistic-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Reve",
      imagePath: "/images/claude-25-maya-artistic/Reve/Claude_2.5_Maya_Artistic-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Reve",
      imagePath: "/images/claude-25-maya-artistic/Reve/Claude_2.5_Maya_Artistic-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt12.id,
      modelName: "Reve",
      imagePath: "/images/claude-25-maya-artistic/Reve/Claude_2.5_Maya_Artistic-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 28 images for claude-25-maya-artistic');

  // Claude 3.1 Movie Poster
  const prompt13 = await prisma.prompt.create({
    data: {
      text: "Create a cinematic movie poster for a sci-fi thriller called \"NEURAL ECLIPSE.\" The title should be in large, chrome metallic 3D letters at the top of the image, glowing with cyan edges. Below the title: \"In 2087, consciousness became currency.\" The background shows a futuristic cityscape at night with a massive holographic brain floating above the skyline. At the bottom, include credits in small text: \"STARRING MAYA CHEN • DIRECTED BY ALEX RIVERA • A NEXUS FILMS PRODUCTION\" and a release date \"DECEMBER 2025\" in a distinctive font. Include a PG-13 rating logo in the bottom corner.",
      slug: "claude-31-movie-poster",
      translations: {
        create: {
          language: 'en',
          text: "Create a cinematic movie poster for a sci-fi thriller called \"NEURAL ECLIPSE.\" The title should be in large, chrome metallic 3D letters at the top of the image, glowing with cyan edges. Below the title: \"In 2087, consciousness became currency.\" The background shows a futuristic cityscape at night with a massive holographic brain floating above the skyline. At the bottom, include credits in small text: \"STARRING MAYA CHEN • DIRECTED BY ALEX RIVERA • A NEXUS FILMS PRODUCTION\" and a release date \"DECEMBER 2025\" in a distinctive font. Include a PG-13 rating logo in the bottom corner.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-31-movie-poster');

  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-31-movie-poster/ChatGPT/Claude_3.1_Movie_Poster-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Flux",
      imagePath: "/images/claude-31-movie-poster/Flux/Claude_3.1_Movie_Poster-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Flux",
      imagePath: "/images/claude-31-movie-poster/Flux/Claude_3.1_Movie_Poster-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Flux",
      imagePath: "/images/claude-31-movie-poster/Flux/Claude_3.1_Movie_Poster-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Flux",
      imagePath: "/images/claude-31-movie-poster/Flux/Claude_3.1_Movie_Poster-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Grok",
      imagePath: "/images/claude-31-movie-poster/Grok/Claude_3.1_Movie_Poster-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Grok",
      imagePath: "/images/claude-31-movie-poster/Grok/Claude_3.1_Movie_Poster-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-31-movie-poster/Ideogram/Claude_3.1_Movie_Poster-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-31-movie-poster/Ideogram/Claude_3.1_Movie_Poster-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-31-movie-poster/Ideogram/Claude_3.1_Movie_Poster-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-31-movie-poster/Ideogram/Claude_3.1_Movie_Poster-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-31-movie-poster/Leonardo/Claude_3.1_Movie_Poster-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-31-movie-poster/Leonardo/Claude_3.1_Movie_Poster-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-31-movie-poster/Leonardo/Claude_3.1_Movie_Poster-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-31-movie-poster/Leonardo/Claude_3.1_Movie_Poster-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-31-movie-poster/Midjourney/Claude_3.1_Movie_Poster-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-31-movie-poster/Midjourney/Claude_3.1_Movie_Poster-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-31-movie-poster/Midjourney/Claude_3.1_Movie_Poster-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-31-movie-poster/Midjourney/Claude_3.1_Movie_Poster-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-31-movie-poster/NanoBananaPro/Claude_3.1_Movie_Poster-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Qwen",
      imagePath: "/images/claude-31-movie-poster/Qwen/Claude_3.1_Movie_Poster-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Reve",
      imagePath: "/images/claude-31-movie-poster/Reve/Claude_3.1_Movie_Poster-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Reve",
      imagePath: "/images/claude-31-movie-poster/Reve/Claude_3.1_Movie_Poster-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Reve",
      imagePath: "/images/claude-31-movie-poster/Reve/Claude_3.1_Movie_Poster-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt13.id,
      modelName: "Reve",
      imagePath: "/images/claude-31-movie-poster/Reve/Claude_3.1_Movie_Poster-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 25 images for claude-31-movie-poster');

  // Claude 3.2 Product Packaging
  const prompt14 = await prisma.prompt.create({
    data: {
      text: "Design premium coffee packaging for a brand called \"MIDNIGHT ROAST\" with the tagline \"Awaken Your Darkness.\" The package should be a matte black bag with gold foil accents. Include the following text elements: Brand name \"MIDNIGHT ROAST\" in elegant serif typography, tagline below in smaller italic script, \"100% Arabica • Single Origin • Ethiopia\" in a horizontal band, \"NET WT. 12 OZ (340g)\" near the bottom, and a small \"USDA ORGANIC\" certification badge. The design should feel luxurious and artisanal with subtle embossed texture effects.",
      slug: "claude-32-product-packaging",
      translations: {
        create: {
          language: 'en',
          text: "Design premium coffee packaging for a brand called \"MIDNIGHT ROAST\" with the tagline \"Awaken Your Darkness.\" The package should be a matte black bag with gold foil accents. Include the following text elements: Brand name \"MIDNIGHT ROAST\" in elegant serif typography, tagline below in smaller italic script, \"100% Arabica • Single Origin • Ethiopia\" in a horizontal band, \"NET WT. 12 OZ (340g)\" near the bottom, and a small \"USDA ORGANIC\" certification badge. The design should feel luxurious and artisanal with subtle embossed texture effects.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-32-product-packaging');

  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-32-product-packaging/ByteDance/Claude_3.2_Product_Packaging-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-32-product-packaging/ByteDance/Claude_3.2_Product_Packaging-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-32-product-packaging/ChatGPT/Claude_3.2_Product_Packaging-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Flux",
      imagePath: "/images/claude-32-product-packaging/Flux/Claude_3.2_Product_Packaging-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Flux",
      imagePath: "/images/claude-32-product-packaging/Flux/Claude_3.2_Product_Packaging-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Grok",
      imagePath: "/images/claude-32-product-packaging/Grok/Claude_3.2_Product_Packaging-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Grok",
      imagePath: "/images/claude-32-product-packaging/Grok/Claude_3.2_Product_Packaging-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-32-product-packaging/Ideogram/Claude_3.2_Product_Packaging-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-32-product-packaging/Ideogram/Claude_3.2_Product_Packaging-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-32-product-packaging/Ideogram/Claude_3.2_Product_Packaging-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-32-product-packaging/Ideogram/Claude_3.2_Product_Packaging-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-32-product-packaging/Leonardo/Claude_3.2_Product_Packaging-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-32-product-packaging/Leonardo/Claude_3.2_Product_Packaging-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-32-product-packaging/Leonardo/Claude_3.2_Product_Packaging-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-32-product-packaging/Leonardo/Claude_3.2_Product_Packaging-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-32-product-packaging/Midjourney/Claude_3.2_Product_Packaging-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-32-product-packaging/Midjourney/Claude_3.2_Product_Packaging-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-32-product-packaging/Midjourney/Claude_3.2_Product_Packaging-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-32-product-packaging/Midjourney/Claude_3.2_Product_Packaging-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-32-product-packaging/NanoBananaPro/Claude_3.2_Product_Packaging-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Qwen",
      imagePath: "/images/claude-32-product-packaging/Qwen/Claude_3.2_Product_Packaging-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Reve",
      imagePath: "/images/claude-32-product-packaging/Reve/Claude_3.2_Product_Packaging-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Reve",
      imagePath: "/images/claude-32-product-packaging/Reve/Claude_3.2_Product_Packaging-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Reve",
      imagePath: "/images/claude-32-product-packaging/Reve/Claude_3.2_Product_Packaging-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt14.id,
      modelName: "Reve",
      imagePath: "/images/claude-32-product-packaging/Reve/Claude_3.2_Product_Packaging-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 25 images for claude-32-product-packaging');

  // Claude 3.3 Multilingual Challenge
  const prompt15 = await prisma.prompt.create({
    data: {
      text: "Create a travel poster for Tokyo that includes text in three languages. The main headline \"TOKYO\" should be in large, modern sans-serif at the top. Below it, include \"東京\" (Japanese characters) in traditional calligraphy style. Add a French tagline: \"Où tradition rencontre innovation\" in elegant script. The background should show Tokyo Tower at sunset with cherry blossoms in the foreground. At the bottom, include \"VISIT JAPAN 2025\" with a small Japanese flag icon.",
      slug: "claude-33-multilingual-challenge",
      translations: {
        create: {
          language: 'en',
          text: "Create a travel poster for Tokyo that includes text in three languages. The main headline \"TOKYO\" should be in large, modern sans-serif at the top. Below it, include \"東京\" (Japanese characters) in traditional calligraphy style. Add a French tagline: \"Où tradition rencontre innovation\" in elegant script. The background should show Tokyo Tower at sunset with cherry blossoms in the foreground. At the bottom, include \"VISIT JAPAN 2025\" with a small Japanese flag icon.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-33-multilingual-challenge');

  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-33-multilingual-challenge/ByteDance/Claude_3.3_Multilingual_Challenge-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-33-multilingual-challenge/ByteDance/Claude_3.3_Multilingual_Challenge-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-33-multilingual-challenge/ChatGPT/Claude_3.3_Multilingual_Challenge-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Flux",
      imagePath: "/images/claude-33-multilingual-challenge/Flux/Claude_3.3_Multilingual_Challenge-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Flux",
      imagePath: "/images/claude-33-multilingual-challenge/Flux/Claude_3.3_Multilingual_Challenge-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Flux",
      imagePath: "/images/claude-33-multilingual-challenge/Flux/Claude_3.3_Multilingual_Challenge-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Flux",
      imagePath: "/images/claude-33-multilingual-challenge/Flux/Claude_3.3_Multilingual_Challenge-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Grok",
      imagePath: "/images/claude-33-multilingual-challenge/Grok/Claude_3.3_Multilingual_Challenge-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Grok",
      imagePath: "/images/claude-33-multilingual-challenge/Grok/Claude_3.3_Multilingual_Challenge-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-33-multilingual-challenge/Ideogram/Claude_3.3_Multilingual_Challenge-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-33-multilingual-challenge/Ideogram/Claude_3.3_Multilingual_Challenge-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-33-multilingual-challenge/Ideogram/Claude_3.3_Multilingual_Challenge-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-33-multilingual-challenge/Ideogram/Claude_3.3_Multilingual_Challenge-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-33-multilingual-challenge/Leonardo/Claude_3.3_Multilingual_Challenge-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-33-multilingual-challenge/Leonardo/Claude_3.3_Multilingual_Challenge-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-33-multilingual-challenge/Leonardo/Claude_3.3_Multilingual_Challenge-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-33-multilingual-challenge/Leonardo/Claude_3.3_Multilingual_Challenge-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-33-multilingual-challenge/Midjourney/Claude_3.3_Multilingual_Challenge-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-33-multilingual-challenge/Midjourney/Claude_3.3_Multilingual_Challenge-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-33-multilingual-challenge/Midjourney/Claude_3.3_Multilingual_Challenge-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-33-multilingual-challenge/Midjourney/Claude_3.3_Multilingual_Challenge-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-33-multilingual-challenge/NanoBananaPro/Claude_3.3_Multilingual_Challenge-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Qwen",
      imagePath: "/images/claude-33-multilingual-challenge/Qwen/Claude_3.3_Multilingual_Challenge-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Reve",
      imagePath: "/images/claude-33-multilingual-challenge/Reve/Claude_3.3_Multilingual_Challenge-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Reve",
      imagePath: "/images/claude-33-multilingual-challenge/Reve/Claude_3.3_Multilingual_Challenge-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Reve",
      imagePath: "/images/claude-33-multilingual-challenge/Reve/Claude_3.3_Multilingual_Challenge-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt15.id,
      modelName: "Reve",
      imagePath: "/images/claude-33-multilingual-challenge/Reve/Claude_3.3_Multilingual_Challenge-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 27 images for claude-33-multilingual-challenge');

  // Claude 4 Edit Modern Living Room
  const prompt16 = await prisma.prompt.create({
    data: {
      text: "A photorealistic modern living room with a gray sectional sofa, wooden coffee table, large monstera plant in the corner, abstract art on the wall, and floor-to-ceiling windows showing a city skyline at golden hour. The room has warm, inviting lighting and minimalist Scandinavian design aesthetics.",
      slug: "claude-4-edit-modern-living-room",
      translations: {
        create: {
          language: 'en',
          text: "A photorealistic modern living room with a gray sectional sofa, wooden coffee table, large monstera plant in the corner, abstract art on the wall, and floor-to-ceiling windows showing a city skyline at golden hour. The room has warm, inviting lighting and minimalist Scandinavian design aesthetics.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-4-edit-modern-living-room');

  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-4-edit-modern-living-room/ByteDance/Claude_4_Edit_Modern_Living_Room-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-4-edit-modern-living-room/ByteDance/Claude_4_Edit_Modern_Living_Room-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-4-edit-modern-living-room/ByteDance/Claude_4_Edit_Modern_Living_Room-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-4-edit-modern-living-room/ByteDance/Claude_4_Edit_Modern_Living_Room-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-4-edit-modern-living-room/ChatGPT/Claude_4_Edit_Modern_Living_Room-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Flux",
      imagePath: "/images/claude-4-edit-modern-living-room/Flux/Claude_4_Edit_Modern_Living_Room-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Flux",
      imagePath: "/images/claude-4-edit-modern-living-room/Flux/Claude_4_Edit_Modern_Living_Room-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Flux",
      imagePath: "/images/claude-4-edit-modern-living-room/Flux/Claude_4_Edit_Modern_Living_Room-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Flux",
      imagePath: "/images/claude-4-edit-modern-living-room/Flux/Claude_4_Edit_Modern_Living_Room-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Flux",
      imagePath: "/images/claude-4-edit-modern-living-room/Flux/Claude_4_Edit_Modern_Living_Room-Flux-5.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Grok",
      imagePath: "/images/claude-4-edit-modern-living-room/Grok/Claude_4_Edit_Modern_Living_Room-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Grok",
      imagePath: "/images/claude-4-edit-modern-living-room/Grok/Claude_4_Edit_Modern_Living_Room-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-4-edit-modern-living-room/Ideogram/Claude_4_Edit_Modern_Living_Room-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-4-edit-modern-living-room/Ideogram/Claude_4_Edit_Modern_Living_Room-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-4-edit-modern-living-room/Ideogram/Claude_4_Edit_Modern_Living_Room-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-4-edit-modern-living-room/Ideogram/Claude_4_Edit_Modern_Living_Room-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-4-edit-modern-living-room/Leonardo/Claude_4_Edit_Modern_Living_Room-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-4-edit-modern-living-room/Leonardo/Claude_4_Edit_Modern_Living_Room-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-4-edit-modern-living-room/Leonardo/Claude_4_Edit_Modern_Living_Room-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-4-edit-modern-living-room/Leonardo/Claude_4_Edit_Modern_Living_Room-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-4-edit-modern-living-room/Midjourney/Claude_4_Edit_Modern_Living_Room-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-4-edit-modern-living-room/Midjourney/Claude_4_Edit_Modern_Living_Room-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-4-edit-modern-living-room/Midjourney/Claude_4_Edit_Modern_Living_Room-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-4-edit-modern-living-room/Midjourney/Claude_4_Edit_Modern_Living_Room-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-4-edit-modern-living-room/NanoBananaPro/Claude_4_Edit_Modern_Living_Room-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Qwen",
      imagePath: "/images/claude-4-edit-modern-living-room/Qwen/Claude_4_Edit_Modern_Living_Room-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Reve",
      imagePath: "/images/claude-4-edit-modern-living-room/Reve/Claude_4_Edit_Modern_Living_Room-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Reve",
      imagePath: "/images/claude-4-edit-modern-living-room/Reve/Claude_4_Edit_Modern_Living_Room-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Reve",
      imagePath: "/images/claude-4-edit-modern-living-room/Reve/Claude_4_Edit_Modern_Living_Room-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt16.id,
      modelName: "Reve",
      imagePath: "/images/claude-4-edit-modern-living-room/Reve/Claude_4_Edit_Modern_Living_Room-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 30 images for claude-4-edit-modern-living-room');

  // Claude 4.1 Chanfe Sofa Color
  const prompt17 = await prisma.prompt.create({
    data: {
      text: "Change the gray sofa to a deep emerald green velvet material while keeping everything else exactly the same.",
      slug: "claude-41-chanfe-sofa-color",
      translations: {
        create: {
          language: 'en',
          text: "Change the gray sofa to a deep emerald green velvet material while keeping everything else exactly the same.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-41-chanfe-sofa-color');

  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-41-chanfe-sofa-color/ByteDance/Claude_4.1_Chanfe_Sofa_Color-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-41-chanfe-sofa-color/ByteDance/Claude_4.1_Chanfe_Sofa_Color-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-41-chanfe-sofa-color/ByteDance/Claude_4.1_Chanfe_Sofa_Color-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-41-chanfe-sofa-color/ByteDance/Claude_4.1_Chanfe_Sofa_Color-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-41-chanfe-sofa-color/ChatGPT/Claude_4.1_Chanfe_Sofa_Color-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "Flux",
      imagePath: "/images/claude-41-chanfe-sofa-color/Flux/Claude_4.1_Chanfe_Sofa_Color-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "Flux",
      imagePath: "/images/claude-41-chanfe-sofa-color/Flux/Claude_4.1_Chanfe_Sofa_Color-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "Flux",
      imagePath: "/images/claude-41-chanfe-sofa-color/Flux/Claude_4.1_Chanfe_Sofa_Color-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "Flux",
      imagePath: "/images/claude-41-chanfe-sofa-color/Flux/Claude_4.1_Chanfe_Sofa_Color-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "Grok",
      imagePath: "/images/claude-41-chanfe-sofa-color/Grok/Claude_4.1_Chanfe_Sofa_Color-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "Grok",
      imagePath: "/images/claude-41-chanfe-sofa-color/Grok/Claude_4.1_Chanfe_Sofa_Color-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-41-chanfe-sofa-color/NanoBananaPro/Claude_4.1_Chanfe_Sofa_Color-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "Reve",
      imagePath: "/images/claude-41-chanfe-sofa-color/Reve/Claude_4.1_Chanfe_Sofa_Color-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "Reve",
      imagePath: "/images/claude-41-chanfe-sofa-color/Reve/Claude_4.1_Chanfe_Sofa_Color-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "Reve",
      imagePath: "/images/claude-41-chanfe-sofa-color/Reve/Claude_4.1_Chanfe_Sofa_Color-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt17.id,
      modelName: "Reve",
      imagePath: "/images/claude-41-chanfe-sofa-color/Reve/Claude_4.1_Chanfe_Sofa_Color-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 16 images for claude-41-chanfe-sofa-color');

  // Claude 4.2 Replace plant
  const prompt18 = await prisma.prompt.create({
    data: {
      text: "Replace the monstera plant with a tall fiddle leaf fig tree in a woven basket planter. Keep the exact same position and lighting.",
      slug: "claude-42-replace-plant",
      translations: {
        create: {
          language: 'en',
          text: "Replace the monstera plant with a tall fiddle leaf fig tree in a woven basket planter. Keep the exact same position and lighting.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-42-replace-plant');

  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-42-replace-plant/ByteDance/Claude_4.2_Replace_plant-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-42-replace-plant/ByteDance/Claude_4.2_Replace_plant-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-42-replace-plant/ByteDance/Claude_4.2_Replace_plant-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-42-replace-plant/ByteDance/Claude_4.2_Replace_plant-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-42-replace-plant/ChatGPT/Claude_4.2_Replace_plant-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "Flux",
      imagePath: "/images/claude-42-replace-plant/Flux/Claude_4.2_Replace_plant-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "Flux",
      imagePath: "/images/claude-42-replace-plant/Flux/Claude_4.2_Replace_plant-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "Flux",
      imagePath: "/images/claude-42-replace-plant/Flux/Claude_4.2_Replace_plant-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "Flux",
      imagePath: "/images/claude-42-replace-plant/Flux/Claude_4.2_Replace_plant-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "Grok",
      imagePath: "/images/claude-42-replace-plant/Grok/Claude_4.2_Replace_plant-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "Grok",
      imagePath: "/images/claude-42-replace-plant/Grok/Claude_4.2_Replace_plant-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-42-replace-plant/NanoBananaPro/Claude_4.2_Replace_plant-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "Reve",
      imagePath: "/images/claude-42-replace-plant/Reve/Claude_4.2_Replace_plant-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "Reve",
      imagePath: "/images/claude-42-replace-plant/Reve/Claude_4.2_Replace_plant-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "Reve",
      imagePath: "/images/claude-42-replace-plant/Reve/Claude_4.2_Replace_plant-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt18.id,
      modelName: "Reve",
      imagePath: "/images/claude-42-replace-plant/Reve/Claude_4.2_Replace_plant-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 16 images for claude-42-replace-plant');

  // Claude 4.3 Change day to night
  const prompt19 = await prisma.prompt.create({
    data: {
      text: "Transform the scene from golden hour to a cozy evening setting with the city lights visible through the window and warm lamp lighting inside. Add some candles on the coffee table.",
      slug: "claude-43-change-day-to-night",
      translations: {
        create: {
          language: 'en',
          text: "Transform the scene from golden hour to a cozy evening setting with the city lights visible through the window and warm lamp lighting inside. Add some candles on the coffee table.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-43-change-day-to-night');

  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-43-change-day-to-night/ByteDance/Claude_4.3_Change_day_to_night-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-43-change-day-to-night/ByteDance/Claude_4.3_Change_day_to_night-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-43-change-day-to-night/ByteDance/Claude_4.3_Change_day_to_night-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-43-change-day-to-night/ByteDance/Claude_4.3_Change_day_to_night-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-43-change-day-to-night/ByteDance/Claude_4.3_Change_day_to_night-ByteDance-5.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-43-change-day-to-night/ByteDance/Claude_4.3_Change_day_to_night-ByteDance-6.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-43-change-day-to-night/ByteDance/Claude_4.3_Change_day_to_night-ByteDance-7.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-43-change-day-to-night/ByteDance/Claude_4.3_Change_day_to_night-ByteDance-8.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-43-change-day-to-night/ChatGPT/Claude_4.3_Change_day_to_night-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "Flux",
      imagePath: "/images/claude-43-change-day-to-night/Flux/Claude_4.3_Change_day_to_night-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "Flux",
      imagePath: "/images/claude-43-change-day-to-night/Flux/Claude_4.3_Change_day_to_night-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "Flux",
      imagePath: "/images/claude-43-change-day-to-night/Flux/Claude_4.3_Change_day_to_night-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "Flux",
      imagePath: "/images/claude-43-change-day-to-night/Flux/Claude_4.3_Change_day_to_night-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "Grok",
      imagePath: "/images/claude-43-change-day-to-night/Grok/Claude_4.3_Change_day_to_night-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "Grok",
      imagePath: "/images/claude-43-change-day-to-night/Grok/Claude_4.3_Change_day_to_night-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-43-change-day-to-night/NanoBananaPro/Claude_4.3_Change_day_to_night-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "Reve",
      imagePath: "/images/claude-43-change-day-to-night/Reve/Claude_4.3_Change_day_to_night-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "Reve",
      imagePath: "/images/claude-43-change-day-to-night/Reve/Claude_4.3_Change_day_to_night-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "Reve",
      imagePath: "/images/claude-43-change-day-to-night/Reve/Claude_4.3_Change_day_to_night-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt19.id,
      modelName: "Reve",
      imagePath: "/images/claude-43-change-day-to-night/Reve/Claude_4.3_Change_day_to_night-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 20 images for claude-43-change-day-to-night');

  // Claude 4.4 Add Object
  const prompt20 = await prisma.prompt.create({
    data: {
      text: "Add a coffee table book with the visible title \"DESIGN ANTHOLOGY\" on top of the wooden coffee table, positioned naturally as if someone just set it down.",
      slug: "claude-44-add-object",
      translations: {
        create: {
          language: 'en',
          text: "Add a coffee table book with the visible title \"DESIGN ANTHOLOGY\" on top of the wooden coffee table, positioned naturally as if someone just set it down.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-44-add-object');

  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-44-add-object/ByteDance/Claude_4.4_Add_Object-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-44-add-object/ByteDance/Claude_4.4_Add_Object-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-44-add-object/ByteDance/Claude_4.4_Add_Object-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-44-add-object/ByteDance/Claude_4.4_Add_Object-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-44-add-object/ChatGPT/Claude_4.4_Add_Object-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "Flux",
      imagePath: "/images/claude-44-add-object/Flux/Claude_4.4_Add_Object-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "Flux",
      imagePath: "/images/claude-44-add-object/Flux/Claude_4.4_Add_Object-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "Flux",
      imagePath: "/images/claude-44-add-object/Flux/Claude_4.4_Add_Object-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "Flux",
      imagePath: "/images/claude-44-add-object/Flux/Claude_4.4_Add_Object-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "Grok",
      imagePath: "/images/claude-44-add-object/Grok/Claude_4.4_Add_Object-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "Grok",
      imagePath: "/images/claude-44-add-object/Grok/Claude_4.4_Add_Object-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-44-add-object/NanoBananaPro/Claude_4.4_Add_Object-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "Reve",
      imagePath: "/images/claude-44-add-object/Reve/Claude_4.4_Add_Object-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt20.id,
      modelName: "Reve",
      imagePath: "/images/claude-44-add-object/Reve/Claude_4.4_Add_Object-Reve-2.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 14 images for claude-44-add-object');

  // Claude 4.5 Transform to water painting
  const prompt21 = await prisma.prompt.create({
    data: {
      text: "Transform this entire scene into a watercolor painting style while maintaining all the objects and composition. Keep the warm, inviting feeling but with visible brushstrokes and soft color bleeds.",
      slug: "claude-45-transform-to-water-painting",
      translations: {
        create: {
          language: 'en',
          text: "Transform this entire scene into a watercolor painting style while maintaining all the objects and composition. Keep the warm, inviting feeling but with visible brushstrokes and soft color bleeds.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-45-transform-to-water-painting');

  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-45-transform-to-water-painting/ChatGPT/Claude_4.5_Transform_to_water_painting-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "Flux",
      imagePath: "/images/claude-45-transform-to-water-painting/Flux/Claude_4.5_Transform_to_water_painting-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "Flux",
      imagePath: "/images/claude-45-transform-to-water-painting/Flux/Claude_4.5_Transform_to_water_painting-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "Flux",
      imagePath: "/images/claude-45-transform-to-water-painting/Flux/Claude_4.5_Transform_to_water_painting-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "Flux",
      imagePath: "/images/claude-45-transform-to-water-painting/Flux/Claude_4.5_Transform_to_water_painting-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "Grok",
      imagePath: "/images/claude-45-transform-to-water-painting/Grok/Claude_4.5_Transform_to_water_painting-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "Grok",
      imagePath: "/images/claude-45-transform-to-water-painting/Grok/Claude_4.5_Transform_to_water_painting-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-45-transform-to-water-painting/NanoBananaPro/Claude_4.5_Transform_to_water_painting-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "Reve",
      imagePath: "/images/claude-45-transform-to-water-painting/Reve/Claude_4.5_Transform_to_water_painting-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "Reve",
      imagePath: "/images/claude-45-transform-to-water-painting/Reve/Claude_4.5_Transform_to_water_painting-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "Reve",
      imagePath: "/images/claude-45-transform-to-water-painting/Reve/Claude_4.5_Transform_to_water_painting-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt21.id,
      modelName: "Reve",
      imagePath: "/images/claude-45-transform-to-water-painting/Reve/Claude_4.5_Transform_to_water_painting-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 12 images for claude-45-transform-to-water-painting');

  // Claude 5.1 eCommerce Hero Image
  const prompt22 = await prisma.prompt.create({
    data: {
      text: "Create a premium e-commerce hero image for a luxury smartwatch. The watch has a circular face with a midnight blue dial, silver hands, and a black leather strap. Position it at a 45-degree angle on a reflective dark surface. Include subtle lens flare and dramatic side lighting that creates elegant shadows. The background should be a gradient from deep navy to black. Leave negative space on the left side for marketing copy. The image should feel like an Apple or Tag Heuer advertisement — clean, premium, aspirational.",
      slug: "claude-51-ecommerce-hero-image",
      translations: {
        create: {
          language: 'en',
          text: "Create a premium e-commerce hero image for a luxury smartwatch. The watch has a circular face with a midnight blue dial, silver hands, and a black leather strap. Position it at a 45-degree angle on a reflective dark surface. Include subtle lens flare and dramatic side lighting that creates elegant shadows. The background should be a gradient from deep navy to black. Leave negative space on the left side for marketing copy. The image should feel like an Apple or Tag Heuer advertisement — clean, premium, aspirational.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-51-ecommerce-hero-image');

  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-51-ecommerce-hero-image/ByteDance/Claude_5.1_eCommerce_Hero_Image-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-51-ecommerce-hero-image/ByteDance/Claude_5.1_eCommerce_Hero_Image-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-51-ecommerce-hero-image/ByteDance/Claude_5.1_eCommerce_Hero_Image-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-51-ecommerce-hero-image/ByteDance/Claude_5.1_eCommerce_Hero_Image-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-51-ecommerce-hero-image/ChatGPT/Claude_5.1_eCommerce_Hero_Image-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Flux",
      imagePath: "/images/claude-51-ecommerce-hero-image/Flux/Claude_5.1_eCommerce_Hero_Image-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Flux",
      imagePath: "/images/claude-51-ecommerce-hero-image/Flux/Claude_5.1_eCommerce_Hero_Image-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Flux",
      imagePath: "/images/claude-51-ecommerce-hero-image/Flux/Claude_5.1_eCommerce_Hero_Image-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Flux",
      imagePath: "/images/claude-51-ecommerce-hero-image/Flux/Claude_5.1_eCommerce_Hero_Image-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Grok",
      imagePath: "/images/claude-51-ecommerce-hero-image/Grok/Claude_5.1_eCommerce_Hero_Image-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Grok",
      imagePath: "/images/claude-51-ecommerce-hero-image/Grok/Claude_5.1_eCommerce_Hero_Image-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-51-ecommerce-hero-image/Ideogram/Claude_5.1_eCommerce_Hero_Image-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-51-ecommerce-hero-image/Ideogram/Claude_5.1_eCommerce_Hero_Image-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-51-ecommerce-hero-image/Ideogram/Claude_5.1_eCommerce_Hero_Image-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-51-ecommerce-hero-image/Ideogram/Claude_5.1_eCommerce_Hero_Image-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-51-ecommerce-hero-image/Leonardo/Claude_5.1_eCommerce_Hero_Image-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-51-ecommerce-hero-image/Leonardo/Claude_5.1_eCommerce_Hero_Image-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-51-ecommerce-hero-image/Leonardo/Claude_5.1_eCommerce_Hero_Image-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-51-ecommerce-hero-image/Leonardo/Claude_5.1_eCommerce_Hero_Image-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-51-ecommerce-hero-image/Midjourney/Claude_5.1_eCommerce_Hero_Image-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-51-ecommerce-hero-image/Midjourney/Claude_5.1_eCommerce_Hero_Image-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-51-ecommerce-hero-image/Midjourney/Claude_5.1_eCommerce_Hero_Image-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-51-ecommerce-hero-image/Midjourney/Claude_5.1_eCommerce_Hero_Image-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-51-ecommerce-hero-image/NanoBananaPro/Claude_5.1_eCommerce_Hero_Image-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Qwen",
      imagePath: "/images/claude-51-ecommerce-hero-image/Qwen/Claude_5.1_eCommerce_Hero_Image-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Reve",
      imagePath: "/images/claude-51-ecommerce-hero-image/Reve/Claude_5.1_eCommerce_Hero_Image-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Reve",
      imagePath: "/images/claude-51-ecommerce-hero-image/Reve/Claude_5.1_eCommerce_Hero_Image-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Reve",
      imagePath: "/images/claude-51-ecommerce-hero-image/Reve/Claude_5.1_eCommerce_Hero_Image-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt22.id,
      modelName: "Reve",
      imagePath: "/images/claude-51-ecommerce-hero-image/Reve/Claude_5.1_eCommerce_Hero_Image-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 29 images for claude-51-ecommerce-hero-image');

  // Claude 5.2 Restaurant Menu Item
  const prompt23 = await prisma.prompt.create({
    data: {
      text: "Create a mouth-watering food photography shot of a gourmet burger. The burger features: a brioche bun with sesame seeds, two thick wagyu beef patties, melted aged cheddar, caramelized onions, crispy bacon, arugula, and a special sauce dripping down the side. Steam rises from the patties. Position on a dark slate surface with artisanal pickles and truffle fries visible in the background (out of focus). Use dramatic top-down lighting with a slight backlight to create a halo effect. The style should match high-end restaurant marketing — editorial food photography quality.",
      slug: "claude-52-restaurant-menu-item",
      translations: {
        create: {
          language: 'en',
          text: "Create a mouth-watering food photography shot of a gourmet burger. The burger features: a brioche bun with sesame seeds, two thick wagyu beef patties, melted aged cheddar, caramelized onions, crispy bacon, arugula, and a special sauce dripping down the side. Steam rises from the patties. Position on a dark slate surface with artisanal pickles and truffle fries visible in the background (out of focus). Use dramatic top-down lighting with a slight backlight to create a halo effect. The style should match high-end restaurant marketing — editorial food photography quality.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-52-restaurant-menu-item');

  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-52-restaurant-menu-item/ByteDance/Claude_5.2_Restaurant_Menu_Item-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-52-restaurant-menu-item/ByteDance/Claude_5.2_Restaurant_Menu_Item-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-52-restaurant-menu-item/ByteDance/Claude_5.2_Restaurant_Menu_Item-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-52-restaurant-menu-item/ByteDance/Claude_5.2_Restaurant_Menu_Item-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-52-restaurant-menu-item/ChatGPT/Claude_5.2_Restaurant_Menu_Item-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Flux",
      imagePath: "/images/claude-52-restaurant-menu-item/Flux/Claude_5.2_Restaurant_Menu_Item-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Flux",
      imagePath: "/images/claude-52-restaurant-menu-item/Flux/Claude_5.2_Restaurant_Menu_Item-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Flux",
      imagePath: "/images/claude-52-restaurant-menu-item/Flux/Claude_5.2_Restaurant_Menu_Item-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Flux",
      imagePath: "/images/claude-52-restaurant-menu-item/Flux/Claude_5.2_Restaurant_Menu_Item-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Grok",
      imagePath: "/images/claude-52-restaurant-menu-item/Grok/Claude_5.2_Restaurant_Menu_Item-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Grok",
      imagePath: "/images/claude-52-restaurant-menu-item/Grok/Claude_5.2_Restaurant_Menu_Item-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-52-restaurant-menu-item/Ideogram/Claude_5.2_Restaurant_Menu_Item-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-52-restaurant-menu-item/Ideogram/Claude_5.2_Restaurant_Menu_Item-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-52-restaurant-menu-item/Ideogram/Claude_5.2_Restaurant_Menu_Item-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-52-restaurant-menu-item/Ideogram/Claude_5.2_Restaurant_Menu_Item-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-52-restaurant-menu-item/Leonardo/Claude_5.2_Restaurant_Menu_Item-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-52-restaurant-menu-item/Leonardo/Claude_5.2_Restaurant_Menu_Item-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-52-restaurant-menu-item/Leonardo/Claude_5.2_Restaurant_Menu_Item-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-52-restaurant-menu-item/Leonardo/Claude_5.2_Restaurant_Menu_Item-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-52-restaurant-menu-item/Midjourney/Claude_5.2_Restaurant_Menu_Item-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-52-restaurant-menu-item/Midjourney/Claude_5.2_Restaurant_Menu_Item-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-52-restaurant-menu-item/Midjourney/Claude_5.2_Restaurant_Menu_Item-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-52-restaurant-menu-item/Midjourney/Claude_5.2_Restaurant_Menu_Item-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-52-restaurant-menu-item/NanoBananaPro/Claude_5.2_Restaurant_Menu_Item-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Qwen",
      imagePath: "/images/claude-52-restaurant-menu-item/Qwen/Claude_5.2_Restaurant_Menu_Item-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Reve",
      imagePath: "/images/claude-52-restaurant-menu-item/Reve/Claude_5.2_Restaurant_Menu_Item-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Reve",
      imagePath: "/images/claude-52-restaurant-menu-item/Reve/Claude_5.2_Restaurant_Menu_Item-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Reve",
      imagePath: "/images/claude-52-restaurant-menu-item/Reve/Claude_5.2_Restaurant_Menu_Item-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt23.id,
      modelName: "Reve",
      imagePath: "/images/claude-52-restaurant-menu-item/Reve/Claude_5.2_Restaurant_Menu_Item-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 29 images for claude-52-restaurant-menu-item');

  // Claude 5.3 Real State
  const prompt24 = await prisma.prompt.create({
    data: {
      text: "Create a photorealistic architectural visualization of a modern sustainable home exterior at dusk. The two-story home features floor-to-ceiling windows, a living green roof, exposed timber beams, and a wrap-around deck. Position the home on a gentle hillside with native landscaping and mature oak trees. The sky shows dramatic sunset colors reflected in the large windows. Include subtle landscape lighting illuminating the pathway and accent lighting on the facade. A Tesla is parked in the driveway. The overall feeling should be \"dream home meets environmental consciousness\" — the kind of image that makes people immediately want to know the asking price.",
      slug: "claude-53-real-state",
      translations: {
        create: {
          language: 'en',
          text: "Create a photorealistic architectural visualization of a modern sustainable home exterior at dusk. The two-story home features floor-to-ceiling windows, a living green roof, exposed timber beams, and a wrap-around deck. Position the home on a gentle hillside with native landscaping and mature oak trees. The sky shows dramatic sunset colors reflected in the large windows. Include subtle landscape lighting illuminating the pathway and accent lighting on the facade. A Tesla is parked in the driveway. The overall feeling should be \"dream home meets environmental consciousness\" — the kind of image that makes people immediately want to know the asking price.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-53-real-state');

  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-53-real-state/ByteDance/Claude_5.3_Real_State-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-53-real-state/ByteDance/Claude_5.3_Real_State-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-53-real-state/ByteDance/Claude_5.3_Real_State-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-53-real-state/ByteDance/Claude_5.3_Real_State-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-53-real-state/ChatGPT/Claude_5.3_Real_State-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Flux",
      imagePath: "/images/claude-53-real-state/Flux/Claude_5.3_Real_State-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Flux",
      imagePath: "/images/claude-53-real-state/Flux/Claude_5.3_Real_State-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Flux",
      imagePath: "/images/claude-53-real-state/Flux/Claude_5.3_Real_State-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Flux",
      imagePath: "/images/claude-53-real-state/Flux/Claude_5.3_Real_State-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Grok",
      imagePath: "/images/claude-53-real-state/Grok/Claude_5.3_Real_State-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Grok",
      imagePath: "/images/claude-53-real-state/Grok/Claude_5.3_Real_State-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-53-real-state/Ideogram/Claude_5.3_Real_State-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-53-real-state/Ideogram/Claude_5.3_Real_State-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-53-real-state/Ideogram/Claude_5.3_Real_State-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-53-real-state/Ideogram/Claude_5.3_Real_State-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-53-real-state/Leonardo/Claude_5.3_Real_State-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-53-real-state/Leonardo/Claude_5.3_Real_State-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-53-real-state/Leonardo/Claude_5.3_Real_State-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-53-real-state/Leonardo/Claude_5.3_Real_State-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-53-real-state/Midjourney/Claude_5.3_Real_State-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-53-real-state/Midjourney/Claude_5.3_Real_State-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-53-real-state/Midjourney/Claude_5.3_Real_State-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-53-real-state/Midjourney/Claude_5.3_Real_State-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-53-real-state/NanoBananaPro/Claude_5.3_Real_State-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Qwen",
      imagePath: "/images/claude-53-real-state/Qwen/Claude_5.3_Real_State-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Reve",
      imagePath: "/images/claude-53-real-state/Reve/Claude_5.3_Real_State-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Reve",
      imagePath: "/images/claude-53-real-state/Reve/Claude_5.3_Real_State-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Reve",
      imagePath: "/images/claude-53-real-state/Reve/Claude_5.3_Real_State-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt24.id,
      modelName: "Reve",
      imagePath: "/images/claude-53-real-state/Reve/Claude_5.3_Real_State-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 29 images for claude-53-real-state');

  // Claude 5.4 App Store Screenshot
  const prompt25 = await prisma.prompt.create({
    data: {
      text: "Create a polished app store screenshot for a meditation app. Show an iPhone 15 Pro at a slight angle displaying the app interface: a calming gradient from purple to blue, a centered lotus icon, the text \"Begin Your Journey\" in clean white sans-serif, and a \"Start 7-Day Free Trial\" button in soft gold. Around the phone, add floating 3D elements: translucent spheres, gentle wave patterns, and sparkle effects. The background should be a soft gradient that complements the app. The overall aesthetic should feel premium, calming, and conversion-optimized — like Calm or Headspace marketing.",
      slug: "claude-54-app-store-screenshot",
      translations: {
        create: {
          language: 'en',
          text: "Create a polished app store screenshot for a meditation app. Show an iPhone 15 Pro at a slight angle displaying the app interface: a calming gradient from purple to blue, a centered lotus icon, the text \"Begin Your Journey\" in clean white sans-serif, and a \"Start 7-Day Free Trial\" button in soft gold. Around the phone, add floating 3D elements: translucent spheres, gentle wave patterns, and sparkle effects. The background should be a soft gradient that complements the app. The overall aesthetic should feel premium, calming, and conversion-optimized — like Calm or Headspace marketing.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-54-app-store-screenshot');

  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-54-app-store-screenshot/ByteDance/Claude_5.4_App_Store_Screenshot-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-54-app-store-screenshot/ByteDance/Claude_5.4_App_Store_Screenshot-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-54-app-store-screenshot/ByteDance/Claude_5.4_App_Store_Screenshot-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-54-app-store-screenshot/ByteDance/Claude_5.4_App_Store_Screenshot-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-54-app-store-screenshot/ChatGPT/Claude_5.4_App_Store_Screenshot-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Flux",
      imagePath: "/images/claude-54-app-store-screenshot/Flux/Claude_5.4_App_Store_Screenshot-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Flux",
      imagePath: "/images/claude-54-app-store-screenshot/Flux/Claude_5.4_App_Store_Screenshot-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Flux",
      imagePath: "/images/claude-54-app-store-screenshot/Flux/Claude_5.4_App_Store_Screenshot-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Flux",
      imagePath: "/images/claude-54-app-store-screenshot/Flux/Claude_5.4_App_Store_Screenshot-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Grok",
      imagePath: "/images/claude-54-app-store-screenshot/Grok/Claude_5.4_App_Store_Screenshot-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Grok",
      imagePath: "/images/claude-54-app-store-screenshot/Grok/Claude_5.4_App_Store_Screenshot-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-54-app-store-screenshot/Ideogram/Claude_5.4_App_Store_Screenshot-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-54-app-store-screenshot/Ideogram/Claude_5.4_App_Store_Screenshot-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-54-app-store-screenshot/Ideogram/Claude_5.4_App_Store_Screenshot-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-54-app-store-screenshot/Ideogram/Claude_5.4_App_Store_Screenshot-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-54-app-store-screenshot/Leonardo/Claude_5.4_App_Store_Screenshot-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-54-app-store-screenshot/Leonardo/Claude_5.4_App_Store_Screenshot-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-54-app-store-screenshot/Leonardo/Claude_5.4_App_Store_Screenshot-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-54-app-store-screenshot/Leonardo/Claude_5.4_App_Store_Screenshot-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-54-app-store-screenshot/Midjourney/Claude_5.4_App_Store_Screenshot-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-54-app-store-screenshot/Midjourney/Claude_5.4_App_Store_Screenshot-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-54-app-store-screenshot/Midjourney/Claude_5.4_App_Store_Screenshot-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-54-app-store-screenshot/Midjourney/Claude_5.4_App_Store_Screenshot-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-54-app-store-screenshot/NanoBananaPro/Claude_5.4_App_Store_Screenshot-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Qwen",
      imagePath: "/images/claude-54-app-store-screenshot/Qwen/Claude_5.4_App_Store_Screenshot-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Reve",
      imagePath: "/images/claude-54-app-store-screenshot/Reve/Claude_5.4_App_Store_Screenshot-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Reve",
      imagePath: "/images/claude-54-app-store-screenshot/Reve/Claude_5.4_App_Store_Screenshot-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Reve",
      imagePath: "/images/claude-54-app-store-screenshot/Reve/Claude_5.4_App_Store_Screenshot-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt25.id,
      modelName: "Reve",
      imagePath: "/images/claude-54-app-store-screenshot/Reve/Claude_5.4_App_Store_Screenshot-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 29 images for claude-54-app-store-screenshot');

  // Claude 6.2 Cyberpunk
  const prompt27 = await prisma.prompt.create({
    data: {
      text: "Create a moody cyberpunk noir scene. A lone figure in a long trenchcoat walks through a rain-soaked alley in Neo-Tokyo, 2089. Neon signs in Japanese characters reflect off wet pavement in pinks, blues, and greens. Steam rises from street vents. The figure's face is partially obscured by the brim of their hat, with only the glow of a cybernetic eye visible. In the background, towering megastructures disappear into smog, their windows creating a grid of light. Include flying vehicles as distant silhouettes. The atmosphere should feel like Blade Runner meets Ghost in the Shell — beautiful, melancholic, and slightly menacing.",
      slug: "claude-62-cyberpunk",
      translations: {
        create: {
          language: 'en',
          text: "Create a moody cyberpunk noir scene. A lone figure in a long trenchcoat walks through a rain-soaked alley in Neo-Tokyo, 2089. Neon signs in Japanese characters reflect off wet pavement in pinks, blues, and greens. Steam rises from street vents. The figure's face is partially obscured by the brim of their hat, with only the glow of a cybernetic eye visible. In the background, towering megastructures disappear into smog, their windows creating a grid of light. Include flying vehicles as distant silhouettes. The atmosphere should feel like Blade Runner meets Ghost in the Shell — beautiful, melancholic, and slightly menacing.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-62-cyberpunk');

  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-62-cyberpunk/ByteDance/Claude_6.2_Cyberpunk-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-62-cyberpunk/ByteDance/Claude_6.2_Cyberpunk-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-62-cyberpunk/ByteDance/Claude_6.2_Cyberpunk-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-62-cyberpunk/ByteDance/Claude_6.2_Cyberpunk-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-62-cyberpunk/ChatGPT/Claude_6.2_Cyberpunk-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Flux",
      imagePath: "/images/claude-62-cyberpunk/Flux/Claude_6.2_Cyberpunk-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Flux",
      imagePath: "/images/claude-62-cyberpunk/Flux/Claude_6.2_Cyberpunk-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Flux",
      imagePath: "/images/claude-62-cyberpunk/Flux/Claude_6.2_Cyberpunk-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Flux",
      imagePath: "/images/claude-62-cyberpunk/Flux/Claude_6.2_Cyberpunk-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Grok",
      imagePath: "/images/claude-62-cyberpunk/Grok/Claude_6.2_Cyberpunk-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Grok",
      imagePath: "/images/claude-62-cyberpunk/Grok/Claude_6.2_Cyberpunk-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-62-cyberpunk/Ideogram/Claude_6.2_Cyberpunk-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-62-cyberpunk/Ideogram/Claude_6.2_Cyberpunk-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-62-cyberpunk/Ideogram/Claude_6.2_Cyberpunk-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-62-cyberpunk/Ideogram/Claude_6.2_Cyberpunk-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-62-cyberpunk/Leonardo/Claude_6.2_Cyberpunk-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-62-cyberpunk/Leonardo/Claude_6.2_Cyberpunk-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-62-cyberpunk/Leonardo/Claude_6.2_Cyberpunk-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-62-cyberpunk/Leonardo/Claude_6.2_Cyberpunk-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-62-cyberpunk/Midjourney/Claude_6.2_Cyberpunk-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-62-cyberpunk/Midjourney/Claude_6.2_Cyberpunk-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-62-cyberpunk/Midjourney/Claude_6.2_Cyberpunk-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-62-cyberpunk/Midjourney/Claude_6.2_Cyberpunk-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-62-cyberpunk/NanoBananaPro/Claude_6.2_Cyberpunk-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Qwen",
      imagePath: "/images/claude-62-cyberpunk/Qwen/Claude_6.2_Cyberpunk-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Reve",
      imagePath: "/images/claude-62-cyberpunk/Reve/Claude_6.2_Cyberpunk-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Reve",
      imagePath: "/images/claude-62-cyberpunk/Reve/Claude_6.2_Cyberpunk-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Reve",
      imagePath: "/images/claude-62-cyberpunk/Reve/Claude_6.2_Cyberpunk-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt27.id,
      modelName: "Reve",
      imagePath: "/images/claude-62-cyberpunk/Reve/Claude_6.2_Cyberpunk-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 29 images for claude-62-cyberpunk');

  // Claude 6.3 Abstract Emotions
  const prompt28 = await prisma.prompt.create({
    data: {
      text: "Create an abstract visualization of the concept \"the weight of untold stories.\" The image should evoke the feeling of words and experiences trapped inside, wanting to be released. Use layered textures: fragments of text in multiple languages dissolving into smoke, silhouettes of faces emerging from and disappearing into paint strokes, chains made of letters that are just beginning to break. The color palette should transition from heavy, oppressive dark blues and purples at the bottom to liberating golds and whites at the top. The composition should create a sense of upward movement and release. Include both digital precision and painterly chaos in the technique — as if the image itself is mid-transformation.",
      slug: "claude-63-abstract-emotions",
      translations: {
        create: {
          language: 'en',
          text: "Create an abstract visualization of the concept \"the weight of untold stories.\" The image should evoke the feeling of words and experiences trapped inside, wanting to be released. Use layered textures: fragments of text in multiple languages dissolving into smoke, silhouettes of faces emerging from and disappearing into paint strokes, chains made of letters that are just beginning to break. The color palette should transition from heavy, oppressive dark blues and purples at the bottom to liberating golds and whites at the top. The composition should create a sense of upward movement and release. Include both digital precision and painterly chaos in the technique — as if the image itself is mid-transformation.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-63-abstract-emotions');

  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-63-abstract-emotions/ByteDance/Claude_6.3_Abstract_Emotions-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-63-abstract-emotions/ByteDance/Claude_6.3_Abstract_Emotions-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-63-abstract-emotions/ByteDance/Claude_6.3_Abstract_Emotions-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-63-abstract-emotions/ByteDance/Claude_6.3_Abstract_Emotions-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-63-abstract-emotions/ChatGPT/Claude_6.3_Abstract_Emotions-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Flux",
      imagePath: "/images/claude-63-abstract-emotions/Flux/Claude_6.3_Abstract_Emotions-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Flux",
      imagePath: "/images/claude-63-abstract-emotions/Flux/Claude_6.3_Abstract_Emotions-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Flux",
      imagePath: "/images/claude-63-abstract-emotions/Flux/Claude_6.3_Abstract_Emotions-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Flux",
      imagePath: "/images/claude-63-abstract-emotions/Flux/Claude_6.3_Abstract_Emotions-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Grok",
      imagePath: "/images/claude-63-abstract-emotions/Grok/Claude_6.3_Abstract_Emotions-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Grok",
      imagePath: "/images/claude-63-abstract-emotions/Grok/Claude_6.3_Abstract_Emotions-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-63-abstract-emotions/Ideogram/Claude_6.3_Abstract_Emotions-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-63-abstract-emotions/Ideogram/Claude_6.3_Abstract_Emotions-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-63-abstract-emotions/Ideogram/Claude_6.3_Abstract_Emotions-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-63-abstract-emotions/Ideogram/Claude_6.3_Abstract_Emotions-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-63-abstract-emotions/Leonardo/Claude_6.3_Abstract_Emotions-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-63-abstract-emotions/Leonardo/Claude_6.3_Abstract_Emotions-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-63-abstract-emotions/Leonardo/Claude_6.3_Abstract_Emotions-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-63-abstract-emotions/Leonardo/Claude_6.3_Abstract_Emotions-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-63-abstract-emotions/Midjourney/Claude_6.3_Abstract_Emotions-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-63-abstract-emotions/Midjourney/Claude_6.3_Abstract_Emotions-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-63-abstract-emotions/Midjourney/Claude_6.3_Abstract_Emotions-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-63-abstract-emotions/Midjourney/Claude_6.3_Abstract_Emotions-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-63-abstract-emotions/NanoBananaPro/Claude_6.3_Abstract_Emotions-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Reve",
      imagePath: "/images/claude-63-abstract-emotions/Reve/Claude_6.3_Abstract_Emotions-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Reve",
      imagePath: "/images/claude-63-abstract-emotions/Reve/Claude_6.3_Abstract_Emotions-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Reve",
      imagePath: "/images/claude-63-abstract-emotions/Reve/Claude_6.3_Abstract_Emotions-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt28.id,
      modelName: "Reve",
      imagePath: "/images/claude-63-abstract-emotions/Reve/Claude_6.3_Abstract_Emotions-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 28 images for claude-63-abstract-emotions');

  // Claude 6.3 Biopunk Nature
  const prompt29 = await prisma.prompt.create({
    data: {
      text: "Imagine a world where technology and nature have merged. Create an image of a forest clearing where the trees have bioluminescent bark that pulses with data patterns. Mushrooms emit holographic spore clouds that display weather information. A deer stands at the center, its antlers replaced by delicate crystalline antenna arrays that pick up wireless signals. Fireflies are actually nano-drones maintaining the ecosystem. The lighting is otherworldly — a mix of natural moonlight and the soft glow of biological technology. The mood should feel magical and optimistic, like technology serving nature rather than replacing it.",
      slug: "claude-63-biopunk-nature",
      translations: {
        create: {
          language: 'en',
          text: "Imagine a world where technology and nature have merged. Create an image of a forest clearing where the trees have bioluminescent bark that pulses with data patterns. Mushrooms emit holographic spore clouds that display weather information. A deer stands at the center, its antlers replaced by delicate crystalline antenna arrays that pick up wireless signals. Fireflies are actually nano-drones maintaining the ecosystem. The lighting is otherworldly — a mix of natural moonlight and the soft glow of biological technology. The mood should feel magical and optimistic, like technology serving nature rather than replacing it.",
        },
      },
    },
  });
  console.log('✓ Created prompt: claude-63-biopunk-nature');

  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-63-biopunk-nature/ByteDance/Claude_6.3_Biopunk_Nature-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-63-biopunk-nature/ByteDance/Claude_6.3_Biopunk_Nature-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-63-biopunk-nature/ByteDance/Claude_6.3_Biopunk_Nature-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "ByteDance",
      imagePath: "/images/claude-63-biopunk-nature/ByteDance/Claude_6.3_Biopunk_Nature-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-63-biopunk-nature/ChatGPT/Claude_6.3_Biopunk_Nature-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "ChatGPT",
      imagePath: "/images/claude-63-biopunk-nature/ChatGPT/Claude_6.3_Biopunk_Nature-ChatGPT-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Flux",
      imagePath: "/images/claude-63-biopunk-nature/Flux/Claude_6.3_Biopunk_Nature-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Flux",
      imagePath: "/images/claude-63-biopunk-nature/Flux/Claude_6.3_Biopunk_Nature-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Flux",
      imagePath: "/images/claude-63-biopunk-nature/Flux/Claude_6.3_Biopunk_Nature-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Flux",
      imagePath: "/images/claude-63-biopunk-nature/Flux/Claude_6.3_Biopunk_Nature-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Grok",
      imagePath: "/images/claude-63-biopunk-nature/Grok/Claude_6.3_Biopunk_Nature-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Grok",
      imagePath: "/images/claude-63-biopunk-nature/Grok/Claude_6.3_Biopunk_Nature-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-63-biopunk-nature/Ideogram/Claude_6.3_Biopunk_Nature-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-63-biopunk-nature/Ideogram/Claude_6.3_Biopunk_Nature-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-63-biopunk-nature/Ideogram/Claude_6.3_Biopunk_Nature-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Ideogram",
      imagePath: "/images/claude-63-biopunk-nature/Ideogram/Claude_6.3_Biopunk_Nature-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-63-biopunk-nature/Leonardo/Claude_6.3_Biopunk_Nature-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-63-biopunk-nature/Leonardo/Claude_6.3_Biopunk_Nature-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-63-biopunk-nature/Leonardo/Claude_6.3_Biopunk_Nature-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Leonardo",
      imagePath: "/images/claude-63-biopunk-nature/Leonardo/Claude_6.3_Biopunk_Nature-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-63-biopunk-nature/Midjourney/Claude_6.3_Biopunk_Nature-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-63-biopunk-nature/Midjourney/Claude_6.3_Biopunk_Nature-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-63-biopunk-nature/Midjourney/Claude_6.3_Biopunk_Nature-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Midjourney",
      imagePath: "/images/claude-63-biopunk-nature/Midjourney/Claude_6.3_Biopunk_Nature-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/claude-63-biopunk-nature/NanoBananaPro/Claude_6.3_Biopunk_Nature-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Qwen",
      imagePath: "/images/claude-63-biopunk-nature/Qwen/Claude_6.3_Biopunk_Nature-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Reve",
      imagePath: "/images/claude-63-biopunk-nature/Reve/Claude_6.3_Biopunk_Nature-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Reve",
      imagePath: "/images/claude-63-biopunk-nature/Reve/Claude_6.3_Biopunk_Nature-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Reve",
      imagePath: "/images/claude-63-biopunk-nature/Reve/Claude_6.3_Biopunk_Nature-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt29.id,
      modelName: "Reve",
      imagePath: "/images/claude-63-biopunk-nature/Reve/Claude_6.3_Biopunk_Nature-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 30 images for claude-63-biopunk-nature');

  // Gemini 1 Typography
  const prompt30 = await prisma.prompt.create({
    data: {
      text: "Generate an image of A high-fashion magazine cover titled \"NEON FUTURE\". The text \"NEON FUTURE\" should be written in glossy, 3D iridescent bubble letters that are floating around the head of a futuristic cyborg fashion model. The model is wearing a translucent plastic trench coat. The background is a clean, matte pastel pink. The text must be legible, partially obscured by the model's hair but clearly reading \"NEON FUTURE\". Cinematic lighting, 8k resolution.",
      slug: "gemini-1-typography",
      translations: {
        create: {
          language: 'en',
          text: "Generate an image of A high-fashion magazine cover titled \"NEON FUTURE\". The text \"NEON FUTURE\" should be written in glossy, 3D iridescent bubble letters that are floating around the head of a futuristic cyborg fashion model. The model is wearing a translucent plastic trench coat. The background is a clean, matte pastel pink. The text must be legible, partially obscured by the model's hair but clearly reading \"NEON FUTURE\". Cinematic lighting, 8k resolution.",
        },
      },
    },
  });
  console.log('✓ Created prompt: gemini-1-typography');

  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-1-typography/ByteDance/Gemini_1_Typography-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-1-typography/ByteDance/Gemini_1_Typography-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-1-typography/ByteDance/Gemini_1_Typography-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-1-typography/ByteDance/Gemini_1_Typography-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "ChatGPT",
      imagePath: "/images/gemini-1-typography/ChatGPT/Gemini_1_Typography-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Flux",
      imagePath: "/images/gemini-1-typography/Flux/Gemini_1_Typography-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Flux",
      imagePath: "/images/gemini-1-typography/Flux/Gemini_1_Typography-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Flux",
      imagePath: "/images/gemini-1-typography/Flux/Gemini_1_Typography-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Flux",
      imagePath: "/images/gemini-1-typography/Flux/Gemini_1_Typography-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Grok",
      imagePath: "/images/gemini-1-typography/Grok/Gemini_1_Typography-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Grok",
      imagePath: "/images/gemini-1-typography/Grok/Gemini_1_Typography-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-1-typography/Ideogram/Gemini_1_Typography-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-1-typography/Ideogram/Gemini_1_Typography-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-1-typography/Ideogram/Gemini_1_Typography-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-1-typography/Ideogram/Gemini_1_Typography-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-1-typography/Leonardo/Gemini_1_Typography-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-1-typography/Leonardo/Gemini_1_Typography-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-1-typography/Leonardo/Gemini_1_Typography-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-1-typography/Leonardo/Gemini_1_Typography-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-1-typography/Midjourney/Gemini_1_Typography-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-1-typography/Midjourney/Gemini_1_Typography-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-1-typography/Midjourney/Gemini_1_Typography-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-1-typography/Midjourney/Gemini_1_Typography-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/gemini-1-typography/NanoBananaPro/Gemini_1_Typography-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Qwen",
      imagePath: "/images/gemini-1-typography/Qwen/Gemini_1_Typography-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Reve",
      imagePath: "/images/gemini-1-typography/Reve/Gemini_1_Typography-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Reve",
      imagePath: "/images/gemini-1-typography/Reve/Gemini_1_Typography-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Reve",
      imagePath: "/images/gemini-1-typography/Reve/Gemini_1_Typography-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt30.id,
      modelName: "Reve",
      imagePath: "/images/gemini-1-typography/Reve/Gemini_1_Typography-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 29 images for gemini-1-typography');

  // Gemini 2.1 COnsistenncy CHallenge
  const prompt31 = await prisma.prompt.create({
    data: {
      text: "A character design sheet of \"Jax,\" a mechanic in a solarpunk city. Jax is a young man with messy green-dyed hair, oil smudges on his cheek, wearing denim overalls with golden circuit-board embroidery. Neutral white background, three angles: front view, side view, and close-up of face. Flat lighting, concept art style.",
      slug: "gemini-21-consistenncy-challenge",
      translations: {
        create: {
          language: 'en',
          text: "A character design sheet of \"Jax,\" a mechanic in a solarpunk city. Jax is a young man with messy green-dyed hair, oil smudges on his cheek, wearing denim overalls with golden circuit-board embroidery. Neutral white background, three angles: front view, side view, and close-up of face. Flat lighting, concept art style.",
        },
      },
    },
  });
  console.log('✓ Created prompt: gemini-21-consistenncy-challenge');

  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-21-consistenncy-challenge/ByteDance/Gemini_2.1_COnsistenncy_CHallenge-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-21-consistenncy-challenge/ByteDance/Gemini_2.1_COnsistenncy_CHallenge-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-21-consistenncy-challenge/ByteDance/Gemini_2.1_COnsistenncy_CHallenge-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-21-consistenncy-challenge/ByteDance/Gemini_2.1_COnsistenncy_CHallenge-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "ChatGPT",
      imagePath: "/images/gemini-21-consistenncy-challenge/ChatGPT/Gemini_2.1_COnsistenncy_CHallenge-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Flux",
      imagePath: "/images/gemini-21-consistenncy-challenge/Flux/Gemini_2.1_COnsistenncy_CHallenge-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Flux",
      imagePath: "/images/gemini-21-consistenncy-challenge/Flux/Gemini_2.1_COnsistenncy_CHallenge-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Flux",
      imagePath: "/images/gemini-21-consistenncy-challenge/Flux/Gemini_2.1_COnsistenncy_CHallenge-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Flux",
      imagePath: "/images/gemini-21-consistenncy-challenge/Flux/Gemini_2.1_COnsistenncy_CHallenge-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Grok",
      imagePath: "/images/gemini-21-consistenncy-challenge/Grok/Gemini_2.1_COnsistenncy_CHallenge-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Grok",
      imagePath: "/images/gemini-21-consistenncy-challenge/Grok/Gemini_2.1_COnsistenncy_CHallenge-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-21-consistenncy-challenge/Ideogram/Gemini_2.1_COnsistenncy_CHallenge-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-21-consistenncy-challenge/Ideogram/Gemini_2.1_COnsistenncy_CHallenge-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-21-consistenncy-challenge/Ideogram/Gemini_2.1_COnsistenncy_CHallenge-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-21-consistenncy-challenge/Ideogram/Gemini_2.1_COnsistenncy_CHallenge-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-21-consistenncy-challenge/Leonardo/Gemini_2.1_COnsistenncy_CHallenge-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-21-consistenncy-challenge/Leonardo/Gemini_2.1_COnsistenncy_CHallenge-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-21-consistenncy-challenge/Leonardo/Gemini_2.1_COnsistenncy_CHallenge-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-21-consistenncy-challenge/Leonardo/Gemini_2.1_COnsistenncy_CHallenge-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-21-consistenncy-challenge/Midjourney/Gemini_2.1_COnsistenncy_CHallenge-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-21-consistenncy-challenge/Midjourney/Gemini_2.1_COnsistenncy_CHallenge-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-21-consistenncy-challenge/Midjourney/Gemini_2.1_COnsistenncy_CHallenge-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-21-consistenncy-challenge/Midjourney/Gemini_2.1_COnsistenncy_CHallenge-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/gemini-21-consistenncy-challenge/NanoBananaPro/Gemini_2.1_COnsistenncy_CHallenge-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Qwen",
      imagePath: "/images/gemini-21-consistenncy-challenge/Qwen/Gemini_2.1_COnsistenncy_CHallenge-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Reve",
      imagePath: "/images/gemini-21-consistenncy-challenge/Reve/Gemini_2.1_COnsistenncy_CHallenge-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Reve",
      imagePath: "/images/gemini-21-consistenncy-challenge/Reve/Gemini_2.1_COnsistenncy_CHallenge-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Reve",
      imagePath: "/images/gemini-21-consistenncy-challenge/Reve/Gemini_2.1_COnsistenncy_CHallenge-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt31.id,
      modelName: "Reve",
      imagePath: "/images/gemini-21-consistenncy-challenge/Reve/Gemini_2.1_COnsistenncy_CHallenge-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 29 images for gemini-21-consistenncy-challenge');

  // Gemini 2.2 The Action SHot
  const prompt32 = await prisma.prompt.create({
    data: {
      text: "A cinematic shot of Jax (the mechanic with messy green hair and denim overalls with gold circuits) fixing a broken hovering drone in a rainy neon alleyway at night. He looks frustrated, holding a glowing blue wrench. Wet texture, dramatic cyber-noir lighting, volumetric fog.",
      slug: "gemini-22-the-action-shot",
      translations: {
        create: {
          language: 'en',
          text: "A cinematic shot of Jax (the mechanic with messy green hair and denim overalls with gold circuits) fixing a broken hovering drone in a rainy neon alleyway at night. He looks frustrated, holding a glowing blue wrench. Wet texture, dramatic cyber-noir lighting, volumetric fog.",
        },
      },
    },
  });
  console.log('✓ Created prompt: gemini-22-the-action-shot');

  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-22-the-action-shot/ByteDance/Gemini_2.2_The_Action_SHot-ByteDance-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-22-the-action-shot/ByteDance/Gemini_2.2_The_Action_SHot-ByteDance-2.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-22-the-action-shot/ByteDance/Gemini_2.2_The_Action_SHot-ByteDance-3.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "ByteDance",
      imagePath: "/images/gemini-22-the-action-shot/ByteDance/Gemini_2.2_The_Action_SHot-ByteDance-4.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "ChatGPT",
      imagePath: "/images/gemini-22-the-action-shot/ChatGPT/Gemini_2.2_The_Action_SHot-ChatGPT-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Flux",
      imagePath: "/images/gemini-22-the-action-shot/Flux/Gemini_2.2_The_Action_SHot-Flux-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Flux",
      imagePath: "/images/gemini-22-the-action-shot/Flux/Gemini_2.2_The_Action_SHot-Flux-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Flux",
      imagePath: "/images/gemini-22-the-action-shot/Flux/Gemini_2.2_The_Action_SHot-Flux-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Flux",
      imagePath: "/images/gemini-22-the-action-shot/Flux/Gemini_2.2_The_Action_SHot-Flux-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Grok",
      imagePath: "/images/gemini-22-the-action-shot/Grok/Gemini_2.2_The_Action_SHot-Grok-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Grok",
      imagePath: "/images/gemini-22-the-action-shot/Grok/Gemini_2.2_The_Action_SHot-Grok-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-22-the-action-shot/Ideogram/Gemini_2.2_The_Action_SHot-Ideogram-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-22-the-action-shot/Ideogram/Gemini_2.2_The_Action_SHot-Ideogram-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-22-the-action-shot/Ideogram/Gemini_2.2_The_Action_SHot-Ideogram-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Ideogram",
      imagePath: "/images/gemini-22-the-action-shot/Ideogram/Gemini_2.2_The_Action_SHot-Ideogram-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-22-the-action-shot/Leonardo/Gemini_2.2_The_Action_SHot-Leonardo-1.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-22-the-action-shot/Leonardo/Gemini_2.2_The_Action_SHot-Leonardo-2.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-22-the-action-shot/Leonardo/Gemini_2.2_The_Action_SHot-Leonardo-3.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Leonardo",
      imagePath: "/images/gemini-22-the-action-shot/Leonardo/Gemini_2.2_The_Action_SHot-Leonardo-4.jpg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-22-the-action-shot/Midjourney/Gemini_2.2_The_Action_SHot-Midjourney-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-22-the-action-shot/Midjourney/Gemini_2.2_The_Action_SHot-Midjourney-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-22-the-action-shot/Midjourney/Gemini_2.2_The_Action_SHot-Midjourney-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Midjourney",
      imagePath: "/images/gemini-22-the-action-shot/Midjourney/Gemini_2.2_The_Action_SHot-Midjourney-4.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "NanoBananaPro",
      imagePath: "/images/gemini-22-the-action-shot/NanoBananaPro/Gemini_2.2_The_Action_SHot-NanoBananaPro-1.jpeg",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Qwen",
      imagePath: "/images/gemini-22-the-action-shot/Qwen/Gemini_2.2_The_Action_SHot-Qwen-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Reve",
      imagePath: "/images/gemini-22-the-action-shot/Reve/Gemini_2.2_The_Action_SHot-Reve-1.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Reve",
      imagePath: "/images/gemini-22-the-action-shot/Reve/Gemini_2.2_The_Action_SHot-Reve-2.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Reve",
      imagePath: "/images/gemini-22-the-action-shot/Reve/Gemini_2.2_The_Action_SHot-Reve-3.png",
      impressionCount: 0,
    },
  });
  await prisma.image.create({
    data: {
      promptId: prompt32.id,
      modelName: "Reve",
      imagePath: "/images/gemini-22-the-action-shot/Reve/Gemini_2.2_The_Action_SHot-Reve-4.png",
      impressionCount: 0,
    },
  });
  console.log('  Created 29 images for gemini-22-the-action-shot');


  const promptCount = await prisma.prompt.count();
  const imageCount = await prisma.image.count();

  console.log('\n=== Seed Summary ===');
  console.log(`Total prompts: ${promptCount}`);
  console.log(`Total images: ${imageCount}`);
  console.log('\nSeed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
