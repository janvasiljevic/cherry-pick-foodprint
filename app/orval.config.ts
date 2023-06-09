import { defineConfig } from "orval";

export default defineConfig({
  on: {
    input: "./../spec/schema.json",
    output: {
      target: "./api/index.ts",
      schemas: "./api/model",
      mode: "tags-split",
      client: "react-query",
      override: {
        mutator: {
          path: "./api/mutator/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});
