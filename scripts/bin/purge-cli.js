#!/usr/bin/env node

import { purgeUnusedCSS } from "../purge.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get directory names
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = process.cwd();

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  minify: false,
};

// Help text
const helpText = `
Nube System CSS Purger

This utility scans your project files for used CSS classes and removes unused ones
from the Nube System CSS files, significantly reducing your final bundle size.

Usage:
  npx nube-purge [options]

Options:
  --content <directory>   Directory to scan for content files (default: "src")
  --source <file>         Source CSS file to purge (default: "styles/system.css")
  --output <file>         Output file for purged CSS (default: "styles/system.purged.css")
  --minify                Also create a minified version of the purged CSS
  --help                  Show this help message

Examples:
  npx nube-purge --content src
  npx nube-purge --content src --output public/styles/system.min.css --minify
`;

// Parse arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--content" && args[i + 1]) {
    options.contentDir = args[i + 1];
    i++;
  } else if (args[i] === "--source" && args[i + 1]) {
    options.cssSource = args[i + 1];
    i++;
  } else if (args[i] === "--output" && args[i + 1]) {
    options.outputPath = args[i + 1];
    i++;
  } else if (args[i] === "--minify") {
    options.minify = true;
  } else if (args[i] === "--help" || args[i] === "-h") {
    console.log(helpText);
    process.exit(0);
  }
}

// Run the purge operation
console.log("🔥 Nube System CSS Purger");

// Verify that we're in a project with Nube System installed
if (!options.cssSource) {
  const defaultSource = path.join(projectRoot, "styles", "system.css");
  if (!fs.existsSync(defaultSource)) {
    console.error(
      `❌ Error: Nube System CSS file not found at ${defaultSource}`
    );
    console.log(
      "Make sure you are running this command from your project root or specify a custom source path with --source"
    );
    process.exit(1);
  }
}

// Run the purge process
purgeUnusedCSS(options)
  .then((result) => {
    if (result && result.success) {
      console.log("\n🎉 CSS purge completed successfully!");
      process.exit(0);
    } else {
      console.error("\n❌ CSS purge failed");
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error("❌ Unexpected error:", error);
    process.exit(1);
  });
