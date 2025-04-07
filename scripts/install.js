import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    console.log(`✓ Copied ${path.basename(source)} to ${target}`);
  } catch (err) {
    console.error(`Error copying ${path.basename(source)}:`, err);
  }
}

// Main installation function
function installNubeSystem() {
  // Get the path to the installed package
  const packagePath = path.resolve(__dirname, "..");

  // Get the target project root (current directory where npm install was run)
  const projectRoot = process.cwd();

  console.log("\n📦 Installing Nube System files...");

  // Create src directory structure in the project
  const srcDir = path.join(projectRoot, "src");
  ensureDirectoryExists(srcDir);

  // Create styles directory in the project
  const stylesDir = path.join(projectRoot, "styles");
  ensureDirectoryExists(stylesDir);

  // Copy the source files directly to src directory
  // First, copy core files
  const srcCoreDir = path.join(srcDir, "core");
  ensureDirectoryExists(srcCoreDir);
  copyFile(
    path.join(packagePath, "src", "core", "_mixins.scss"),
    path.join(srcCoreDir, "_mixins.scss")
  );
  copyFile(
    path.join(packagePath, "src", "core", "_variables.scss"),
    path.join(srcCoreDir, "_variables.scss")
  );

  // Copy utilities directory
  const srcUtilitiesDir = path.join(srcDir, "utilities");
  ensureDirectoryExists(srcUtilitiesDir);

  // Get all utility files
  const utilityFiles = fs.readdirSync(
    path.join(packagePath, "src", "utilities")
  );
  utilityFiles.forEach((file) => {
    copyFile(
      path.join(packagePath, "src", "utilities", file),
      path.join(srcUtilitiesDir, file)
    );
  });

  // Copy main system.scss
  copyFile(
    path.join(packagePath, "src", "system.scss"),
    path.join(srcDir, "system.scss")
  );

  // Copy compiled CSS files to styles directory
  copyFile(
    path.join(packagePath, "styles", "system.css"),
    path.join(stylesDir, "system.css")
  );
  copyFile(
    path.join(packagePath, "styles", "system.min.css"),
    path.join(stylesDir, "system.min.css")
  );

  // Copy documentation files to the root
  copyFile(
    path.join(packagePath, "DOCUMENTATION.md"),
    path.join(projectRoot, "DOCUMENTATION.md")
  );
  copyFile(
    path.join(packagePath, "README.md"),
    path.join(projectRoot, "README.md")
  );

  console.log("\n✅ Nube System has been successfully installed!");
  console.log("\nDirectory Structure:");
  console.log(`- Source files: ${srcDir}`);
  console.log(`- Compiled CSS: ${stylesDir}`);

  console.log("\nQuick Start:");
  console.log("\n// In your main layout or entry point:");
  console.log('import "./styles/system.css"; // Development');
  console.log("// OR");
  console.log('import "./styles/system.min.css"; // Production');

  console.log("\nCustomization:");
  console.log("- All source SCSS files are in: src/");
  console.log("- Documentation: DOCUMENTATION.md");
}

// Run installation
installNubeSystem();
