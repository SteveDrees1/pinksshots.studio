import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname),
  test: {
    globals: true,
    include: ["src/**/*.test.ts"],
  },
});
