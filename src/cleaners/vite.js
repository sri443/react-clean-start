const { removeFile, writeFile } = require("../utils/files");

function cleanVite(projectPath, typescript) {
  const ext = typescript ? "tsx" : "jsx";

  writeFile(
    projectPath,
    `src/App.${ext}`,
`function App() {
  return (
    <div>
      <h1>App</h1>
    </div>
  );
}

export default App;
`
  );

  writeFile(
    projectPath,
    `src/main.${ext}`,
typescript
? `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
  );

  [
    "src/App.css",
    "src/index.css",
    "src/assets/react.svg",
    "public/vite.svg",
  ].forEach((file) => {
    removeFile(projectPath, file);
  });
}

module.exports = cleanVite;