const path = require("path");
const ora = require("ora");
const fs = require("fs-extra");
const validate = require("validate-npm-package-name");

const createCRA = require("./creators/cra");
const createVite = require("./creators/vite");

const cleanCRA = require("./cleaners/cra");

const generateFolders = require("./generators/folders");

const { success, info, error } = require("./utils/logger");

async function run(projectName, options) {
  const spinner = ora();

  try {
    // Validate project name
    const validation = validate(projectName);

    if (!validation.validForNewPackages) {
      error("Invalid project name — must be lowercase with no spaces. Try: my-app");
      validation.errors?.forEach((e) => error(e));
      process.exit(1);
    }

    // Check if folder already exists
    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
      error(`Folder "${projectName}" already exists`);
      process.exit(1);
    }

    const useCRA = options.cra;
    const typescript = options.ts;

    info(`Using ${useCRA ? "Create React App" : "Vite"}`);

    // Create project
    spinner.start("Scaffolding project...");
    try {
      if (useCRA) {
        createCRA(projectName, typescript);
      } else {
        spinner.stop(); // npm install output needs to show
        createVite(projectName, typescript);
      }
    } catch (e) {
      spinner.stop();
      error(`Scaffolding failed: ${e.message}`);
      error("Make sure you have Node.js >= 18 and an active internet connection.");
      process.exit(1);
    }

    // Verify creation succeeded
    if (!fs.existsSync(projectPath)) {
      error("Project folder was not created — scaffolding may have failed silently.");
      process.exit(1);
    }

    // CRA needs cleanup — Vite is already scaffolded clean
    if (useCRA) {
      spinner.start("Cleaning starter files...");
      cleanCRA(projectPath, typescript);
      spinner.stop();
      success("Starter boilerplate removed");
    }

    // Generate folders
    if (options.folders) {
      generateFolders(projectPath);
      success("Folder structure generated");
    }

    success("Done!");
    console.log(`\n  cd ${projectName}`);
    console.log(`  npm run ${useCRA ? "start" : "dev"}\n`);

  } catch (err) {
    spinner.stop();
    error(err.message);
    process.exit(1);
  }
}

module.exports = run;