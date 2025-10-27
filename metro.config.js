const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Bundle analysis and optimization
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    compress: {
      drop_console: true, // Remove console.log in production
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific functions
    },
    mangle: {
      keep_fnames: true, // Keep function names for better debugging
    },
  },
};

// Resolver configuration for better tree-shaking
config.resolver = {
  ...config.resolver,
  // Block unused dependencies
  blockList: [
    // Add patterns to block unused dependencies
    /node_modules\/.*\/tests?\/.*/,
    /node_modules\/.*\/test\/.*/,
    /node_modules\/.*\/__tests__\/.*/,
    /node_modules\/.*\/spec\/.*/,
    /node_modules\/.*\/\.storybook\/.*/,
    /node_modules\/.*\/stories\/.*/,
  ],
  // Enable tree-shaking
  unstable_enableSymlinks: true,
  unstable_enablePackageExports: true,
};

// Serializer configuration for better bundle splitting
config.serializer = {
  ...config.serializer,
  // Custom serializer for better code splitting
  customSerializer: (entryPoint, preModules, graph, options) => {
    // This would be implemented with a custom serializer
    // for better code splitting and lazy loading
    return config.serializer.customSerializer
      ? config.serializer.customSerializer(entryPoint, preModules, graph, options)
      : require('metro/src/DeltaBundler/Serializers/baseJSBundle')(
          entryPoint,
          preModules,
          graph,
          options,
        );
  },
};

// Transformer configuration for better performance
config.transformer = {
  ...config.transformer,
  // Enable Hermes optimizations
  hermesParser: true,
  // Enable minification
  minifierPath: require.resolve('metro-minify-terser'),
  minifierConfig: {
    ...config.transformer.minifierConfig,
    // Additional optimizations
    ecma: 8,
    warnings: false,
    parse: {
      ecma: 8,
    },
    compress: {
      ...config.transformer.minifierConfig.compress,
      ecma: 5,
      warnings: false,
      comparisons: false,
      inline: 2,
      // Remove unused code
      dead_code: true,
      // Remove unused variables
      unused: true,
      // Remove unreachable code
      conditionals: true,
      // Optimize boolean expressions
      booleans: true,
      // Optimize loops
      loops: true,
      // Optimize functions
      functions: true,
      // Optimize properties
      properties: true,
      // Optimize sequences
      sequences: true,
      // Optimize switches
      switches: true,
      // Optimize try-catch
      try_catch: true,
      // Optimize variables
      variables: true,
    },
    mangle: {
      ...config.transformer.minifierConfig.mangle,
      safari10: true,
    },
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
  },
};

// Server configuration for better development experience
config.server = {
  ...config.server,
  // Enable source maps for better debugging
  sourceMapUrl: true,
  // Enable hot reloading
  hot: true,
  // Enable live reloading
  liveReload: true,
};

// Watch configuration for better file watching
config.watchFolders = [
  ...config.watchFolders,
  // Add additional watch folders if needed
];

// Resolver configuration for better module resolution
config.resolver = {
  ...config.resolver,
  // Enable symlinks for better monorepo support
  unstable_enableSymlinks: true,
  // Enable package exports for better tree-shaking
  unstable_enablePackageExports: true,
  // Add additional resolver plugins if needed
  resolverMainFields: ['react-native', 'browser', 'main'],
  // Enable source maps
  sourceExts: [...config.resolver.sourceExts, 'map'],
};

module.exports = config;
