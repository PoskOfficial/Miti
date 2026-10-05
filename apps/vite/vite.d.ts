/// <reference types="vite/client" />
// NOTE: intentionally NOT vite-plugin-pwa/client. That entry pulls the `vue`
// package (PWA framework adapters) whose global jsx.d.ts hijacks the JSX
// namespace and breaks every React component typecheck (TS2786).
