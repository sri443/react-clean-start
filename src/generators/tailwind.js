const { execSync } = require("child_process");
const { writeFile } = require("../utils/files");

// Tailwind v4: PostCSS plugin for CRA (webpack-based)
const POSTCSS_CONFIG_CRA = `module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
`;

// Tailwind v4: single CSS import replaces the three @tailwind directives
const INDEX_CSS = `@import "tailwindcss";
`;

function generateTailwind(projectPath, typescript, cra) {
  if (cra) {
    // CRA uses PostCSS — write the postcss config
    writeFile(projectPath, "postcss.config.js", POSTCSS_CONFIG_CRA);
  }
  // Vite uses @tailwindcss/vite plugin (wired into vite.config) — no postcss config needed

  writeFile(projectPath, "src/index.css", INDEX_CSS);

  const deps = cra
    ? "tailwindcss @tailwindcss/postcss"
    : "tailwindcss @tailwindcss/vite";

  execSync(`npm install -D ${deps}`, {
    cwd: projectPath,
    stdio: "inherit",
    shell: true,
  });
}

module.exports = generateTailwind;
