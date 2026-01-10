# Copilot Instructions

- **Scope**: PlayJS is a Vite/React playground at root; `packages/playjs-core` is the reusable TS/React editor+runner; `web/` is an Astro marketing site.
- **Commands**: Root `npm run dev|build|preview|test`; core `cd packages/playjs-core && npm run dev|build|test`; marketing `cd web && npm run dev|build|preview`.
- **Aliasing**: Vite resolves `@` to `src` (see [vite.config.js](../vite.config.js)).
- **State/persistence**: Code tabs live in zustand with `persist` storage key `playjs-storage` ([src/hooks/useCodeStore.js](../src/hooks/useCodeStore.js)); default snippet is a JS hello-world; split direction saved in `localStorage` under `split-direction`.
- **Hash-based sharing**: [src/App.jsx](../src/App.jsx) decodes `location.hash` via [src/core/encode.js](../src/core/encode.js) on load; every change re-encodes to base64 into the hash after a short timeout; Share falls back to clipboard when `navigator.share` is unavailable.
- **Embedding surface**: Root renders `PlayJS` with adjustable `code`, `language`, `theme`, `direction`, `width/height`, `ia` (toggles AI completions) props ([packages/playjs-core/src/components/PlayJS.tsx](../packages/playjs-core/src/components/PlayJS.tsx)).
- **AI completions**: Monaco completions are enabled only when `ia` is true; [packages/playjs-core/src/components/Code.tsx](../packages/playjs-core/src/components/Code.tsx) registers `monacopilot` completions against `https://good-spider-26.deno.dev/complete`, debouncing edits by 800ms.
- **Execution engine**: [packages/playjs-core/src/core/index.ts](../packages/playjs-core/src/core/index.ts) evaluates code line-by-line, transpiles TS via `ts.transpile`, and rewrites `import foo from 'pkg'` to dynamic imports from `https://cdn.skypack.dev/`. It intercepts `console.log` to collect per-line output and reloads the page once if imports were used to avoid stale bindings.
- **Output rendering**: `resolveHTML` stringifies objects/promises/functions and quotes strings; `Console` renders the computed result in a read-only Monaco editor ([packages/playjs-core/src/components/Console.tsx](../packages/playjs-core/src/components/Console.tsx)).
- **Editor/layout**: `Core` wraps `Code` + `Console` in `react-split` with configurable gutter sizing and direction; width/height props propagate through ([packages/playjs-core/src/components/Core.tsx](../packages/playjs-core/src/components/Core.tsx)). Editor options live in [packages/playjs-core/src/consts.ts](../packages/playjs-core/src/consts.ts).
- **Menu controls**: [src/components/Menu.jsx](../src/components/Menu.jsx) opens an overlay for upload/download (Ctrl+S triggers download), theme toggle, language toggle, report/GitHub links; download picks mime/extension based on language.
- **Tabs**: [src/components/Tabs.jsx](../src/components/Tabs.jsx) manages current tab selection and removal with undo toast; new-tab action is currently commented out.
- **URL/code encoding**: [src/core/encode.js](../src/core/encode.js) base64-encodes via `TextEncoder`/`TextDecoder`; `getHashFromURL` returns `false` when empty/malformed.
- **i18n**: `react-i18next` initialized in [src/translations/i18n.js](../src/translations/i18n.js) with English/Spanish JSON files; UI strings use `t('key')`.
- **Themes**: Theme values are `vs-dark` and `light`; background styling in PlayJS sets dark mode color when dark.
- **Tests**: Vitest suite in [packages/playjs-core/src/test/core.test.js](../packages/playjs-core/src/test/core.test.js) covers `getResult` behaviors; an import test is TODO/commented out.
- **Packaging**: `playjs-core` builds to `dist/index.es.js` + `dist/index.umd.js` and exports both; peer deps are `react`/`react-dom` (^17 or ^18).
- **Marketing site**: `web/` is an Astro starter; run its scripts from that folder. Changes there do not affect the playground runtime.
