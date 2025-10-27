import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys enum for type safety
export enum StorageKeys {
  USER_TOKEN = 'user_token',
  USER_PREFERENCES = 'user_preferences',
  THEME_MODE = 'theme_mode',
  ONBOARDING_COMPLETED = 'onboarding_completed',
}

// Generic storage service
export class StorageService {
  // Get item from storage
  static async getItem<T = string>(key: StorageKeys): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  }

  // Set item in storage
  static async setItem<T = any>(key: StorageKeys, value: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
      return false;
    }
  }

  // Remove item from storage
  static async removeItem(key: StorageKeys): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
      return false;
    }
  }

  // Clear all storage
  static async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  // Get multiple items
  static async getMultiple(keys: StorageKeys[]): Promise<Record<string, any>> {
    try {
      const items = await AsyncStorage.multiGet(keys);
      const result: Record<string, any> = {};

      items.forEach(([key, value]) => {
        result[key] = value ? JSON.parse(value) : null;
      });

      return result;
    } catch (error) {
      console.error('Error getting multiple items:', error);
      return {};
    }
  }

  // Set multiple items
  static async setMultiple(items: Record<StorageKeys, any>): Promise<boolean> {
    try {
      const entries = Object.entries(items).map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);

      await AsyncStorage.multiSet(entries);
      return true;
    } catch (error) {
      console.error('Error setting multiple items:', error);
      return false;
    }
  }
}

// Convenience functions for common operations
export const storage = {
  // User authentication
  getToken: () => StorageService.getItem<string>(StorageKeys.USER_TOKEN),
  setToken: (token: string) => StorageService.setItem(StorageKeys.USER_TOKEN, token),
  removeToken: () => StorageService.removeItem(StorageKeys.USER_TOKEN),

  // User preferences
  getPreferences: () => StorageService.getItem(StorageKeys.USER_PREFERENCES),
  setPreferences: (preferences: any) =>
    StorageService.setItem(StorageKeys.USER_PREFERENCES, preferences),

  // Theme
  getThemeMode: () => StorageService.getItem<'light' | 'dark'>(StorageKeys.THEME_MODE),
  setThemeMode: (mode: 'light' | 'dark') =>
    StorageService.setItem(StorageKeys.THEME_MODE, mode),

  // Onboarding
  isOnboardingCompleted: () =>
    StorageService.getItem<boolean>(StorageKeys.ONBOARDING_COMPLETED),
  setOnboardingCompleted: (completed: boolean) =>
    StorageService.setItem(StorageKeys.ONBOARDING_COMPLETED, completed),
};
