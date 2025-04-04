import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PurgeCSS } from "purgecss";
import glob from "glob";

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Purges unused CSS from the system.css file based on content in .astro files
 * @param {Object} options - Configuration options
 * @param {string} options.contentDir - Directory to scan for content files (.astro, .jsx, etc.)
 * @param {string} options.cssSource - Source CSS file to purge from
 * @param {string} options.outputPath - Where to save the purged CSS
 * @param {Array<string>} options.contentExtensions - File extensions to scan (defaults to .astro)
 * @param {boolean} options.minify - Whether to minify the output
 */
export async function purgeUnusedCSS(options = {}) {
  const {
    contentDir = "src",
    cssSource,
    outputPath,
    contentExtensions = [
      ".astro",
      ".jsx",
      ".js",
      ".ts",
      ".tsx",
      ".vue",
      ".svelte",
      ".html",
    ],
    minify = false,
  } = options;

  const projectRoot = process.cwd();

  // Set default paths based on the package installation location
  const defaultCssSource = path.join(projectRoot, "styles", "system.css");
  const defaultOutputPath = path.join(
    projectRoot,
    "styles",
    "system.purged.css"
  );

  // Use provided paths or defaults
  const sourceCss = cssSource || defaultCssSource;
  const outputFile = outputPath || defaultOutputPath;

  console.log("📦 Purging unused CSS from Nube System...");
  console.log(`Scanning content in: ${contentDir}`);
  console.log(`Source CSS: ${sourceCss}`);

  try {
    // Make sure source CSS exists
    if (!fs.existsSync(sourceCss)) {
      console.error(`❌ Source CSS file not found: ${sourceCss}`);
      return;
    }

    // Build content paths for PurgeCSS
    const contentPaths = contentExtensions.map((ext) =>
      path.join(projectRoot, contentDir, `**/*${ext}`)
    );

    // Run PurgeCSS
    const result = await new PurgeCSS().purge({
      content: contentPaths,
      css: [sourceCss],
      safelist: {
        standard: ["body", "html"],
        greedy: [/^is-/, /^has-/, /^data-/],
      },
      // Ensure all pseudo-classes and pseudo-elements are preserved
      defaultExtractor: (content) => {
        // This custom extractor helps preserve complex selectors
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
        const innerMatches =
          content.match(/[^<>"'`\s.()]*:[^<>"'`\s.()]*[^<>"'`\s:]/g) || [];
        return [...broadMatches, ...innerMatches];
      },
    });

    if (!result || !result[0] || !result[0].css) {
      throw new Error("PurgeCSS returned an empty result");
    }

    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write purged CSS to file
    fs.writeFileSync(outputFile, result[0].css);

    // If minify is requested, create a minified version
    if (minify) {
      const minifiedOutput = outputFile.replace(".css", ".min.css");
      const CleanCSS = (await import("clean-css")).default;
      const cleanCSS = new CleanCSS({ level: 2 });
      const minified = cleanCSS.minify(result[0].css);
      fs.writeFileSync(minifiedOutput, minified.styles);
      console.log(`✅ Minified CSS saved to: ${minifiedOutput}`);
    }

    console.log(`✅ Purged CSS saved to: ${outputFile}`);

    // Calculate size reduction
    const originalSize = fs.statSync(sourceCss).size;
    const purgedSize = fs.statSync(outputFile).size;
    const reduction = (
      ((originalSize - purgedSize) / originalSize) *
      100
    ).toFixed(2);

    console.log("\nSize Reduction:");
    console.log(`Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`Purged: ${(purgedSize / 1024).toFixed(2)} KB`);
    console.log(`Reduction: ${reduction}%`);

    return {
      success: true,
      sourcePath: sourceCss,
      outputPath: outputFile,
      originalSize,
      purgedSize,
      reduction,
    };
  } catch (error) {
    console.error("❌ Error purging CSS:", error);
    return { success: false, error };
  }
}

// CLI execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options = {};

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
    }
  }

  purgeUnusedCSS(options).then((result) => {
    if (result && result.success) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  });
}

export default purgeUnusedCSS;
