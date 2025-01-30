// import { existsSync, mkdirSync, readdirSync, copyFileSync } from "fs";
// import path from "path";

// const sourceDir = path.resolve(process.cwd(), "..", "data"); // Root-level ./data directory
// const targetDir = path.resolve(process.cwd(), "data"); // /app/server/data in Docker

// // Ensure target directory exists
// if (!existsSync(targetDir)) {
//   mkdirSync(targetDir, { recursive: true });
// }

// // Check if targetDir is empty
// if (readdirSync(targetDir).length === 0) {
//   console.log("Target data directory is empty. Copying files...");
//   const files = readdirSync(sourceDir);
//   files.forEach(file => {
//     copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
//   });
//   console.log("Data files copied successfully.");
// } else {
//   console.log("Target data directory is not empty. Skipping copy.");
// }

import { existsSync, mkdirSync, readdirSync, copyFileSync, rmSync, statSync } from "fs";
import path from "path";

// Function to delete contents of a directory without removing the directory itself
const clearDirectory = (dir: string) => {
  if (!existsSync(dir)) return;

  readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (statSync(fullPath).isDirectory()) {
      rmSync(fullPath, { recursive: true, force: true }); // Remove subdirectories
    } else {
      rmSync(fullPath, { force: true }); // Remove files
    }
  });
};

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

// Clear the directory instead of deleting it
console.log("Clearing existing data in target directory...");
clearDirectory(targetDir);

// Copy everything from source to target
console.log("Copying files and directories from source...");
copyRecursive(sourceDir, targetDir);

console.log("Data overwrite complete.");
