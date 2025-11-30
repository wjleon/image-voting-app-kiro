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
    <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Section */}
        <section className="text-center mb-12">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src="/images/profile.svg"
              alt={t('profileAlt')}
              fill
              className="rounded-full object-cover bg-gray-200 dark:bg-gray-700"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t('name')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('tagline')}
          </p>
        </section>

        {/* Bio Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('bioTitle')}
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {t('bioText')}
            </p>
          </div>
        </section>

        {/* Social Links Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('connectTitle')}
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href={t('linkedinUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]"
            >
              <ExternalLink size={20} />
              LinkedIn
            </a>
            <a
              href={t('mediumUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors min-h-[44px]"
            >
              <ExternalLink size={20} />
              Medium
            </a>
            <a
              href={t('githubUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors min-h-[44px]"
            >
              <ExternalLink size={20} />
              GitHub
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
