'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { locales } from '@/i18n';

interface LanguageSwitcherProps {
  currentLocale: string;
}

const localeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
};

const localeFlags: Record<string, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
};

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Get the current path without the locale prefix
    // pathname will be like "/en/p/some-slug" or "/en"
    const segments = pathname.split('/').filter(Boolean);
    
    // Remove the first segment (current locale)
    if (segments.length > 0 && locales.includes(segments[0] as any)) {
      segments.shift();
    }
    
    // Build the new path with the new locale
    const pathWithoutLocale = segments.length > 0 ? `/${segments.join('/')}` : '';
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    console.log('Language change:', {
      currentLocale,
      newLocale,
      pathname,
      segments,
      pathWithoutLocale,
      newPath,
    });

    // Navigate to the same path with the new locale
    startTransition(() => {
      router.push(newPath);
      router.refresh();
    });
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        disabled={isPending}
        className="appearance-none bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 dark:text-gray-300 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-700 dark:hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md cursor-pointer"
        aria-label="Select language"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeFlags[locale]} {localeNames[locale]}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-600 dark:text-blue-400">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
