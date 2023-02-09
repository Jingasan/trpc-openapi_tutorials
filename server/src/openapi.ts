import { generateOpenApiDocument } from "trpc-openapi";
import { appRouter } from "./router";

// OpenAPIによるAPI仕様書の作成
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "TODO App API",
  description: "本書は、TODOアプリのAPI仕様書である。",
  version: "1.0.0",
  baseUrl: "http://localhost:3000/trpc",
  tags: ["todo"],
});
