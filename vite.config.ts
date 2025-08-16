import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "@rollup/plugin-commonjs";
import type { SentryReactRouterBuildOptions } from "@sentry/react-router";
import { sentryReactRouter } from "@sentry/react-router";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "m-tayyab",
  project: "travel-agency",
  // An auth token is required for uploading source maps;
  // store it in an environment variable to keep it secure.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // ...
};

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     reactRouter(),
//     tsconfigPaths(),
//     commonjs({
//       requireReturnsDefault: "auto", // Allows default + named exports from CommonJS
//     }),
//   ],
//   ssr: {
//     noExternal: [/^@syncfusion/], // Regex matches ALL Syncfusion packages
//   },
//   optimizeDeps: {
//     include: ["@syncfusion/ej2-react-navigations", "@syncfusion/ej2-react-buttons"], // Add any specific ones if needed
//   },
// });


export default defineConfig(config => {
  return {
  plugins: [ tailwindcss(),
    tsconfigPaths(),
    commonjs({
      requireReturnsDefault: "auto", // Allows default + named exports from CommonJS
    }),
    reactRouter(),
    sentryReactRouter(sentryConfig, config)],
     ssr: {
    noExternal: [/^@syncfusion/], // Regex matches ALL Syncfusion packages
  },
  optimizeDeps: {
    include: ["@syncfusion/ej2-react-navigations", "@syncfusion/ej2-react-buttons"], // Add any specific ones if needed
  },
  };
});