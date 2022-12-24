import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userWorkoutsRouter = router({
  getUserWorkouts: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    if (!ctx.session.user) {
      throw new Error("Not authenticated");
    }

    try {
      const res = await prisma.userWorkouts.findMany({
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
  addUserWorkout: protectedProcedure
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
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { weights, notes } = input;
      const { prisma } = ctx;

      if (!ctx.session.user) {
        throw new Error("Not authenticated");
      }

      try {
        await prisma.userWorkouts.create({
          data: {
            userId: ctx.session.user.id,
            weights: weights,
            notes: notes,
          },
        });
      } catch (err) {
        console.log(err);
      }

      return {
        weights,
        notes,
      };
    }),
});
