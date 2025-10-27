# Deep Linking Guide

This guide covers deep linking implementation, Universal Links (iOS), App Links (Android), and best practices for the React Native template.

## 🎯 Overview

Deep linking allows users to navigate directly to specific content within your app from external sources like web pages, emails, or other apps. This guide covers implementation using Expo Linking and platform-specific deep linking features.

## 🛠️ Tools and Technologies

### Core Tools

- **Expo Linking**: Cross-platform deep linking solution
- **Universal Links (iOS)**: Seamless iOS deep linking
- **App Links (Android)**: Seamless Android deep linking
- **URL Schemes**: Custom URL schemes for app-to-app communication

### Dependencies

```json
{
  "dependencies": {
    "expo-linking": "~8.0.8",
    "expo-constants": "~18.0.10"
  }
}
```

## 🚀 Basic Implementation

### 1. URL Scheme Configuration

#### App.json Configuration

```json
{
  "expo": {
    "scheme": "myapp",
    "web": {
      "bundler": "metro"
    },
    "ios": {
      "bundleIdentifier": "com.mycompany.myapp",
      "associatedDomains": ["applinks:myapp.com"]
    },
    "android": {
      "package": "com.mycompany.myapp",
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "myapp.com"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

#### URL Scheme Examples

```typescript
// Custom URL Scheme
myapp://profile/123
myapp://settings
myapp://task/456

// Universal/App Links
https://myapp.com/profile/123
https://myapp.com/settings
https://myapp.com/task/456
```

### 2. Basic Deep Link Handling

#### Expo Linking Setup

```typescript
// hooks/use-deep-linking.ts
import { useEffect } from 'react';
import * as Linking from 'expo-linking';

export const useDeepLinking = () => {
  useEffect(() => {
    // Handle initial URL when app is opened
    const handleInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink(initialUrl);
      }
    };

    // Handle URL when app is already running
    const handleURL = (event: { url: string }) => {
      handleDeepLink(event.url);
    };

    // Listen for URL events
    const subscription = Linking.addEventListener('url', handleURL);

    // Handle initial URL
    handleInitialURL();

    return () => {
      subscription?.remove();
    };
  }, []);

  const handleDeepLink = (url: string) => {
    // Parse and handle the deep link
    const parsedUrl = Linking.parse(url);
    console.log('Deep link received:', parsedUrl);

    // Navigate to appropriate screen
    navigateToScreen(parsedUrl);
  };

  const navigateToScreen = (parsedUrl: Linking.ParsedURL) => {
    const { hostname, path, queryParams } = parsedUrl;

    switch (hostname) {
      case 'profile':
        // Navigate to profile screen
        router.push(`/profile/${path}`);
        break;
      case 'settings':
        // Navigate to settings screen
        router.push('/settings');
        break;
      case 'task':
        // Navigate to task screen
        router.push(`/task/${path}`);
        break;
      default:
        // Navigate to home screen
        router.push('/');
    }
  };
};
```

#### Navigation Integration

```typescript
// app/_layout.tsx
import { useDeepLinking } from '@/hooks/use-deep-linking';

export default function RootLayout() {
  useDeepLinking();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="profile/[id]" options={{ title: 'Profile' }} />
      <Stack.Screen name="task/[id]" options={{ title: 'Task' }} />
    </Stack>
  );
}
```

## 🔗 Universal Links (iOS)

### 1. Apple App Site Association (AASA)

#### AASA File Structure

```json
// .well-known/apple-app-site-association
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.com.mycompany.myapp",
        "paths": ["/profile/*", "/settings", "/task/*"]
      }
    ]
  }
}
```

#### Server Configuration

```typescript
// Server setup for AASA file
// Place at: https://myapp.com/.well-known/apple-app-site-association
// Content-Type: application/json
// No file extension

const aasa = {
  applinks: {
    apps: [],
    details: [
      {
        appID: 'TEAMID.com.mycompany.myapp',
        paths: ['/profile/*', '/settings', '/task/*'],
      },
    ],
  },
};
```

### 2. iOS Configuration

#### App.json iOS Settings

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.mycompany.myapp",
      "associatedDomains": ["applinks:myapp.com"]
    }
  }
}
```

#### Info.plist Configuration

```xml
<!-- ios/MyApp/Info.plist -->
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>com.mycompany.myapp</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>myapp</string>
    </array>
  </dict>
</array>
```

## 🤖 App Links (Android)

### 1. Android Manifest Configuration

