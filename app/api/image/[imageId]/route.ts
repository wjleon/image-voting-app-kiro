import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

/**
 * GET /api/image/[imageId]
 * Serves images anonymously without revealing model names in URLs
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ imageId: string }> }
) {
  try {
    const { imageId } = await params;

    // Fetch image from database
    const image = await prisma.image.findUnique({
      where: { id: imageId },
      select: { imagePath: true },
    });

    if (!image) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Get the file path (remove leading slash for file system)
    const filePath = path.join(process.cwd(), 'public', image.imagePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Image file not found', { status: 404 });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);

    // Determine content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentTypeMap: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    };
    const contentType = contentTypeMap[ext] || 'image/jpeg';

    // Return the image with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
