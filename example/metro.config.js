const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add these configurations
config.watchFolders = [
  ...config.watchFolders,
  path.resolve(__dirname, "../src"), // Path to your package source
];

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    "react-native-expo-kanban": path.resolve(__dirname, "../src"),
  },
  nodeModulesPaths: [
    path.resolve(__dirname, "node_modules"),
    path.resolve(__dirname, "../../node_modules"),
  ],
  disableHierarchicalLookup: true, // Important for linked packages
};

module.exports = config;
