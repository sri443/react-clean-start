const { createFolder, writeFile } = require("../utils/files");

function generateFolders(projectPath) {
  const folders = [
    "src/components",
    "src/pages",
    "src/hooks",
    "src/services",
    "src/utils",
    "src/assets",
    "src/styles",
  ];

  folders.forEach((folder) => {
    createFolder(projectPath, folder);
    writeFile(projectPath, `${folder}/.gitkeep`, "");
  });
}

module.exports = generateFolders;