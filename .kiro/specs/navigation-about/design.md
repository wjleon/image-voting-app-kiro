# Design Document

## Overview

The Navigation & About Me feature adds a global navigation system and a dedicated About page to the AI Image Model Comparison Voting Application. The navigation bar provides consistent access to key pages and utilities across the entire application, while the About page showcases the creator's profile and social media presence. The implementation leverages the existing next-intl internationalization infrastructure to ensure all navigation elements and content are fully localized in English and Spanish.

The navigation bar uses glassmorphism styling with a semi-transparent background and blur effect, creating a modern aesthetic that doesn't obstruct page content. The component is responsive, adapting from a full horizontal layout on desktop to a mobile-optimized layout on smaller screens. The About page follows the same design language, presenting the creator's profile picture, bio, and social media links in a clean, accessible format.

## Architecture

### Component Structure

```
app/[locale]/layout.tsx
├── <Navigation />          # Global navigation bar
└── {children}              # Page content
    ├── app/[locale]/page.tsx
    ├── app/[locale]/p/[slug]/page.tsx
    └── app/[locale]/about/page.tsx  # New About page
```

### Navigation Component Hierarchy

```
<Navigation>
├── <nav> (glassmorphism container)
│   ├── <Link> (Logo/Home)
│   ├── <div> (Navigation Links)
│   │   ├── <Link to="/[locale]">Home</Link>
│   │   └── <Link to="/[locale]/about">About</Link>
│   └── <LanguageSwitcher />
```

### About Page Structure

```
<AboutPage>
├── <section> (Hero/Profile)
│   ├── <Image> (Profile Picture)
│   ├── <h1> (Name/Title)
│   └── <p> (Tagline)
├── <section> (Bio)
│   └── <p> (Description)
└── <section> (Social Links)
    ├── <a> (LinkedIn)
    ├── <a> (Medium)
    ├── <a> (GitHub)
    └── <a> (Other platforms)
```

## Components and Interfaces

### Navigation Component

**File**: `components/Navigation.tsx`

**Type**: Client Component (uses useTranslations)

**Props**: None (reads locale from context)

**Implementation**:

```typescript
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home Link */}
          <Link 
            href="/" 
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t('appName')}
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t('home')}
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t('about')}
            </Link>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
```

**Styling Details**:
- `backdrop-blur-md`: Creates glassmorphism blur effect
- `bg-white/80`: 80% opacity white background
- `fixed top-0`: Keeps navigation at top of viewport
- `z-50`: Ensures navigation stays above other content
- Responsive padding: `px-4 sm:px-6 lg:px-8`

### About Page Component

**File**: `app/[locale]/about/page.tsx`

**Type**: Server Component

**Implementation**:

```typescript
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link as ExternalLink } from 'lucide-react';

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
              src="/images/profile.jpg"
              alt={t('profileAlt')}
              fill
              className="rounded-full object-cover"
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
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink size={20} />
              LinkedIn
            </a>
            <a
              href={t('mediumUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <ExternalLink size={20} />
              Medium
            </a>
            <a
              href={t('githubUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
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
```

### Updated LanguageSwitcher Component

The existing `LanguageSwitcher` component will be reused in the navigation. It should be updated to work well in the navigation context:

```typescript
'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = params.locale as string;

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="relative">
      <select
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        disabled={isPending}
        className="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
```

## Data Models

### Translation Keys

**messages/en.json**:

```json
{
  "Navigation": {
    "appName": "AI Image Voting",
    "home": "Home",
    "about": "About"
  },
  "About": {
    "pageTitle": "About - AI Image Voting",
    "metaDescription": "Learn about the creator of the AI Image Model Comparison Voting Application",
    "profileAlt": "Profile picture",
    "name": "Your Name",
    "tagline": "Software Engineer & AI Enthusiast",
    "bioTitle": "About This Project",
    "bioText": "This application was created to provide an unbiased platform for comparing AI-generated images from different models. By using a fairness algorithm and complete URL anonymization, we ensure that votes are based purely on image quality rather than model reputation.",
    "connectTitle": "Connect With Me",
    "linkedinUrl": "https://linkedin.com/in/yourprofile",
    "mediumUrl": "https://medium.com/@yourprofile",
    "githubUrl": "https://github.com/yourprofile"
  }
}
```

**messages/es.json**:

