# react-clean-start

Minimal React project initializer. Creates a fresh Vite (or CRA) project and removes default boilerplate such as demo assets, test files, and reportWebVitals, leaving a minimal starter template.

## Usage

```bash
npx react-clean-start <project-name> [options]
```

## Options

| Flag | Description |
|------|-------------|
| `--cra` | Use Create React App instead of Vite (default: Vite) |
| `--ts` | Use TypeScript template |
| `--folders` | Add a standard `src/` folder structure |

## Examples

```bash
# Vite + JavaScript
npx react-clean-start my-app

# Vite + TypeScript
npx react-clean-start my-app --ts

# CRA + TypeScript + folders
npx react-clean-start my-app --cra --ts --folders
```

## What it does

- Clean `App` component (no demo UI)
- Clean entry file (`main.jsx` / `index.js`) without dead imports
- Deletes `App.css`, `index.css`, `logo.svg`, `setupTests`, `reportWebVitals.js/ts`
- Optionally creates `src/` folder structure with `components/`, `pages/`, `hooks/`, `services/`, `utils/`, `assets/`, `styles/`

## Requirements

- Node.js >= 18
- Internet connection (runs `create-vite` or `create-react-app` under the hood)

## License

MIT