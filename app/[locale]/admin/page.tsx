import prisma from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';

/**
 * Admin Dashboard Page
 * Displays voting statistics and analytics
 */
export default async function AdminPage() {
  const t = await getTranslations();
  // Fetch statistics
  const totalVotes = await prisma.vote.count();
  const totalPrompts = await prisma.prompt.count();
  const totalImages = await prisma.image.count();

  // Get total impressions
  const images = await prisma.image.findMany({
    select: { impressionCount: true },
  });
  const totalImpressions = images.reduce(
    (sum: number, img: { impressionCount: number }) => sum + img.impressionCount,
    0
  );

  // Get per-model statistics
  const votes = await prisma.vote.groupBy({
    by: ['chosenModel'],
    _count: {
      chosenModel: true,
    },
  });

  const modelStats = await Promise.all(
    votes.map(
      async (vote: { chosenModel: string; _count: { chosenModel: number } }) => {
        const modelImages = await prisma.image.findMany({
          where: { modelName: vote.chosenModel },
          select: { impressionCount: true },
        });

        const impressions = modelImages.reduce(
          (sum: number, img: { impressionCount: number }) => sum + img.impressionCount,
          0
        );
      const voteCount = vote._count.chosenModel;
      const winRate = totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(2) : '0.00';
      const ctr = impressions > 0 ? ((voteCount / impressions) * 100).toFixed(2) : '0.00';

      return {
        modelName: vote.chosenModel,
        votes: voteCount,
        impressions,
        winRate: `${winRate}%`,
        ctr: `${ctr}%`,
      };
    }
    )
  );

  // Sort by votes descending
  modelStats.sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('admin.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t('admin.subtitle')}</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title={t('admin.stats.totalVotes')} value={totalVotes.toLocaleString()} />
          <StatCard
            title={t('admin.stats.totalImpressions')}
            value={totalImpressions.toLocaleString()}
          />
          <StatCard title={t('admin.stats.prompts')} value={totalPrompts.toLocaleString()} />
          <StatCard title={t('admin.stats.images')} value={totalImages.toLocaleString()} />
        </div>

        {/* Model Statistics Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {t('admin.table.title')}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('admin.table.model')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('admin.table.votes')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('admin.table.impressions')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('admin.table.winRate')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t('admin.table.ctr')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {modelStats.map((stat) => (
                  <tr key={stat.modelName} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {stat.modelName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {stat.votes.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {stat.impressions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {stat.winRate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {stat.ctr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* API Links */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {t('admin.api.title')}
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-mono text-blue-600 dark:text-blue-400">
                GET /api/admin/stats
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">
                - {t('admin.api.stats')}
              </span>
            </div>
            <div>
              <span className="font-mono text-blue-600 dark:text-blue-400">
                GET /api/admin/export
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">
                - {t('admin.api.export')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Stat Card Component
 */
function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </div>
    </div>
  );
}
