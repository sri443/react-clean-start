#!/usr/bin/env node

const { program } = require("commander");
const run = require("../src");

program
  .name("react-clean-start")
  .description("Minimal React project initializer")
  .argument(
    "<project-name>",
    "Name of the React project"
  )
  .option(
    "--cra",
    "Use Create React App instead of Vite"
  )
  .option(
    "--ts",
    "Use TypeScript template"
  )
  .option(
    "--folders",
    "Generate recommended folder structure"
  )
  .option(
    "--tailwind",
    "Set up Tailwind CSS"
  )
  .parse();

const projectName = program.args[0];
const options = program.opts();

run(projectName, options);