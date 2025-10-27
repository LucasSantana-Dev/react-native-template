# Web SEO Guide

This guide covers web SEO optimization for Expo web builds, including meta tags, Open Graph, Twitter cards, and performance optimization.

## 🎯 Overview

When using Expo web, your React Native app can be built for the web, making it discoverable through search engines. This guide covers SEO optimization strategies specifically for Expo web builds.

## 🛠️ Tools and Technologies

### Core Tools

- **Expo Web**: Web version of your React Native app
- **Metro Bundler**: Web bundling and optimization
- **React Helmet**: Dynamic meta tag management
- **Lighthouse**: Performance and SEO auditing

### Dependencies

```json
{
  "dependencies": {
    "expo-web": "~0.21.0",
    "react-helmet": "^6.1.0",
    "react-helmet-async": "^1.3.0"
  }
}
```

## 🚀 Basic SEO Setup

### 1. App.json Configuration

#### Web Configuration

```json
{
  "expo": {
    "web": {
      "bundler": "metro",
      "output": "static",
      "name": "MyApp - Task Manager & Productivity",
      "shortName": "MyApp",
      "description": "Ultimate task management and productivity app",
      "startUrl": "/",
      "display": "standalone",
      "orientation": "portrait",
      "themeColor": "#000000",
      "backgroundColor": "#ffffff",
      "lang": "en",
      "dir": "ltr"
    }
  }
}
```

#### Meta Tags Configuration

```json
{
  "expo": {
    "web": {
      "meta": {
        "viewport": "width=device-width, initial-scale=1.0",
        "theme-color": "#000000",
        "description": "Ultimate task management and productivity app",
        "keywords": "task manager, productivity, organization, goals, tracking",
        "author": "MyCompany",
        "robots": "index, follow",
        "og:title": "MyApp - Task Manager & Productivity",
        "og:description": "Ultimate task management and productivity app",
        "og:image": "https://myapp.com/og-image.png",
        "og:url": "https://myapp.com",
        "og:type": "website",
        "og:site_name": "MyApp",
        "twitter:card": "summary_large_image",
        "twitter:title": "MyApp - Task Manager & Productivity",
        "twitter:description": "Ultimate task management and productivity app",
        "twitter:image": "https://myapp.com/twitter-image.png"
      }
    }
  }
}
```

### 2. Dynamic Meta Tags

#### React Helmet Setup

```typescript
// components/seo-head.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'MyApp - Task Manager & Productivity',
  description = 'Ultimate task management and productivity app',
  image = 'https://myapp.com/og-image.png',
  url = 'https://myapp.com',
  type = 'website',
  keywords = 'task manager, productivity, organization, goals, tracking',
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="MyCompany" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="MyApp" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="MyApp" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
```

#### Usage in Components

```typescript
// app/(tabs)/index.tsx
import { SEOHead } from '@/components/seo-head';

export default function HomeScreen() {
  return (
    <>
      <SEOHead
        title="MyApp - Task Manager & Productivity"
        description="Organize your tasks, boost productivity, and achieve your goals with MyApp"
        url="https://myapp.com"
      />
      <View style={styles.container}>
        {/* Home screen content */}
      </View>
    </>
  );
}
```

## 🔍 Advanced SEO Features

### 1. Structured Data

#### JSON-LD Implementation

```typescript
// components/structured-data.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'WebApplication' | 'SoftwareApplication' | 'Organization';
  data: Record<string, any>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// Usage example
const AppStructuredData = () => (
  <StructuredData
    type="WebApplication"
    data={{
      name: 'MyApp - Task Manager & Productivity',
      description: 'Ultimate task management and productivity app',
      url: 'https://myapp.com',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web, iOS, Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '1250',
      },
    }}
  />
);
```

### 2. Sitemap Generation

#### Dynamic Sitemap

```typescript
// utils/sitemap-generator.ts
export class SitemapGenerator {
  private static baseUrl = 'https://myapp.com';
  private static routes = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/profile', priority: 0.8, changefreq: 'weekly' },
    { path: '/settings', priority: 0.6, changefreq: 'monthly' },
    { path: '/tasks', priority: 0.9, changefreq: 'daily' },
  ];

  static generateSitemap(): string {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${this.routes
  .map(
    (route) => `  <url>
    <loc>${this.baseUrl}${route.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return sitemap;
  }
}
```

#### Sitemap Route

```typescript
// app/sitemap.xml.tsx
import { SitemapGenerator } from '@/utils/sitemap-generator';

export default function Sitemap() {
  const sitemap = SitemapGenerator.generateSitemap();

  return (
    <div>
      <pre>{sitemap}</pre>
    </div>
  );
}
```

### 3. Robots.txt

#### Robots.txt Configuration

```typescript
// app/robots.txt.tsx
export default function Robots() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://myapp.com/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Allow important pages
Allow: /profile/
Allow: /tasks/
Allow: /settings/`;

  return (
    <div>
      <pre>{robots}</pre>
    </div>
  );
}
```

## ⚡ Performance Optimization

### 1. Core Web Vitals

#### Performance Monitoring

```typescript
// hooks/use-web-vitals.ts
import { useEffect } from 'react';

export const useWebVitals = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          console.log('CLS:', entry.value);
        }
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    return () => observer.disconnect();
  }, []);
};
```

#### Performance Optimization

