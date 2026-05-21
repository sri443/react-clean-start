const { execSync } = require("child_process");

function createCRA(projectName, typescript) {
  const template = typescript
    ? "--template typescript"
    : "";

  execSync(
    `npx create-react-app ${projectName} ${template}`,
    {
      stdio: "inherit",
      shell: true,
    }
  );
}

module.exports = createCRA;