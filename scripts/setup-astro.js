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

    // Define our CSS modules
    const modules = {
      variables: "variables.css",
      flex: "flex.css",
      layout: "layout.css",
      spacing: "spacing.css",
      typography: "typography.css",
    };

    // Copy each module
    Object.entries(modules).forEach(([name, filename]) => {
      const source = path.join(packagePath, "styles", filename);
      const target = path.join(stylesDir, filename);
      copyFile(source, target);
    });

    // Copy documentation
    const docSource = path.join(packagePath, "DOCUMENTATION.md");
    const docTarget = path.join(projectRoot, "src", "styles", "system.doc.md");
    copyFile(docSource, docTarget);

    console.log("\nNube System has been set up in your project!");
    console.log("\nFiles created:");
    console.log("1. Style Modules (in src/styles/):");
    Object.values(modules).forEach((filename) => {
      console.log(`   - ${filename}`);
    });
    console.log("2. Documentation:");
    console.log("   - system.doc.md (in src/styles/)");

    console.log("\nTo use the system, import the modules you need:");
    console.log("\n// In your main layout or entry point:");
    console.log('import "../styles/variables.css"; // Required');
    console.log(
      'import "../styles/flex.css";      // Optional - Flexbox utilities'
    );
    console.log(
      'import "../styles/layout.css";    // Optional - Layout utilities'
    );
    console.log(
      'import "../styles/spacing.css";   // Optional - Spacing utilities'
    );
    console.log(
      'import "../styles/typography.css"; // Optional - Typography & theme'
    );

    console.log(
      "\nCheck system.doc.md for detailed documentation and examples."
    );
  }
}

// Run setup
setupAstro();
