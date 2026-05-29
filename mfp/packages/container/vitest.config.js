import { defineConfig } from "vitest/config";

export default defineConfig({
  oxc: {
    include: [/src\/.*\.js$/, /\.[jt]sx$/],
    exclude: /node_modules/,
    lang: "jsx",
    jsx: {
      runtime: "classic",
      pragma: "React.createElement",
      pragmaFrag: "React.Fragment",
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    globals: true,
  },
});
