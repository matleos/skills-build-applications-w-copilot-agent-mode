# OctoFit Tracker frontend

The presentation tier runs on Vite and reads the API host from
`VITE_CODESPACE_NAME`. In a Codespace, create `octofit-tracker/frontend/.env.local`
with the current Codespace name:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

This variable should be defined when using the Codespaces API. If it is unset,
the frontend safely falls back to `http://localhost:8000` for local development.

Start the frontend with:

```bash
npm run dev --prefix octofit-tracker/frontend
```

The API base URL is `https://${VITE_CODESPACE_NAME}-8000.app.github.dev` when
the variable is defined. Collection routes are available under `/api/users`,
`/api/teams`, `/api/activities`, `/api/leaderboard`, and `/api/workouts`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
