import { describe, it, expect } from 'vitest';
import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';

describe('Prisma setup', () => {
  it('should import PrismaClient successfully', () => {
    expect(PrismaClient).toBeDefined();
  });

  it('should create prisma instance', () => {
    expect(prisma).toBeDefined();
    expect(prisma).toBeInstanceOf(PrismaClient);
  });

  it('should have all required models', () => {
    expect(prisma.prompt).toBeDefined();
    expect(prisma.image).toBeDefined();
    expect(prisma.vote).toBeDefined();
    expect(prisma.imageImpression).toBeDefined();
  });
});
