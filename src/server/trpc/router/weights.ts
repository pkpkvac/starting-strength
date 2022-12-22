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
          squat: z.number().optional(),
          bench: z.number().optional(),
          deadlift: z.number().optional(),
          press: z.number().optional(),
          clean: z.number().optional(),
          row: z.number().optional(),
          curl: z.number().optional(),
          tricep: z.number().optional(),
          incline: z.number().optional(),
          chinup: z.number().optional(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let { weights } = input;
      const { prisma } = ctx;

      if (!ctx.session.user) {
        throw new Error("Not authenticated");
      }

      try {
        const oldWeights = await prisma.weights.findFirst({
          where: { userId: ctx.session.user.id },
        });

        if (oldWeights?.weights && typeof oldWeights?.weights === "object") {
          weights = { ...oldWeights.weights, ...weights };
        }

        await prisma.weights.upsert({
          where: { userId: ctx.session.user.id },
          update: { weights, day: { increment: 1 } },
          create: { userId: ctx.session.user.id, weights, day: 0 },
        });
      } catch (err) {
        console.log(err);
      }

      return {
        weight: {
          weights: weights,
        },
      };
    }),
});
