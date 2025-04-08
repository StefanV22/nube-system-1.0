/**
 * Nube System - A modern, utility-first CSS framework
 *
 * This index file provides export paths for the CSS files.
 */

module.exports = {
  // Main CSS files
  css: "./styles/system.css",
  variables: "./styles/variables.css",

  // The optimized (purged) version is created by the setup script
  // in the user's project at src/nube-system/styles/system-styles.css

  // Relative paths for imports
  paths: {
    styles: "./styles",
    variables: "./styles/variables.css",
    system: "./styles/system.css",
  },
};
