const fs = require("fs");
const path = require("path");

// Function to copy file
function copyFile(source, target) {
  try {
    // Create target directory if it doesn't exist
    const targetDir = path.dirname(target);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy the file
    fs.copyFileSync(source, target);
    console.log(`✓ Created ${target}`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("Note: Not an Astro project, skipping file setup");
    } else {
      console.error(`Error copying file: ${err.message}`);
    }
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

    // Source files
    const variablesSource = path.join(packagePath, "styles", "variables.css");
    const classesSource = path.join(
      packagePath,
      "styles",
      "global-classes.css"
    );

    // Target files
    const variablesTarget = path.join(stylesDir, "variables.css");
    const classesTarget = path.join(stylesDir, "global-classes.css");

    // Copy files
    copyFile(variablesSource, variablesTarget);
    copyFile(classesSource, classesTarget);

    console.log("\nNube System files have been set up in your Astro project!");
    console.log("\nMake sure to import these files in your project:");
    console.log("\n1. In your main layout or entry point:");
    console.log('import "../styles/variables.css";');
    console.log('import "../styles/global-classes.css";\n');
  }
}

// Run setup
setupAstro();
