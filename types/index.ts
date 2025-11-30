// Shared TypeScript type definitions

export type ModelName =
  | 'ByteDance'
  | 'ChatGPT'
  | 'Flux'
  | 'Grok'
  | 'Ideogram'
  | 'Leonardo'
  | 'Midjourney'
  | 'NanoBananaPro'
  | 'Qwen'
  | 'Reve';

export const MODEL_NAME_MAP: Record<string, ModelName> = {
  'ByteDance': 'ByteDance',
  'ChatGPT': 'ChatGPT',
  'Flux': 'Flux',
  'Grok': 'Grok',
  'Ideogram': 'Ideogram',
  'Leonardo': 'Leonardo',
  'Midjourney': 'Midjourney',
  'Nano Banana Pro': 'NanoBananaPro',
  'Nano Banana': 'NanoBananaPro',
  'Qwen': 'Qwen',
  'Reve': 'Reve',
};

// Database-related types
export interface VoteMetadata {
  promptId: string;
  chosenModel: ModelName;
  shownModels: ModelName[];
  sessionId: string;
  userIp: string;
  userAgent: string;
  browser: string | null;
  os: string | null;
  device: string | null;
  country: string | null;
  region: string | null;
  timestamp: Date;
}

export interface Challenge {
  folderName: string;
  slug: string;
  promptText: string;
  models: ModelOutput[];
}

export interface ModelOutput {
  modelName: ModelName;
  images: ImageFile[];
}

export interface ImageFile {
  originalPath: string;
  deployedPath: string;
  filename: string;
  sequence: number;
}
