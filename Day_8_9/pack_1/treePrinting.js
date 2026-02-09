import fs from "fs";
import path from "path";

function getDirectoryTree(dirPath, prefix = "", isLast = true) {
  try {
    const files = fs.readdirSync(dirPath);
    
    files.forEach((file, index) => {
      const filePath = path.join(dirPath, file);
      const isLastFile = index === files.length - 1;
      
      const connector = isLastFile ? "└── " : "├── ";
      const nextPrefix = prefix + (isLastFile ? "    " : "│   ");
      
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        console.log(prefix + connector + file + "/");
        getDirectoryTree(filePath, nextPrefix, isLastFile);
      } else {
        console.log(prefix + connector + file);
      }
    });
  } catch (error) {
    console.error(`Error reading directory: ${error.message}`);
  }
}

function printDirectoryTree(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory not found: ${dirPath}`);
    return;
  }
  
  const stats = fs.statSync(dirPath);
  if (!stats.isDirectory()) {
    console.error(`Path is not a directory: ${dirPath}`);
    return;
  }
  
  console.log(path.basename(dirPath) + "/");
  getDirectoryTree(dirPath);
}

const targetDir = process.argv[2] || ".";
printDirectoryTree(targetDir);
