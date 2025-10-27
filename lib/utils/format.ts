// Date formatting utilities
export const formatDate = {
  // Format date to readable string
  readable: (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  // Format date to short string (MM/DD/YYYY)
  short: (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US');
  },

  // Format date to ISO string
  iso: (date: Date | string): string => {
    return new Date(date).toISOString();
  },

  // Format date to relative time (e.g., "2 hours ago")
  relative: (date: Date | string): string => {
    const now = new Date();
    const d = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return formatDate.readable(date);
  },
};

// Number formatting utilities
export const formatNumber = {
  // Format number with commas
  withCommas: (num: number): string => {
    return num.toLocaleString();
  },

  // Format currency
  currency: (amount: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  },

  // Format percentage
  percentage: (value: number, decimals = 1): string => {
    return `${(value * 100).toFixed(decimals)}%`;
  },

  // Format file size
  fileSize: (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  },
};

// String formatting utilities
export const formatString = {
  // Capitalize first letter
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  // Capitalize each word
  capitalizeWords: (str: string): string => {
    return str.replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },

  // Truncate string with ellipsis
  truncate: (str: string, length: number): string => {
    if (str.length <= length) return str;
    return `${str.substring(0, length)  }...`;
  },

  // Remove extra whitespace
  clean: (str: string): string => {
    return str.replace(/\s+/g, ' ').trim();
  },

  // Convert to slug
  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
};

// Phone number formatting
export const formatPhone = {
  // Format US phone number
  us: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phone;
  },

  // Extract digits only
  digits: (phone: string): string => {
    return phone.replace(/\D/g, '');
  },
};

// Time formatting utilities
export const formatTime = {
  // Format time to 12-hour format
  twelveHour: (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  },

  // Format time to 24-hour format
  twentyFourHour: (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  },

  // Format duration in seconds to readable format
  duration: (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  },
};