```typescript
// app/_layout.tsx
import { useWebVitals } from '@/hooks/use-web-vitals';

export default function RootLayout() {
  useWebVitals();

  return (
    <html>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/images/hero.jpg" as="image" />

        {/* Critical CSS */}
        <style>{`
          body { margin: 0; font-family: system-ui, sans-serif; }
          .loading { display: flex; justify-content: center; align-items: center; height: 100vh; }
        `}</style>
      </head>
      <body>
        <div id="root">
          {/* App content */}
        </div>
      </body>
    </html>
  );
}
```

### 2. Image Optimization

#### Responsive Images

```typescript
// components/optimized-image.tsx
import React from 'react';
import { Image, ImageProps } from 'react-native';

interface OptimizedImageProps extends ImageProps {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  loading = 'lazy',
  ...props
}) => {
  return (
    <picture>
      <source
        media="(min-width: 768px)"
        srcSet={`${src}?w=1200&h=630&fit=crop 1200w, ${src}?w=800&h=420&fit=crop 800w`}
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <source
        media="(min-width: 480px)"
        srcSet={`${src}?w=800&h=420&fit=crop 800w, ${src}?w=600&h=315&fit=crop 600w`}
        sizes="(min-width: 480px) 50vw, 100vw"
      />
      <Image
        src={`${src}?w=600&h=315&fit=crop`}
        alt={alt}
        loading={loading}
        {...props}
      />
    </picture>
  );
};
```

### 3. Code Splitting

#### Lazy Loading

```typescript
// components/lazy-component.tsx
import React, { Suspense, lazy } from 'react';
import { View, Text } from 'react-native';

const LazyComponent = lazy(() => import('./heavy-component'));

export const LazyWrapper: React.FC = () => {
  return (
    <Suspense fallback={<View><Text>Loading...</Text></View>}>
      <LazyComponent />
    </Suspense>
  );
};
```

## 📊 SEO Analytics

### 1. Google Analytics

#### Analytics Setup

```typescript
// utils/analytics.ts
export class Analytics {
  private static gtag: any;

  static init(measurementId: string) {
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    this.gtag = function (...args: any[]) {
      window.dataLayer.push(args);
    };
    this.gtag('js', new Date());
    this.gtag('config', measurementId);
  }

  static trackPageView(pagePath: string, pageTitle: string) {
    this.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }

  static trackEvent(eventName: string, parameters: Record<string, any>) {
    this.gtag('event', eventName, parameters);
  }
}
```

### 2. Search Console

#### Search Console Integration

```typescript
// utils/search-console.ts
export class SearchConsole {
  static verifySite(verificationCode: string) {
    const meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.content = verificationCode;
    document.head.appendChild(meta);
  }

  static trackSearchPerformance() {
    // Track search performance metrics
    console.log('Search Console integration active');
  }
}
```

## 🧪 SEO Testing

### 1. Lighthouse Testing

#### Lighthouse Configuration

```json
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      url: ['https://myapp.com'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

#### Automated Testing

```bash
# Run Lighthouse tests
npm run lighthouse

# Run with specific configuration
npx lighthouse https://myapp.com --config-path=lighthouse.config.js
```

### 2. SEO Auditing

#### SEO Audit Tools

```typescript
// utils/seo-audit.ts
export class SEOAudit {
  static checkMetaTags() {
    const title = document.querySelector('title')?.textContent;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');

    return {
      hasTitle: !!title,
      hasDescription: !!description,
      hasOgTitle: !!ogTitle,
      titleLength: title?.length || 0,
      descriptionLength: description?.length || 0,
    };
  }

  static checkPerformance() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    return {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
    };
  }
}
```

## 🚨 Common Issues

### 1. Meta Tags Not Updating

**Problem**: Meta tags not updating dynamically

**Solution**: Use React Helmet and ensure proper hydration

```typescript
// Ensure proper hydration
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <SEOHead title="Dynamic Title" />
    </HelmetProvider>
  );
}
```

### 2. Performance Issues

**Problem**: Slow page load times

**Solution**: Optimize images, enable compression, and use code splitting

```typescript
// Enable compression in app.json
{
  "expo": {
    "web": {
      "bundler": "metro",
      "output": "static",
      "compress": true
    }
  }
}
```

### 3. Crawling Issues

**Problem**: Search engines not crawling the site

**Solution**: Ensure proper robots.txt and sitemap

```typescript
// Check robots.txt accessibility
const robotsUrl = 'https://myapp.com/robots.txt';
fetch(robotsUrl).then((response) => {
  if (!response.ok) {
    console.error('Robots.txt not accessible');
  }
});
```

## 📈 Success Metrics

### SEO Performance

- **Page load speed**: < 3 seconds
- **Core Web Vitals**: All metrics in green
- **Mobile usability**: 100% mobile-friendly
- **Search ranking**: Top 10 for target keywords

### User Experience

- **Bounce rate**: < 40%
- **Time on page**: > 2 minutes
- **Conversion rate**: > 5%
- **User satisfaction**: > 4.5 stars

## 🎉 Best Practices

### Do's

- Use descriptive, keyword-rich titles and descriptions
- Implement structured data for rich snippets
- Optimize images and use responsive design
- Monitor Core Web Vitals and performance
- Test with real users and search engines
- Keep content fresh and updated regularly

### Don'ts

- Don't keyword stuff or use duplicate content
- Don't ignore mobile optimization
- Don't forget to test across different devices
- Don't neglect performance optimization
- Don't ignore analytics and user feedback
- Don't forget to update meta tags regularly

Remember: Web SEO is about making your app discoverable and accessible to users through search engines. Focus on providing value, optimizing performance, and creating great user experiences.