#### App.json Android Settings

```json
{
  "expo": {
    "android": {
      "package": "com.mycompany.myapp",
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "myapp.com"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

#### Digital Asset Links (DAL)

#### DAL File Structure

```json
// .well-known/assetlinks.json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.mycompany.myapp",
      "sha256_cert_fingerprints": ["SHA256_FINGERPRINT"]
    }
  }
]
```

#### Server Configuration

```typescript
// Server setup for DAL file
// Place at: https://myapp.com/.well-known/assetlinks.json
// Content-Type: application/json

const dal = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'com.mycompany.myapp',
      sha256_cert_fingerprints: ['SHA256_FINGERPRINT'],
    },
  },
];
```

## 🎯 Advanced Deep Linking

### 1. Dynamic Deep Link Generation

#### Link Generation Service

```typescript
// services/deep-link-service.ts
import * as Linking from 'expo-linking';

export class DeepLinkService {
  private static baseUrl = 'https://myapp.com';
  private static customScheme = 'myapp';

  static generateUniversalLink(path: string, params?: Record<string, string>): string {
    const url = new URL(path, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    return url.toString();
  }

  static generateCustomSchemeLink(path: string, params?: Record<string, string>): string {
    const url = `${this.customScheme}://${path}`;

    if (params) {
      const searchParams = new URLSearchParams(params);
      return `${url}?${searchParams.toString()}`;
    }

    return url;
  }

  static generateShareableLink(path: string, params?: Record<string, string>): string {
    // Prefer Universal Links for sharing
    return this.generateUniversalLink(path, params);
  }
}

// Usage examples
const profileLink = DeepLinkService.generateUniversalLink('profile/123');
const settingsLink = DeepLinkService.generateCustomSchemeLink('settings');
const taskLink = DeepLinkService.generateShareableLink('task/456', {
  source: 'email',
});
```

### 2. Deep Link Analytics

#### Analytics Integration

```typescript
// services/deep-link-analytics.ts
import { Analytics } from '@sentry/react-native';

export class DeepLinkAnalytics {
  static trackDeepLinkOpen(url: string, source: string) {
    Analytics.addBreadcrumb({
      message: 'Deep link opened',
      category: 'navigation',
      data: {
        url,
        source,
        timestamp: new Date().toISOString(),
      },
    });
  }

  static trackDeepLinkConversion(url: string, action: string) {
    Analytics.addBreadcrumb({
      message: 'Deep link conversion',
      category: 'conversion',
      data: {
        url,
        action,
        timestamp: new Date().toISOString(),
      },
    });
  }

