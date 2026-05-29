const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs-extra");

const VITE_PACKAGE_JSON = (projectName, typescript) => JSON.stringify({
  name: projectName,
  private: true,
  version: "0.0.0",
  type: "module",
  scripts: {
    dev: "vite",
    build: typescript ? "tsc -b && vite build" : "vite build",
    preview: "vite preview",
  },
  dependencies: {
    react: "^18.3.1",
    "react-dom": "^18.3.1",
  },
  devDependencies: {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    ...(typescript && {
      typescript: "^5.5.3",
      "@typescript-eslint/eslint-plugin": "^8.3.0",
    }),
    vite: "^5.4.1",
  },
}, null, 2);

const VITE_CONFIG_JS = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`;

const VITE_CONFIG_JS_TAILWIND = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
`;

const INDEX_HTML = (projectName) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

const INDEX_HTML_TS = (projectName) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

const MAIN_JSX = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`;

const MAIN_TSX = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`;

const MAIN_JSX_TAILWIND = `import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`;

const MAIN_TSX_TAILWIND = `import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`;

const APP_JSX = `function App() {
  return (
    <div>
      <h1>App</h1>
    </div>
  )
}

export default App
`;

const APP_JSX_TAILWIND = `function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800">App</h1>
    </div>
  )
}

export default App
`;

const TSCONFIG = JSON.stringify({
  compilerOptions: {
    target: "ES2020",
    useDefineForClassFields: true,
    lib: ["ES2020", "DOM", "DOM.Iterable"],
    module: "ESNext",
    skipLibCheck: true,
    moduleResolution: "bundler",
    allowImportingTsExtensions: true,
    isolatedModules: true,
    moduleDetection: "force",
    noEmit: true,
    jsx: "react-jsx",
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
  },
  include: ["src"],
}, null, 2);

function createVite(projectName, typescript, tailwind) {
  const projectPath = path.join(process.cwd(), projectName);
  const ext = typescript ? "tsx" : "jsx";

  // Create project folder and src/
  fs.ensureDirSync(path.join(projectPath, "src"));
  fs.ensureDirSync(path.join(projectPath, "public"));

  // package.json
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    VITE_PACKAGE_JSON(projectName, typescript)
  );

  // vite.config
  fs.writeFileSync(
    path.join(projectPath, `vite.config.${typescript ? "ts" : "js"}`),
    tailwind ? VITE_CONFIG_JS_TAILWIND : VITE_CONFIG_JS
  );

  // index.html
  fs.writeFileSync(
    path.join(projectPath, "index.html"),
    typescript ? INDEX_HTML_TS(projectName) : INDEX_HTML(projectName)
  );

  // src/main — include index.css import when tailwind is active
  const mainContent = tailwind
    ? (typescript ? MAIN_TSX_TAILWIND : MAIN_JSX_TAILWIND)
    : (typescript ? MAIN_TSX : MAIN_JSX);

  fs.writeFileSync(path.join(projectPath, `src/main.${ext}`), mainContent);

  // src/App — use tailwind-styled template when active
  fs.writeFileSync(
    path.join(projectPath, `src/App.${ext}`),
    tailwind ? APP_JSX_TAILWIND : APP_JSX
  );

  // tsconfig if needed
  if (typescript) {
    fs.writeFileSync(
      path.join(projectPath, "tsconfig.json"),
      TSCONFIG
    );
  }

  // npm install
  execSync("npm install", {
    cwd: projectPath,
    stdio: "inherit",
    shell: true,
  });
}

module.exports = createVite;