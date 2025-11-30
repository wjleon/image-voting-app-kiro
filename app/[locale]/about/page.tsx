import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  return {
    title: t('pageTitle'),
    description: t('metaDescription'),
  };
}

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with Profile */}
      <div className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Profile Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="p-8 sm:p-12">
              {/* Profile Image and Name */}
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                    <Image
                      src="/images/profile.jpg"
                      alt={t('profileAlt')}
                      fill
                      className="rounded-full object-cover ring-4 ring-white dark:ring-gray-700 shadow-xl"
                      priority
                    />
                  </div>
                </div>
                
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
                    {t('name')}
                  </h1>
                  <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                    {t('tagline')}
                  </p>
                </div>
              </div>

              {/* Bio Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                  {t('bioTitle')}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('bioText')}
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                  {t('connectTitle')}
                </h2>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={t('linkedinUrl')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 min-h-[44px] font-medium"
                  >
                    <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                    LinkedIn
                  </a>
                  <a
                    href={t('mediumUrl')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 min-h-[44px] font-medium"
                  >
                    <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                    Medium
                  </a>
                  <a
                    href={t('githubUrl')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 min-h-[44px] font-medium"
                  >
                    <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
