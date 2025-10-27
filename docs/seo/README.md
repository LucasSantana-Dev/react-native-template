# SEO & App Store Optimization (ASO) Guide

This guide covers Search Engine Optimization (SEO) for web builds and App Store
Optimization (ASO) for mobile app stores. While React Native apps are primarily
mobile-focused, understanding SEO principles is crucial for web builds and
marketing strategies.

## 🌐 Web SEO (Expo Web)

### 1. Meta Tags and Head Configuration

#### Basic Meta Tags

```typescript
// app/_layout.tsx or app/index.tsx
import { Head } from 'expo-router/head';

export default function RootLayout() {
  return (
    <>
      <Head>
        <title>Your App Name - Best Mobile App</title>
        <meta name="description" content="Your app description for search engines" />
        <meta name="keywords" content="mobile app, react native, your keywords" />
        <meta name="author" content="Your Company" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Your App Name" />
        <meta property="og:description" content="Your app description" />
        <meta property="og:image" content="https://yourapp.com/og-image.jpg" />
        <meta property="og:url" content="https://yourapp.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your App Name" />
        <meta name="twitter:description" content="Your app description" />
        <meta name="twitter:image" content="https://yourapp.com/twitter-image.jpg" />
      </Head>
      {/* Your app content */}
    </>
  );
}
```

#### Dynamic Meta Tags

```typescript
// For dynamic content pages
import { useLocalSearchParams } from 'expo-router';

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const product = getProductById(id);

  return (
    <>
      <Head>
        <title>{product?.name} - Your App</title>
        <meta name="description" content={product?.description} />
        <meta property="og:title" content={product?.name} />
        <meta property="og:description" content={product?.description} />
        <meta property="og:image" content={product?.image} />
      </Head>
      {/* Product content */}
    </>
  );
}
```

### 2. Structured Data (JSON-LD)

```typescript
// app/_layout.tsx
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Your App Name",
  "description": "Your app description",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "1000"
  }
};

export default function RootLayout() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      {/* Your app content */}
    </>
  );
}
```

### 3. Performance Optimization

#### Image Optimization

```typescript
// Use optimized images with proper alt text
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://yourapp.com/image.jpg' }}
  alt="Descriptive alt text for SEO"
  style={{ width: 300, height: 200 }}
  contentFit="cover"
  priority // For above-the-fold images
/>
```

#### Lazy Loading

```typescript
// Implement lazy loading for images and components
import { LazyView } from 'expo-lazy';

<LazyView>
  <ExpensiveComponent />
</LazyView>
```

### 4. URL Structure and Routing

```typescript
// app.json - Configure clean URLs
{
  "expo": {
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/favicon.png"
    }
  }
}

// Use clean, descriptive URLs
// Good: /products/mobile-apps
// Bad: /p/123?cat=mobile
```

## 📱 App Store Optimization (ASO)

### 1. App Store Listing Optimization

#### App Title

- **Primary Keyword**: Include your main keyword in the title
- **Character Limit**: 30 characters (iOS), 50 characters (Android)
- **Example**: "TaskMaster - Productivity App"

#### Subtitle/Short Description

- **iOS**: 30 characters, appears under the title
- **Android**: 80 characters, appears in search results
- **Example**: "Organize tasks efficiently"

#### Description

```markdown
# App Store Description Template

## Key Features

• Feature 1 with benefit • Feature 2 with benefit • Feature 3 with benefit

## Why Choose Our App?

- Unique selling proposition
- Competitive advantage
- User benefits

## What's New

- Latest updates and improvements
- Bug fixes
- New features

## Privacy & Security

- Data protection information
- Privacy policy link
- Security measures

## Support

- Contact information
- Help center link
- Community support
```

### 2. Keywords Strategy

#### iOS App Store

- **100 characters total**
- **No spaces after commas**
- **No duplicate words**
- **Example**: "productivity,tasks,organizer,planner,reminder,notes"

#### Google Play Store

- **4000 characters total**
- **Natural language**
- **Include variations**
- **Example**: "productivity app task manager organizer planner reminder notes
  to do list"

### 3. Visual Assets

#### App Icon

