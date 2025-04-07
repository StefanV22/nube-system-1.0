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
    return `const fs = require("fs");
const path = require("path");

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
  } catch (error) {
    console.error("❌ Error while copying CSS:", error);
    process.exit(1);
  }
}

// Run the main function
main();`;
  } else if (scriptType === "purge") {
    return `const fs = require("fs");
const path = require("path");
const glob = require("glob");

function main() {
  try {
    // Define paths
    const projectRoot = process.cwd();
    const systemCssPath = path.join(projectRoot, "src", "nube-system", "styles", "system.css");
    const systemStylesPath = path.join(projectRoot, "src", "nube-system", "styles", "system-styles.css");

    // Read the system CSS file
    const systemCss = fs.readFileSync(systemCssPath, "utf8");

    // Get all project files
    const files = glob.sync("src/**/*.{astro,jsx,tsx,vue,svelte}", {
      ignore: ["**/node_modules/**", "src/nube-system/**"]
    });

    // Read all project files
    const content = files.map(file => fs.readFileSync(file, "utf8")).join("\\n");

    // Extract all class names from content
    const usedClasses = new Set();
    const classRegex = /class=["']([^"']+)["']/g;
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      match[1].split(/\\s+/).forEach(className => usedClasses.add(className));
    }

    // Parse CSS and keep only used rules
    const purgedCss = [];
    const rules = systemCss.split("}");

    for (let rule of rules) {
      if (!rule.trim()) continue;

      // Keep all @media queries and root variables
      if (rule.includes("@media") || rule.includes(":root")) {
        purgedCss.push(rule + "}");
        continue;
      }

      // Check if any used class is in this rule
      const shouldKeep = Array.from(usedClasses).some(className =>
        rule.includes("." + className)
      );

      if (shouldKeep) {
        purgedCss.push(rule + "}");
      }
    }

    // Create the header
    const header = \`/* 
This file is automatically generated from system.css
DO NOT EDIT DIRECTLY - Use the copy-css or purge-css scripts instead
Last purged: \${new Date().toISOString()}
Original size: \${systemCss.length} bytes
Purged size: \${purgedCss.join("").length} bytes
Reduction: \${Math.round((1 - purgedCss.join("").length / systemCss.length) * 100)}%
*/\`;

    // Write the purged CSS
    fs.writeFileSync(systemStylesPath, header + "\\n\\n" + purgedCss.join("\\n"));

    console.log(\`✅ Successfully purged CSS and saved to system-styles.css\`);
    console.log(
      \`📉 Reduced file size by \${Math.round(
        (1 - purgedCss.join("").length / systemCss.length) * 100
      )}%\`
    );
  } catch (error) {
    console.error("❌ Error while purging CSS:", error);
    process.exit(1);
  }
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
        "node src/nube-system/scripts/copy-css.js";
      packageJson.scripts["purge-css"] =
        "node src/nube-system/scripts/purge-css.js";
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log("✓ Added scripts to package.json");
    }

    console.log("\nNube System has been set up in your project!");
    console.log("\nDirectory structure created:");
    console.log("src/");
    console.log("└── nube-system/");
    console.log("    ├── scripts/");
    console.log("    │   ├── copy-css.js");
    console.log("    │   └── purge-css.js");
    console.log("    └── styles/");
    console.log("        ├── system.css");
    console.log("        └── system-styles.css");

    console.log("\nQuick Start:");
    console.log("\n// In your main layout or entry point:");
    console.log('import "../nube-system/styles/system-styles.css";');

    console.log("\nAvailable npm scripts:");
    console.log(
      "npm run copy-css  - Copy all utility classes to system-styles.css"
    );
    console.log(
      "npm run purge-css - Remove unused classes from system-styles.css"
    );

    console.log("\nCheck src/nube-system/system.doc.md for documentation.");
  }
}

// Run setup
setupAstro();
