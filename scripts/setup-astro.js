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
    const stylesDir = path.join(projectRoot, "src", "styles");

    // Ensure styles directory exists
    ensureDirectoryExists(stylesDir);

    // Copy the unified system.css file
    const systemSource = path.join(packagePath, "styles", "system.css");
    const systemTarget = path.join(stylesDir, "system.css");
    copyFile(systemSource, systemTarget);

    // Copy minified version if it exists
    const minifiedSource = path.join(packagePath, "styles", "system.min.css");
    if (fs.existsSync(minifiedSource)) {
      const minifiedTarget = path.join(stylesDir, "system.min.css");
      copyFile(minifiedSource, minifiedTarget);
    }

    // Copy documentation
    const docSource = path.join(packagePath, "DOCUMENTATION.md");
    const docTarget = path.join(projectRoot, "src", "styles", "system.doc.md");
    copyFile(docSource, docTarget);

    console.log("\nNube System has been set up in your project!");
    console.log("\nFiles created:");
    console.log("1. Complete System:");
    console.log("   - system.css (all utilities in one file)");
    console.log("   - system.min.css (minified version for production)");
    console.log("\n2. Documentation:");
    console.log("   - system.doc.md (in src/styles/)");

    console.log("\nQuick Start:");
    console.log("\n// In your main layout or entry point:");
    console.log('import "../styles/system.css"; // Development');
    console.log("// OR");
    console.log('import "../styles/system.min.css"; // Production');

    console.log(
      "\nCheck system.doc.md for detailed documentation and examples."
    );
  }
}

// Run setup
setupAstro();
