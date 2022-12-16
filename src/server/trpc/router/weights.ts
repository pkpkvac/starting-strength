import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const weightsRouter = router({
  getWeights: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  updateWeights: protectedProcedure
    .input(
      z.object({
        weights: z.object({
          squat: z.number(),
          bench: z.number(),
          deadlift: z.number(),
          press: z.number(),
          clean: z.number(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log("input");
      console.log(input);
      console.log("input");
      console.log("input");
      const { weights } = input;
      const { prisma } = ctx;

      if (!ctx.session.user) {
        throw new Error("Not authenticated");
      }

      try {
        const res = await prisma.weights.create({
          data: { userId: ctx.session.user.id, weights },
        });
        console.log("YYYYYY");
        console.log(res);
      } catch (err) {
        console.log("XXXXX");
        console.log(err);
      }

      return {
        weight: {
          weights: weights,
        },
      };
    }),
});
