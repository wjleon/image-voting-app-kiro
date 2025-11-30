import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface ModelStats {
  modelName: string;
  votes: number;
  impressions: number;
  winRate: number;
  ctr: number;
}

interface StatsResponse {
  totalVotes: number;
  totalImpressions: number;
  modelStats: ModelStats[];
}

/**
 * GET /api/admin/stats
 * Returns aggregated statistics for admin dashboard
 * 
 * Query parameters:
 * - promptId: Filter by specific prompt
 * - modelName: Filter by specific model
 * - startDate: Filter votes after this date
 * - endDate: Filter votes before this date
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const promptId = searchParams.get('promptId');
  const modelName = searchParams.get('modelName');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  try {
    // Build where clause for votes
    const voteWhere: any = {};
    if (promptId) voteWhere.promptId = promptId;
    if (modelName) voteWhere.chosenModel = modelName;
    if (startDate || endDate) {
      voteWhere.timestamp = {};
      if (startDate) voteWhere.timestamp.gte = new Date(startDate);
      if (endDate) voteWhere.timestamp.lte = new Date(endDate);
    }

    // Build where clause for images
    const imageWhere: any = {};
    if (promptId) imageWhere.promptId = promptId;
    if (modelName) imageWhere.modelName = modelName;

    // Get total votes
    const totalVotes = await prisma.vote.count({ where: voteWhere });

    // Get total impressions
    const images = await prisma.image.findMany({ where: imageWhere });
    const totalImpressions = images.reduce((sum, img) => sum + img.impressionCount, 0);

    // Get votes grouped by model
    const votesByModel = await prisma.vote.groupBy({
      by: ['chosenModel'],
      where: voteWhere,
      _count: {
        chosenModel: true,
      },
    });

    // Get impressions grouped by model
    const impressionsByModel = await prisma.image.groupBy({
      by: ['modelName'],
      where: imageWhere,
      _sum: {
        impressionCount: true,
      },
    });

    // Combine into model stats
    const modelStatsMap = new Map<string, ModelStats>();

    // Initialize with votes
    votesByModel.forEach((item) => {
      modelStatsMap.set(item.chosenModel, {
        modelName: item.chosenModel,
        votes: item._count.chosenModel,
        impressions: 0,
        winRate: 0,
        ctr: 0,
      });
    });

    // Add impressions
    impressionsByModel.forEach((item) => {
      const existing = modelStatsMap.get(item.modelName);
      if (existing) {
        existing.impressions = item._sum.impressionCount || 0;
      } else {
        modelStatsMap.set(item.modelName, {
          modelName: item.modelName,
          votes: 0,
          impressions: item._sum.impressionCount || 0,
          winRate: 0,
          ctr: 0,
        });
      }
    });

    // Calculate win rate and CTR
    const modelStats: ModelStats[] = Array.from(modelStatsMap.values()).map((stats) => ({
      ...stats,
      winRate: totalVotes > 0 ? stats.votes / totalVotes : 0,
      ctr: stats.impressions > 0 ? stats.votes / stats.impressions : 0,
    }));

    // Sort by votes descending
    modelStats.sort((a, b) => b.votes - a.votes);

    const response: StatsResponse = {
      totalVotes,
      totalImpressions,
      modelStats,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
