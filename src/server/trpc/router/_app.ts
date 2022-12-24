import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { weightsRouter } from "./weights";
import { userWorkoutsRouter } from "./userWorkouts";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  weights: weightsRouter,
  userWorkouts: userWorkoutsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
