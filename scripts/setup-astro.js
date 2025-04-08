const fs = require("fs");
const path = require("path");

// Helper function to create directory if it doesn't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Helper function to copy a file
function copyFile(source, target) {
  try {
    ensureDirectoryExists(path.dirname(target));
    fs.copyFileSync(source, target);
    console.log(`✓ Created ${path.basename(target)}`);
  } catch (err) {
    console.error(`Error copying ${path.basename(source)}:`, err);
  }
}

// Create script file content
function createScriptContent(scriptType) {
  if (scriptType === "copy") {
    return `import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {
  try {
    // Define paths
    const projectRoot = process.cwd();
    const systemCssPath = path.join(projectRoot, "src", "nube-system", "styles", "system.css");
    const systemStylesPath = path.join(projectRoot, "src", "nube-system", "styles", "system-styles.css");

    // Read the system CSS file
    const systemCss = fs.readFileSync(systemCssPath, "utf8");

    // Create the header
    const header = \`/* 
This file is automatically generated from system.css
DO NOT EDIT DIRECTLY - Use the copy-css or purge-css scripts instead
Last copied: \${new Date().toISOString()}
Original size: \${systemCss.length} bytes
*/\`;

    // Write the file
    fs.writeFileSync(systemStylesPath, header + "\\n\\n" + systemCss);

    console.log("✅ Successfully copied system.css to system-styles.css");
    console.log("✨ Remember: variables.css is a separate file that contains your theme variables");
    console.log("📝 You can modify variables.css to customize your theme without affecting utilities");
  } catch (error) {
    console.error("❌ Error while copying CSS:", error);
    process.exit(1);
  }
}

// Run the main function
main();`;
  } else if (scriptType === "purge") {
    return `import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { globSync } from "glob";

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {
  try {
    // Define paths
    const projectRoot = process.cwd();
    const systemCssPath = path.join(
      projectRoot,
      "src",
      "nube-system",
      "styles",
      "system.css"
    );
    const systemStylesPath = path.join(
      projectRoot,
      "src",
      "nube-system",
      "styles",
      "system-styles.css"
    );

    // Read the system CSS file
    const systemCss = fs.readFileSync(systemCssPath, "utf8");

    // Get all project files
    const files = globSync("src/**/*.{astro,jsx,tsx,vue,svelte,html,js,ts}", {
      ignore: ["**/node_modules/**", "src/nube-system/**"],
    });

    // Read all project files
    const content = files
      .map((file) => fs.readFileSync(file, "utf8"))
      .join("\\n");

    // Extract all class names from content
    const usedClasses = new Set();
    const usedPrefixes = new Set();
    const usedSuffixes = new Set();

    // For tracking exact prefix_suffix combinations
    const usedPrefixSuffixCombos = new Set();

    // Match both class="..." and className="..." patterns
    const classRegex = /(?:class|className)=["']([^"']+)["']/g;
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      match[1].split(/\\s+/).forEach((className) => {
        if (className) {
          usedClasses.add(className);

          // If class contains underscore, add prefix and suffix to their respective sets
          if (className.includes("_")) {
            const [prefix, suffix] = className.split("_");
            usedPrefixes.add(prefix);
            usedSuffixes.add(suffix);
            usedPrefixSuffixCombos.add(\`\${prefix}_\${suffix}\`);
          }
        }
      });
    }

    console.log(\`Found \${usedClasses.size} unique class names in your project\`);
    console.log(
      \`Found \${usedPrefixes.size} prefixes and \${usedSuffixes.size} suffixes with \${usedPrefixSuffixCombos.size} unique combinations\`
    );

    // Better CSS parsing
    // First, keep comments, :root, and @-rules intact
    const cssAST = parseCss(systemCss);
    const purgedCss = filterCssRules(
      cssAST,
      usedClasses,
      usedPrefixes,
      usedSuffixes,
      usedPrefixSuffixCombos
    );

    // Minify the purged CSS
    const minifiedCss = minifyCss(purgedCss);

    // Create the header
    const header = \`/* 
This file is automatically generated from system.css
DO NOT EDIT DIRECTLY - Use the copy-css or purge-css scripts instead
Last purged: \${new Date().toISOString()}
Original size: \${systemCss.length} bytes
Purged size: \${minifiedCss.length} bytes
Reduction: \${Math.round((1 - minifiedCss.length / systemCss.length) * 100)}%
*/\`;

    // Write the minified purged CSS
    fs.writeFileSync(systemStylesPath, header + "\\n\\n" + minifiedCss);

    console.log(\`✅ Successfully purged and minified CSS saved to system-styles.css\`);
    console.log(
      \`📉 Reduced file size by \${Math.round(
        (1 - minifiedCss.length / systemCss.length) * 100
      )}%\`
    );
  } catch (error) {
    console.error("❌ Error while purging CSS:", error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Simple CSS parser function
function parseCss(css) {
  const result = [];
  let currentRule = "";
  let braceLevel = 0;
  let inComment = false;
  let commentText = "";

  // Process the CSS character by character
  for (let i = 0; i < css.length; i++) {
    const char = css[i];

    // Handle comments
    if (char === "/" && css[i + 1] === "*" && !inComment) {
      inComment = true;
      commentText = "/*";
      i++; // Skip next character
      continue;
    }

    if (char === "*" && css[i + 1] === "/" && inComment) {
      inComment = false;
      commentText += "*/";
      result.push({ type: "comment", content: commentText });
      commentText = "";
      i++; // Skip next character
      continue;
    }

    if (inComment) {
      commentText += char;
      continue;
    }

    // Build the current rule
    currentRule += char;

    // Track brace level for rule boundaries
    if (char === "{") {
      braceLevel++;
    } else if (char === "}") {
      braceLevel--;

      // When we've closed a top-level rule, add it to the result
      if (braceLevel === 0) {
        // Determine rule type
        const trimmed = currentRule.trim();

        if (trimmed.startsWith(":root")) {
          result.push({ type: "root", content: currentRule });
        } else if (trimmed.startsWith("@media")) {
          result.push({ type: "media", content: currentRule });
        } else {
          result.push({ type: "rule", content: currentRule });
        }

        currentRule = "";
      }
    }
  }

  return result;
}

// Filter CSS rules based on used classes
function filterCssRules(
  cssAST,
  usedClasses,
  usedPrefixes,
  usedSuffixes,
  usedPrefixSuffixCombos
) {
  let output = "";

  cssAST.forEach((node) => {
    // Always keep comments and :root
    if (node.type === "comment" || node.type === "root") {
      output += node.content;
    }
    // For media queries, parse their contents separately
    else if (node.type === "media") {
      const mediaMatch = node.content.match(/(@media[^{]+){(.*)}/s);
      if (mediaMatch) {
        const mediaQuery = mediaMatch[1];
        const mediaContent = mediaMatch[2];

        // Split media content into individual rules
        const mediaRules = [];
        let currentRule = "";
        let braceLevel = 0;

        for (let i = 0; i < mediaContent.length; i++) {
          const char = mediaContent[i];
          currentRule += char;

          if (char === "{") {
            braceLevel++;
          } else if (char === "}") {
            braceLevel--;

            if (braceLevel === 0) {
              mediaRules.push(currentRule);
              currentRule = "";
            }
          }
        }

        // Filter media rules
        const filteredMediaRules = mediaRules.filter((rule) => {
          // Extract selector from rule
          const selectorMatch = rule.match(/([^{]+){/);
          const selector = selectorMatch ? selectorMatch[1].trim() : "";

          // Keep rules that contain used classes, prefixes, or suffixes
          return shouldKeepSelector(
            selector,
            usedClasses,
            usedPrefixes,
            usedSuffixes,
            usedPrefixSuffixCombos
          );
        });

        // If we have filtered rules, rebuild the media query
        if (filteredMediaRules.length > 0) {
          output += \`\${mediaQuery}{\${filteredMediaRules.join("")}}\`;
        }
      }
    }
    // For normal rules
    else if (node.type === "rule") {
      const selectorMatch = node.content.match(/([^{]+){/);
      const selector = selectorMatch ? selectorMatch[1].trim() : "";

      // Check if any used class is in this selector
      if (
        shouldKeepSelector(
          selector,
          usedClasses,
          usedPrefixes,
          usedSuffixes,
          usedPrefixSuffixCombos
        )
      ) {
        output += node.content;
      }
    }
  });

  return output;
}

// Helper function to determine if a selector should be kept
function shouldKeepSelector(
  selector,
  usedClasses,
  usedPrefixes,
  usedSuffixes,
  usedPrefixSuffixCombos
) {
  // Direct class match with .className (like .f3, .mb4, etc.)
  if (selector.startsWith(".") && usedClasses.has(selector.substring(1))) {
    return true;
  }

  // Direct match for basic attribute selector [class*=className]
  if (selector.startsWith("[class*=") && selector.endsWith("]")) {
    const className = selector.substring(8, selector.length - 1);
    if (usedClasses.has(className)) {
      return true;
    }
  }

  // Handle combined selectors like [class*=clm][class*=md_4]
  if (selector.includes("[class*=") && selector.includes("][class*=")) {
    // Extract all class parts from the selector
    const classParts = [];
    const classRegex = /\\[class\\*=([^\\]]+)\\]/g;
    let match;

    while ((match = classRegex.exec(selector)) !== null) {
      classParts.push(match[1]);
    }

    // Special case for 'clm' - we want to keep it only if we use specific md_X combinations
    if (classParts.includes("clm")) {
      // Find the other part of the selector (the prefix_suffix part)
      const otherParts = classParts.filter((part) => part !== "clm");

      for (const part of otherParts) {
        // If it's a prefix like "md_", check if we use any classes with that prefix
        if (part.endsWith("_")) {
          const prefix = part.substring(0, part.length - 1);
          const comboFound = Array.from(usedPrefixSuffixCombos).some((combo) =>
            combo.startsWith(\`\${prefix}_\`)
          );

          if (comboFound) return true;
        }

        // If it's a plain number (suffix), check if we use any prefix_suffix with that suffix
        else if (/^\\d+$/.test(part)) {
          const comboFound = Array.from(usedPrefixSuffixCombos).some((combo) =>
            combo.endsWith(\`_\${part}\`)
          );

          if (comboFound) return true;
        }

        // If it's a full prefix_suffix, check if we use it
        else if (part.includes("_") && usedPrefixSuffixCombos.has(part)) {
          return true;
        }
      }

      // For [class*=clm] by itself, keep it if we use any 'clm' class
      if (
        classParts.length === 1 &&
        classParts[0] === "clm" &&
        Array.from(usedClasses).some(
          (cls) => cls === "clm" || cls.includes("clm")
        )
      ) {
        return true;
      }

      return false;
    }

    // For other combined selectors, we need all parts to match
    return classParts.every((part) => {
      // Direct match with a used class
      if (usedClasses.has(part)) return true;

      // Match against prefix_suffix combinations
      if (part.endsWith("_")) {
        // For cases like [class*=md_]
        const prefix = part.substring(0, part.length - 1);
        return Array.from(usedPrefixSuffixCombos).some((combo) =>
          combo.startsWith(\`\${prefix}_\`)
        );
      }

      // Match numeric suffixes (like [class*=4])
      if (/^\\d+$/.test(part)) {
        return Array.from(usedPrefixSuffixCombos).some((combo) =>
          combo.endsWith(\`_\${part}\`)
        );
      }

      return false;
    });
  }

  // For single attribute selectors like [class*=clm]
  if (selector.startsWith("[class*=") && selector.endsWith("]")) {
    const className = selector.substring(8, selector.length - 1);

    // If it's a full class name we use
    if (usedClasses.has(className)) return true;

    // If it's a key prefix like "clm" but we use something with "clm" in it
    const isUsedPrefix = Array.from(usedClasses).some(
      (cls) =>
        cls === className ||
        cls.startsWith(className) ||
        cls.endsWith(className)
    );

    if (isUsedPrefix) return true;

    return false;
  }

  // For complex selectors with combinators and multiple classes
  // Default to keeping simple selectors for classes we use
  return Array.from(usedClasses).some((className) =>
    selector.includes(\`.\${className}\`)
  );
}

// Simple CSS minifier function
function minifyCss(css) {
  return css
    // Remove comments (except the first one with license/info)
    .replace(/\\/\\*[\\s\\S]*?\\*\\//g, (match, offset) => {
      // Keep first comment with license/info
      return offset < 200 ? match : '';
    })
    // Remove whitespace around selectors, properties and values
    .replace(/\\s*{\\s*/g, '{')
    .replace(/\\s*}\\s*/g, '}')
    .replace(/\\s*:\\s*/g, ':')
    .replace(/\\s*;\\s*/g, ';')
    .replace(/\\s*,\\s*/g, ',')
    // Remove last semicolon in rule
    .replace(/;}/g, '}')
    // Remove extra whitespace and line breaks
    .replace(/[\\n\\r]+/g, '')
    .replace(/\\s{2,}/g, ' ')
    .trim();
}

// Run the main function
main();`;
  }
}

