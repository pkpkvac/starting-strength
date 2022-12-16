import { router, protectedProcedure } from "../trpc";
import {z} from 'zod'

export const weightsRouter = router({
  getWeights: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  updateWeights: protectedProcedure.input(z.object({
    userId: z.string(),
    weights: z.object({}),
  })).mutation(({input}) =>{
    console.log(input);
    const {userId, weights} = input
    
    return {
        weight: {
            userId: 'test',
            weights: weights,

        }
    }
  })
});

// postCreate: publicProcedure
// .input(
//   z.object({
//     title: z.string(),
//   }),
// )
// .mutation(({ input }) => {
              
// (parameter) input: {
// title: string;
// }
//   // [...]
// }),