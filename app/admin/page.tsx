import prisma from '@/lib/prisma';

/**
 * Admin Dashboard Page
 * Displays voting statistics and analytics
 */
export default async function AdminPage() {
  // Fetch statistics
  const totalVotes = await prisma.vote.count();
  const totalPrompts = await prisma.prompt.count();
  const totalImages = await prisma.image.count();

  // Get total impressions
  const images = await prisma.image.findMany({
    select: { impressionCount: true },
  });
  const totalImpressions = images.reduce((sum, img) => sum + img.impressionCount, 0);

  // Get per-model statistics
  const votes = await prisma.vote.groupBy({
    by: ['chosenModel'],
    _count: {
      chosenModel: true,
    },
  });

  const modelStats = await Promise.all(
    votes.map(async (vote) => {
      const modelImages = await prisma.image.findMany({
        where: { modelName: vote.chosenModel },
        select: { impressionCount: true },
      });

      const impressions = modelImages.reduce((sum, img) => sum + img.impressionCount, 0);
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
    })
  );

  // Sort by votes descending
  modelStats.sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI Image Voting Analytics
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Votes" value={totalVotes.toLocaleString()} />
          <StatCard title="Total Impressions" value={totalImpressions.toLocaleString()} />
          <StatCard title="Prompts" value={totalPrompts.toLocaleString()} />
          <StatCard title="Images" value={totalImages.toLocaleString()} />
        </div>

        {/* Model Statistics Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Model Performance
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Votes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Impressions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Win Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    CTR
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
            API Endpoints
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-mono text-blue-600 dark:text-blue-400">GET /api/admin/stats</span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">- Get detailed statistics</span>
            </div>
            <div>
              <span className="font-mono text-blue-600 dark:text-blue-400">GET /api/admin/export</span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">- Export data as CSV</span>
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
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {title}
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </div>
    </div>
  );
}