// Main setup function
function setupAstro() {
  // Get the path to the installed package
  const packagePath = path.resolve(__dirname, "..");

  // Try to find the Astro project root (looking for src directory)
  let projectRoot = process.cwd();
  while (projectRoot !== "/" && !fs.existsSync(path.join(projectRoot, "src"))) {
    projectRoot = path.dirname(projectRoot);
  }

  // If we found an Astro project
  if (fs.existsSync(path.join(projectRoot, "src"))) {
    // Create nube-system directory structure
    const nubeSystemDir = path.join(projectRoot, "src", "nube-system");
    const scriptsDir = path.join(nubeSystemDir, "scripts");
    const stylesDir = path.join(nubeSystemDir, "styles");

    // Ensure directories exist
    ensureDirectoryExists(scriptsDir);
    ensureDirectoryExists(stylesDir);

    // Copy the system.css file
    const systemSource = path.join(packagePath, "styles", "system.css");
    const systemTarget = path.join(stylesDir, "system.css");
    copyFile(systemSource, systemTarget);

    // Copy the variables.css file
    const variablesSource = path.join(packagePath, "styles", "variables.css");
    const variablesTarget = path.join(stylesDir, "variables.css");
    copyFile(variablesSource, variablesTarget);

    // Create initial system-styles.css (copy of system.css)
    const systemStylesTarget = path.join(stylesDir, "system-styles.css");
    copyFile(systemSource, systemStylesTarget);

    // Create script files
    fs.writeFileSync(
      path.join(scriptsDir, "copy-css.js"),
      createScriptContent("copy")
    );
    fs.writeFileSync(
      path.join(scriptsDir, "purge-css.js"),
      createScriptContent("purge")
    );

    // Copy documentation
    const docSource = path.join(packagePath, "DOCUMENTATION.md");
    const docTarget = path.join(nubeSystemDir, "system.doc.md");
    copyFile(docSource, docTarget);

    // Update package.json scripts if it exists
    const packageJsonPath = path.join(projectRoot, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts["copy-css"] =
        "node --experimental-modules src/nube-system/scripts/copy-css.js";
      packageJson.scripts["purge-css"] =
        "node --experimental-modules src/nube-system/scripts/purge-css.js";

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log("✓ Added scripts to package.json");
    }

    // Update or create astro.config.mjs to add the build hook
    const astroConfigPath = path.join(projectRoot, "astro.config.mjs");
    let configContent = "";
    let existingConfig = false;

    if (fs.existsSync(astroConfigPath)) {
      existingConfig = true;
      configContent = fs.readFileSync(astroConfigPath, "utf8");
    }

    // Create a hook integration file
    const hookFilePath = path.join(scriptsDir, "purge-hook.js");
    const hookContent = `
export function purgeCssHook() {
  return {
    name: 'nube-system-purge-hook',
    hooks: {
      'astro:build:start': async () => {
        console.log('🧹 Running PurgeCSS before build...');
        const { execSync } = await import('child_process');
        try {
          execSync('npm run purge-css', { stdio: 'inherit' });
          console.log('✅ CSS purged successfully!');
        } catch (error) {
          console.error('❌ Error running PurgeCSS:', error);
        }
      }
    }
  };
}
`;
    fs.writeFileSync(hookFilePath, hookContent);

    if (existingConfig) {
      // If config exists, update it to include our hook
      if (!configContent.includes("nube-system-purge-hook")) {
        // First, check if the purge-hook is already imported
        const hookImportRegex =
          /import\s+\{\s*purgeCssHook\s*\}\s+from\s+['"]\.\/src\/nube-system\/scripts\/purge-hook\.js['"]/;
        const hasHookImport = hookImportRegex.test(configContent);

        // Add import if not already there
        if (!hasHookImport) {
          const importInsertPoint = configContent.lastIndexOf("import");

          if (importInsertPoint !== -1) {
            // Find the end of the last import statement
            let importEndIndex = configContent.indexOf(";", importInsertPoint);
            if (importEndIndex === -1) {
              // No semicolon, try finding the end of line
              importEndIndex = configContent.indexOf("\n", importInsertPoint);
            }

            if (importEndIndex !== -1) {
              configContent =
                configContent.slice(0, importEndIndex + 1) +
                "\nimport { purgeCssHook } from './src/nube-system/scripts/purge-hook.js';" +
                configContent.slice(importEndIndex + 1);
            } else {
              // Fallback if import end can't be found
              configContent =
                "import { purgeCssHook } from './src/nube-system/scripts/purge-hook.js';\n" +
                configContent;
            }
          } else {
            // No imports found, add at the beginning
            configContent =
              "import { purgeCssHook } from './src/nube-system/scripts/purge-hook.js';\n" +
              configContent;
          }
        }

        // Now handle the integration insertion
        if (configContent.includes("integrations: [")) {
          // Already has an integrations array
          const integrationsRegex = /integrations\s*:\s*\[(.*?)\]/s;
          const match = configContent.match(integrationsRegex);

          if (match && !match[1].includes("purgeCssHook")) {
            // Only add if not already present
            const existingIntegrations = match[1].trim();
            const needsComma =
              existingIntegrations.length > 0 &&
              !existingIntegrations.endsWith(",");
            const updatedIntegrations =
              existingIntegrations +
              (needsComma ? ", " : "") +
              "purgeCssHook()";

            configContent = configContent.replace(
              integrationsRegex,
              `integrations: [${updatedIntegrations}]`
            );
          }
        } else if (configContent.includes("defineConfig({")) {
          // Has defineConfig but no integrations array
          const defineConfigRegex = /(defineConfig\s*\(\s*\{)(.*?)(\}\s*\))/s;
          const match = configContent.match(defineConfigRegex);

          if (match) {
            const configStart = match[1];
            const configContents = match[2];
            const configEnd = match[3];

            // Check if config content is empty or ends with a comma
            const needsComma =
              configContents.trim().length > 0 &&
              !configContents.trim().endsWith(",");

            configContent = configContent.replace(
              defineConfigRegex,
              `${configStart}${configContents}${
                needsComma ? ", " : ""
              }integrations: [purgeCssHook()]${configEnd}`
            );
          } else {
            // Fallback for simple defineConfig
            configContent = configContent.replace(
              /(defineConfig\s*\(\s*\{\s*)/,
              `$1integrations: [purgeCssHook()], `
            );
          }
        } else if (configContent.includes("export default {")) {
          // Has export default but no defineConfig
          const defaultExportRegex = /(export\s+default\s*\{)(.*?)(\})/s;
          const match = configContent.match(defaultExportRegex);

          if (match) {
            const exportStart = match[1];
            const exportContents = match[2];
            const exportEnd = match[3];

            // Check if export content is empty or ends with a comma
            const needsComma =
              exportContents.trim().length > 0 &&
              !exportContents.trim().endsWith(",");

            configContent = configContent.replace(
              defaultExportRegex,
              `${exportStart}${exportContents}${
                needsComma ? ", " : ""
              }integrations: [purgeCssHook()]${exportEnd}`
            );
          } else {
            // Fallback for simple export default
            configContent = configContent.replace(
              /(export\s+default\s*\{\s*)/,
              `$1integrations: [purgeCssHook()], `
            );
          }
        } else {
          // No existing config structure we can recognize, append a new one
          configContent += `\n\nexport default {
  integrations: [purgeCssHook()]
};\n`;
        }
      }
    } else {
      // Create a new config file
      configContent = `import { defineConfig } from 'astro/config';
import { purgeCssHook } from './src/nube-system/scripts/purge-hook.js';

export default defineConfig({
  integrations: [purgeCssHook()]
});
`;
    }

    // Final check to ensure no double comma syntax error after defineConfig({
    configContent = configContent.replace(
      /defineConfig\s*\(\s*\{\s*,/g,
      "defineConfig({"
    );

    // Final check to ensure no duplicate hooks
    configContent = configContent.replace(
      /\[purgeCssHook\(\)\s*,\s*purgeCssHook\(\)\]/g,
      "[purgeCssHook()]"
    );

    fs.writeFileSync(astroConfigPath, configContent);
    console.log("✓ Updated astro.config.mjs with build hook");

    // Create a README explaining the automation
    const readmePath = path.join(nubeSystemDir, "README.md");
    const readmeContent =
      "# Nube System Integration\n\n" +
      "## CSS Optimization\n\n" +
      "This project uses Nube System CSS framework with automatic CSS optimization during builds.\n\n" +
      "### How it works\n\n" +
      "- When you run `npm run build`, the CSS is automatically optimized through the Astro build hook\n" +
      "- This hook runs `purge-css` before Astro builds your site\n" +
      "- Only the CSS classes you actually use in your project will be included in the final build\n" +
      "- This significantly reduces your CSS file size\n\n" +
      "### Manual optimization\n\n" +
      "You can also manually optimize your CSS at any time:\n\n" +
      "- `npm run purge-css` - Removes unused classes and minifies system-styles.css\n" +
      "- `npm run copy-css` - Copies all utility classes to system-styles.css (use during development)\n\n" +
      "### Files\n\n" +
      "- `variables.css` - Theme variables (you can customize these)\n" +
      "- `system.css` - All utility classes (don't edit directly)\n" +
      "- `system-styles.css` - Optimized CSS for your project (automatically generated)";

    fs.writeFileSync(readmePath, readmeContent);

    console.log("\nNube System has been set up in your project!");
    console.log("\nDirectory structure created:");
    console.log("src/");
    console.log("└── nube-system/");
    console.log("    ├── scripts/");
    console.log("    │   ├── copy-css.js");
    console.log("    │   ├── purge-css.js");
    console.log("    │   └── purge-hook.js (Astro integration)");
    console.log("    └── styles/");
    console.log("        ├── variables.css (customizable theme variables)");
    console.log("        ├── system.css (all utility classes)");
    console.log(
      "        └── system-styles.css (optimized version for your project)"
    );

    console.log("\nQuick Start:");
    console.log("\n// In your main layout or entry point:");
    console.log(
      'import "../nube-system/styles/variables.css"; // Theme variables'
    );
    console.log(
      'import "../nube-system/styles/system-styles.css"; // Utility classes'
    );

    console.log("\nAvailable npm scripts:");
    console.log(
      "npm run copy-css  - Copy all utility classes to system-styles.css"
    );
    console.log(
      "npm run purge-css - Remove unused classes and minify system-styles.css"
    );
    console.log(
      "npm run build     - Will automatically run purge-css before building your Astro project"
    );

    console.log("\nAutomatic CSS Optimization:");
    console.log(
      "✓ Added Astro build hook to run purge-css automatically before builds"
    );
    console.log(
      "✓ See src/nube-system/README.md for details on CSS optimization"
    );

    console.log("\nCheck src/nube-system/system.doc.md for documentation.");
  }
}

// Run setup
setupAstro();
