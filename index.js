/**
 * Nube System - A modern, utility-first CSS framework
 *
 * This index file provides export paths for the CSS files.
 */

module.exports = {
  // Primary stylesheet exports
  system: "./styles/system.css",
  setup: "./styles/setup.css",
  purged: "./styles/system-styles.css",

  // Legacy exports for backward compatibility
  styles: {
    system: "./styles/system.css",
    setup: "./styles/setup.css",
    purged: "./styles/system-styles.css",
  },

  // Main CSS files
  css: "./styles/system.css",
  variables: "./styles/setup.css",

  // The optimized (purged) version is created by the setup script
  // in the user's project at src/nube-system/styles/system-styles.css

  // Relative paths for imports
  paths: {
    styles: "./styles",
    variables: "./styles/setup.css",
    system: "./styles/system.css",
  },
};
