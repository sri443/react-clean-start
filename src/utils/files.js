const fs = require("fs-extra");
const path = require("path");

function removeFile(base, file) {
  const fullPath = path.join(base, file);

  if (fs.existsSync(fullPath)) {
    fs.removeSync(fullPath);
  }
}

function writeFile(base, file, content) {
  const fullPath = path.join(base, file);

  fs.outputFileSync(fullPath, content);
}

function createFolder(base, folder) {
  const fullPath = path.join(base, folder);

  fs.ensureDirSync(fullPath);
}

module.exports = {
  removeFile,
  writeFile,
  createFolder,
};