```json
{
  "Navigation": {
    "appName": "Votación de Imágenes IA",
    "home": "Inicio",
    "about": "Acerca de"
  },
  "About": {
    "pageTitle": "Acerca de - Votación de Imágenes IA",
    "metaDescription": "Conoce al creador de la Aplicación de Comparación de Modelos de Imágenes IA",
    "profileAlt": "Foto de perfil",
    "name": "Tu Nombre",
    "tagline": "Ingeniero de Software y Entusiasta de IA",
    "bioTitle": "Sobre Este Proyecto",
    "bioText": "Esta aplicación fue creada para proporcionar una plataforma imparcial para comparar imágenes generadas por IA de diferentes modelos. Al usar un algoritmo de equidad y anonimización completa de URL, aseguramos que los votos se basen puramente en la calidad de la imagen en lugar de la reputación del modelo.",
    "connectTitle": "Conéctate Conmigo",
    "linkedinUrl": "https://linkedin.com/in/yourprofile",
    "mediumUrl": "https://medium.com/@yourprofile",
    "githubUrl": "https://github.com/yourprofile"
  }
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Navigation persists across all pages

*For any* public page in the application, the navigation bar must be visible and functional.
**Validates: Requirements 1.1, 1.3**

### Property 2: Locale preservation in navigation

*For any* navigation link click, the resulting URL must maintain the current locale prefix.
**Validates: Requirements 2.4, 3.5**

### Property 3: Language switcher updates URL and content

*For any* language selection change, both the URL locale prefix and all visible translated text must update to match the selected language.
**Validates: Requirements 3.2, 3.3, 3.4**

### Property 4: About page displays all required elements

*For any* visit to the About page, the page must display a profile picture, bio text, and social media links.
**Validates: Requirements 4.2, 4.3, 4.4**

### Property 5: Social links open in new tabs

*For any* social media link click, the link must open in a new browser tab with appropriate security attributes.
**Validates: Requirements 4.5**

### Property 6: All navigation text is localized

*For any* locale setting, all navigation link text must be displayed in the corresponding language from translation files.
**Validates: Requirements 5.1, 5.2**

### Property 7: Translation fallback to English

*For any* missing translation key, the system must display the English translation as a fallback.
**Validates: Requirements 5.3**

### Property 8: Mobile touch targets are adequate

*For any* interactive element in the navigation on mobile viewports, the touch target must be at least 44x44 pixels.
**Validates: Requirements 6.2**

### Property 9: Responsive layout adapts without breaking

*For any* viewport size change, the navigation layout must adapt smoothly without overlapping or horizontal scrolling.
**Validates: Requirements 6.3, 6.5**

### Property 10: Navigation component is reusable

*For any* page requiring navigation, including the navigation component in the layout must provide consistent functionality.
**Validates: Requirements 7.1, 7.2**

## Error Handling

### Missing Profile Image

**Detection**: Image file not found at specified path

**Handling**: 
- Display placeholder avatar or initials
- Log warning to console
- Continue rendering page

**User Feedback**: Graceful degradation with placeholder

### Invalid Social Media URLs

**Detection**: Malformed URL in translation file

**Handling**:
- Validate URLs before rendering links
- Skip invalid links or show disabled state
- Log error to console

**User Feedback**: Link not displayed or shown as disabled

### Missing Translation Keys

**Detection**: Translation key not found in message file

**Handling**:
- Fall back to English translation
- If English also missing, display key name
- Log warning in development mode

**User Feedback**: English text displayed (or key name as last resort)

### Navigation Rendering Errors

**Detection**: Component throws error during render

**Handling**:
- Error boundary catches and logs error
- Display minimal fallback navigation
- Allow page content to render

**User Feedback**: Basic navigation or error message

## Testing Strategy

### Unit Testing

**Navigation Component**:
- Renders all navigation links correctly
- Applies correct href attributes with locale
- Displays translated text for current locale
- Applies glassmorphism styling classes

**About Page**:
- Renders profile image with correct src
- Displays all bio sections
- Renders social media links with target="_blank"
- Applies correct translation keys

**LanguageSwitcher**:
- Displays current locale as selected
- Calls router.replace with correct parameters
- Maintains pathname when switching locales

### Integration Testing

**Navigation Flow**:
- Click Home link → navigates to /[locale]
- Click About link → navigates to /[locale]/about
- Switch language → URL updates, text changes
- Navigation persists across page transitions

**About Page Flow**:
- Visit /en/about → displays English content
- Visit /es/about → displays Spanish content
- Click social link → opens in new tab
- Switch language on About page → stays on About page with new locale

### Property-Based Testing

**Property 1: Locale Preservation**:
```typescript
// Feature: navigation-about, Property 2: Locale preservation in navigation
fc.assert(
  fc.property(
    fc.constantFrom('en', 'es'),
    fc.constantFrom('/', '/about'),
    (locale, path) => {
      const result = buildNavigationUrl(path, locale);
      return result.startsWith(`/${locale}/`) || result === `/${locale}`;
    }
  ),
  { numRuns: 100 }
);
```

**Property 2: Translation Completeness**:
```typescript
// Feature: navigation-about, Property 6: All navigation text is localized
fc.assert(
  fc.property(
    fc.constantFrom('en', 'es'),
    (locale) => {
      const translations = getNavigationTranslations(locale);
      return (
        translations.appName !== undefined &&
        translations.home !== undefined &&
        translations.about !== undefined
      );
    }
  ),
  { numRuns: 100 }
);
```

### Responsive Testing

**Viewport Sizes**:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

**Test Cases**:
- Navigation fits within viewport width
- Touch targets meet 44x44px minimum
- Text remains readable at all sizes
- No horizontal scrolling occurs
- Glassmorphism effect renders correctly

### Accessibility Testing

**Keyboard Navigation**:
- Tab through all navigation links
- Enter key activates links
- Focus indicators visible

**Screen Reader**:
- Navigation landmark identified
- Link text is descriptive
- Image alt text provided

**Color Contrast**:
- Text meets WCAG AA standards
- Links have sufficient contrast
- Focus indicators are visible

## Implementation Notes

### Layout Integration

The Navigation component should be added to `app/[locale]/layout.tsx`:

```typescript
import { Navigation } from '@/components/Navigation';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body>
        <Navigation />
        <div className="pt-16"> {/* Offset for fixed navigation */}
          {children}
        </div>
      </body>
    </html>
  );
}
```

### Profile Image Setup

1. Add profile image to `public/images/profile.jpg`
2. Optimize image (recommended: 256x256px, < 50KB)
3. Ensure image is committed to repository
4. Update translation files with actual social media URLs

### Styling Considerations

**Glassmorphism Effect**:
- Requires `backdrop-blur` utility from Tailwind
- Works best with semi-transparent backgrounds
- May need fallback for older browsers

**Dark Mode**:
- All components support dark mode via Tailwind's `dark:` prefix
- Ensure sufficient contrast in both modes
- Test glassmorphism effect in dark mode

**Z-Index Management**:
- Navigation: `z-50`
- Modals/Overlays: `z-40` or lower
- Ensures navigation stays on top