  static trackDeepLinkError(url: string, error: string) {
    Analytics.addBreadcrumb({
      message: 'Deep link error',
      category: 'error',
      data: {
        url,
        error,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
```

### 3. Fallback Handling

#### Web Fallback

```typescript
// components/deep-link-fallback.tsx
import { View, Text, TouchableOpacity, Linking } from 'react-native';

interface DeepLinkFallbackProps {
  url: string;
  fallbackUrl: string;
}

export const DeepLinkFallback: React.FC<DeepLinkFallbackProps> = ({
  url,
  fallbackUrl,
}) => {
  const handleOpenApp = async () => {
    try {
      // Try to open the app
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        // Fallback to web
        await Linking.openURL(fallbackUrl);
      }
    } catch (error) {
      console.error('Failed to open deep link:', error);
      // Fallback to web
      await Linking.openURL(fallbackUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Open in App</Text>
      <Text style={styles.description}>
        Get the best experience by opening this content in our app.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleOpenApp}>
        <Text style={styles.buttonText}>Open App</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 🧪 Testing Deep Links

### 1. iOS Testing

#### Simulator Testing

```bash
# Test custom URL scheme
xcrun simctl openurl booted "myapp://profile/123"

# Test Universal Link
xcrun simctl openurl booted "https://myapp.com/profile/123"
```

#### Device Testing

```bash
# Test via Safari
# Open Safari and navigate to: https://myapp.com/profile/123

# Test via Notes app
# Create a note with the link and tap it
```

### 2. Android Testing

#### Emulator Testing

```bash
# Test custom URL scheme
adb shell am start -W -a android.intent.action.VIEW -d "myapp://profile/123" com.mycompany.myapp

# Test App Link
adb shell am start -W -a android.intent.action.VIEW -d "https://myapp.com/profile/123" com.mycompany.myapp
```

#### Device Testing

```bash
# Test via Chrome
# Open Chrome and navigate to: https://myapp.com/profile/123

# Test via ADB
adb shell am start -W -a android.intent.action.VIEW -d "https://myapp.com/profile/123"
```

### 3. Automated Testing

#### E2E Test Example

```javascript
// e2e/deep-linking.test.js
const { device, expect, element, by } = require('detox');

describe('Deep Linking', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should handle profile deep link', async () => {
    // Test custom URL scheme
    await device.openURL({ url: 'myapp://profile/123' });

    // Verify navigation to profile screen
    await expect(element(by.text('Profile'))).toBeVisible();
    await expect(element(by.text('User ID: 123'))).toBeVisible();
  });

  it('should handle settings deep link', async () => {
    // Test Universal Link
    await device.openURL({ url: 'https://myapp.com/settings' });

    // Verify navigation to settings screen
    await expect(element(by.text('Settings'))).toBeVisible();
  });
});
```

## 📊 Deep Link Analytics

### 1. Key Metrics

#### Engagement Metrics

```typescript
interface DeepLinkMetrics {
  // Link Performance
  totalClicks: number;
  uniqueClicks: number;
  clickThroughRate: number;

  // Conversion Metrics
  conversions: number;
  conversionRate: number;
  revenue: number;

  // User Behavior
  timeToAction: number;
  bounceRate: number;
  retentionRate: number;
}
```

#### Tracking Implementation

```typescript
// hooks/use-deep-link-analytics.ts
import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { DeepLinkAnalytics } from '@/services/deep-link-analytics';

export const useDeepLinkAnalytics = () => {
  useEffect(() => {
    const handleURL = (event: { url: string }) => {
      // Track deep link open
      DeepLinkAnalytics.trackDeepLinkOpen(event.url, 'app');

      // Track conversion if applicable
      if (event.url.includes('conversion')) {
        DeepLinkAnalytics.trackDeepLinkConversion(event.url, 'purchase');
      }
    };

    const subscription = Linking.addEventListener('url', handleURL);
    return () => subscription?.remove();
  }, []);
};
```

### 2. A/B Testing

#### Link Variation Testing

```typescript
// services/deep-link-ab-testing.ts
export class DeepLinkABTesting {
  static generateTestLink(basePath: string, variant: string): string {
    const params = new URLSearchParams({
      variant,
      test: 'true',
    });

    return `https://myapp.com/${basePath}?${params.toString()}`;
  }

  static trackVariantPerformance(variant: string, action: string) {
    // Track variant performance
    console.log(`Variant ${variant} - Action: ${action}`);
  }
}
```

## 🚨 Common Issues

### 1. Universal Links Not Working

**Problem**: Universal Links not opening the app

**Solutions**:

- Verify AASA file is accessible and valid
- Check associated domains configuration
- Ensure app is installed and associated
- Test with different devices and iOS versions

### 2. App Links Not Working

**Problem**: App Links not opening the app

**Solutions**:

- Verify DAL file is accessible and valid
- Check intent filters configuration
- Ensure app is installed and verified
- Test with different Android versions

### 3. Deep Link Navigation Issues

**Problem**: Deep links open app but don't navigate correctly

**Solutions**:

- Check URL parsing logic
- Verify navigation stack state
- Handle edge cases and errors
- Test with different URL formats

### 4. Fallback Handling

**Problem**: No fallback when app is not installed

**Solutions**:

- Implement web fallback
- Use smart app banners
- Provide app store links
- Handle errors gracefully

## 📈 Success Metrics

### Deep Link Performance

- **Click-through rate**: > 20%
- **Conversion rate**: > 15%
- **Error rate**: < 5%
- **User retention**: > 70%

### User Experience

- **Time to action**: < 3 seconds
- **Navigation success**: > 95%
- **User satisfaction**: > 4.5 stars
- **Support tickets**: < 1% of deep link usage

## 🎉 Best Practices

### Do's

- Use Universal Links and App Links for sharing
- Implement proper fallback handling
- Track deep link performance and analytics
- Test thoroughly across platforms and devices
- Handle errors gracefully
- Provide clear user feedback

### Don'ts

- Don't rely only on custom URL schemes
- Don't ignore fallback scenarios
- Don't forget to test on real devices
- Don't hardcode deep link logic
- Don't ignore analytics and performance
- Don't forget to handle edge cases

Remember: Deep linking is about creating seamless user experiences. Focus on making it easy for users to navigate to your app and find the content they're looking for.
