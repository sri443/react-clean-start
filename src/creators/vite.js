const { execSync } = require("child_process");
const path = require("path");

function createVite(projectName, typescript) {
  const template = typescript
    ? "react-ts"
    : "react";

  execSync(
    `npx create-vite@latest ${projectName} --template ${template}`,
    {
      stdio: "inherit",
      shell: true,
    }
  );

  const projectPath = path.join(
    process.cwd(),
    projectName
  );

  execSync("npm install", {
    cwd: projectPath,
    stdio: "inherit",
    shell: true,
  });
}

module.exports = createVite;