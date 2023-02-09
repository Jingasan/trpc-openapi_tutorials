import trpc, { initTRPC } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";
import { z } from "zod";

// データ型の定義
interface Todo {
  id: number;
  name: string;
}
const todoObject = z.object({
  id: z.number(),
  name: z.string(),
});
// TODOリスト
const todoList: Todo[] = [];
// TODOリストのID番号
let id = 1;

// tRPC APIの定義
const t = initTRPC.meta<OpenApiMeta>().create();
export const appRouter = t.router({
  todolist: t.procedure
    .meta({ openapi: { method: "GET", path: "/todolist", tags: ["todo"] } })
    .input(z.void())
    .output(z.array(todoObject))
    .query(async () => {
      return todoList;
    }),
  addtodo: t.procedure
    .meta({ openapi: { method: "POST", path: "/addtodo", tags: ["todo"] } })
    .input(
      z.object({
        name: z.string(),
      })
    )
    .output(todoObject)
    .mutation(async ({ input }) => {
      for (const todo of todoList) {
        if (todo.name === input.name) {
          return todo;
        }
      }
      const todo: Todo = { id: id++, name: input.name };
      todoList.push(todo);
      return todo;
    }),
  deletetodo: t.procedure
    .meta({
      openapi: { method: "POST", path: "/deletetodo", tags: ["todo"] },
    })
    .input(
      z.object({
        id: z.number(),
      })
    )
    .output(z.nullable(todoObject))
    .mutation(async ({ input }) => {
      for (let i = 0; i < todoList.length; i++) {
        const todo = todoList[i];
        if (todo.id === input.id) {
          todoList.splice(i, 1);
          return todo;
        }
      }
      return null;
    }),
});

// クライアントサイドへのAPI型定義の公開
export type AppRouter = typeof appRouter;
