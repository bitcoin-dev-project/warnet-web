import { existsSync, mkdirSync, readdirSync, copyFileSync, statSync } from "fs";
import path from "path";

// Function to recursively copy directories
const copyRecursive = (src: string, dest: string) => {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath); // Recursive call for directories
    } else {
      copyFileSync(srcPath, destPath); // Copy files
    }
  });
};

// Define paths
const sourceDir = path.resolve(process.cwd(), "..", "data"); // Root-level ./data
const targetDir = path.resolve(process.cwd(), "data"); // /app/server/data in Docker

// Check if target directory is empty
if (!existsSync(targetDir) || readdirSync(targetDir).length === 0) {
  console.log("Target directory is empty. Proceeding with data copy...");
  
  // Ensure target directory exists
  mkdirSync(targetDir, { recursive: true });

  // Copy everything from source to target
  copyRecursive(sourceDir, targetDir);
  console.log("Data setup complete.");
} else {
  console.log("Target directory is not empty. Skipping data copy.");
}
