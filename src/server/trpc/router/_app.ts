import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { weightsRouter } from "./weights";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  weights: weightsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
