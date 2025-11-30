import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';
import prisma from '@/lib/prisma';
import { ModelName } from '@/types';

/**
 * Request body schema for vote submission
 */
interface VoteRequest {
  promptId: string;
  selectedModel: ModelName;
  shownModels: ModelName[];
  sessionId: string;
}

/**
 * POST /api/vote
 * Submits a user vote with comprehensive metadata
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: VoteRequest = await request.json();
    const { promptId, selectedModel, shownModels, sessionId } = body;

    // Validate required fields
    if (!promptId || !selectedModel || !shownModels || !sessionId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate shownModels array
    if (!Array.isArray(shownModels) || shownModels.length !== 4) {
      return NextResponse.json(
        { success: false, error: 'shownModels must be an array of 4 model names' },
        { status: 400 }
      );
    }

    // Extract IP address from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const userIp = forwardedFor?.split(',')[0].trim() || realIp || 'unknown';

    // Extract geolocation from Vercel headers
    const country = request.headers.get('x-vercel-ip-country') || null;
    const region = request.headers.get('x-vercel-ip-city') || null;

    // Parse user agent
    const userAgentString = request.headers.get('user-agent') || '';
    const parser = new UAParser(userAgentString);
    const uaResult = parser.getResult();

    const browser = uaResult.browser.name || null;
    const os = uaResult.os.name || null;
    const device = uaResult.device.type || 'desktop';

    // Find the image that was selected
    const selectedImage = await prisma.image.findFirst({
      where: {
        promptId,
        modelName: selectedModel,
      },
    });

    // Create vote record in database
    const vote = await prisma.vote.create({
      data: {
        promptId,
        imageId: selectedImage?.id || null,
        chosenModel: selectedModel,
        shownModels: shownModels,
        userIp,
        userAgent: userAgentString,
        browser,
        os,
        device,
        country,
        region,
        sessionId,
        timestamp: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      voteId: vote.id,
    });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit vote' },
      { status: 500 }
    );
  }
}
