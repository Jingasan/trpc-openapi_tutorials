import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { createOpenApiExpressMiddleware } from "trpc-openapi";
import { openApiDocument } from "./openapi";
import { appRouter } from "./router";
const app: Express = express();
const PORT = 3000;
app.use(cors());

// tRPC APIのルーティング
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

// OpenAPI仕様書ページのルーティング
app.use("/openapi", createOpenApiExpressMiddleware({ router: appRouter }));
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(openApiDocument));

// サーバーを起動する処理
app.listen(PORT, () => console.log("listening on port " + PORT));
