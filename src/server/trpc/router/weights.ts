import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const weightsRouter = router({
  getWeights: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    if (!ctx.session.user) {
      throw new Error("Not authenticated");
    }

    try {
      const res = await prisma.weights.findFirst({
        where: { userId: ctx.session.user.id },
      });

      return {
        success: true,
        payload: res,
      };
    } catch (e) {
      return {
        error: "event not found",
        status: 404,
      };
    }
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
        const res = await prisma.weights.upsert({
          where: { userId: ctx.session.user.id },
          update: { weights },
          create: { userId: ctx.session.user.id, weights },
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