- **iOS**: 1024x1024px, no transparency
- **Android**: 512x512px, adaptive icon support
- **Design**: Simple, recognizable, unique

#### Screenshots

- **iOS**: 6.7", 6.5", 5.5" display sizes
- **Android**: Phone, 7" tablet, 10" tablet
- **Content**: Show key features, user interface, benefits

#### App Preview Videos

- **Duration**: 15-30 seconds
- **Content**: Demonstrate core functionality
- **Quality**: High resolution, smooth playback

### 4. Localization

```typescript
// app.json - Configure multiple languages
{
  "expo": {
    "locales": {
      "en": "./locales/en.json",
      "es": "./locales/es.json",
      "fr": "./locales/fr.json"
    }
  }
}

// locales/en.json
{
  "app": {
    "name": "TaskMaster",
    "description": "Organize your tasks efficiently",
    "keywords": "productivity,tasks,organizer"
  }
}
```

## 🔍 Technical SEO

### 1. Sitemap Generation

```typescript
// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

const generateSitemap = () => {
  const pages = [
    { url: '/', priority: 1.0 },
    { url: '/about', priority: 0.8 },
    { url: '/features', priority: 0.8 },
    { url: '/download', priority: 0.9 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      page => `
    <url>
      <loc>https://yourapp.com${page.url}</loc>
      <priority>${page.priority}</priority>
      <changefreq>weekly</changefreq>
    </url>
  `,
    )
    .join('')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
};

generateSitemap();
```

### 2. Robots.txt

```txt
# public/robots.txt
User-agent: *
Allow: /

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Sitemap location
Sitemap: https://yourapp.com/sitemap.xml
```

### 3. Analytics and Tracking

```typescript
// lib/analytics.ts
import { Analytics } from 'expo-analytics';

const analytics = new Analytics('YOUR_ANALYTICS_ID');

export const trackEvent = (eventName: string, parameters?: object) => {
  analytics.event(eventName, parameters);
};

export const trackScreen = (screenName: string) => {
  analytics.screen(screenName);
};

// Usage in components
import { trackEvent, trackScreen } from '@/lib/analytics';

useEffect(() => {
  trackScreen('HomeScreen');
}, []);

const handleButtonPress = () => {
  trackEvent('button_pressed', { button_name: 'download' });
  // Button logic
};
```

## 📊 Monitoring and Analytics

### 1. Google Analytics 4

```typescript
// lib/analytics.ts
import { Analytics } from 'expo-analytics';

const analytics = new Analytics('GA4_MEASUREMENT_ID');

export const trackConversion = (conversionId: string, value?: number) => {
  analytics.event('conversion', {
    conversion_id: conversionId,
    value: value,
  });
};
```

### 2. App Store Connect Analytics

- **App Analytics**: Track downloads, sales, and usage
- **Search Ads**: Monitor keyword performance
- **App Store Optimization**: Track ranking changes

### 3. SEO Monitoring Tools

- **Google Search Console**: Monitor search performance
- **PageSpeed Insights**: Check Core Web Vitals
- **Lighthouse**: Audit web performance and SEO

## 🚀 Best Practices Summary

### Web SEO

1. **Fast Loading**: Optimize images, use lazy loading
2. **Mobile-First**: Responsive design, touch-friendly
3. **Clean URLs**: Descriptive, keyword-rich paths
4. **Meta Tags**: Complete and accurate
5. **Structured Data**: Help search engines understand content

### ASO

1. **Keyword Research**: Use tools like App Store Connect, Sensor Tower
2. **A/B Testing**: Test different titles, descriptions, screenshots
3. **Regular Updates**: Keep app fresh with new features
4. **User Reviews**: Encourage positive reviews, respond to feedback
5. **Competitor Analysis**: Monitor competitor strategies

### General

1. **Performance**: Fast loading times improve rankings
2. **User Experience**: Good UX leads to better engagement
3. **Content Quality**: Valuable, original content
4. **Technical Health**: Fix bugs, ensure stability
5. **Monitoring**: Track metrics and adjust strategies

Remember: SEO and ASO are long-term strategies. Consistent effort and monitoring
are key to success.
