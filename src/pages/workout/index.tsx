import { type NextPage } from "next";
import Head from "next/head";

import WithViewHeader from "@/components/WithViewHeader";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import Exercises from "@/components/Exercises";
import Accessories from "@/components/Accessories";

const schema = z.object({
  squat: z.boolean().optional(),
  deadlift: z.boolean().optional(),
  "deadlift-day": z.boolean().optional(),
  bench: z.boolean().optional(),
  "bench-day": z.boolean().optional(),
  clean: z.boolean().optional(),
  "clean-day": z.boolean().optional(),
  press: z.boolean().optional(),
  "press-day": z.boolean().optional(),
  // accessories
  row: z.number().int().positive().optional(),
  curl: z.number().int().positive().optional(),
  tricep: z.number().int().positive().optional(),
  incline: z.number().int().positive().optional(),

  notes: z.string().optional(),
});

const Workout: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  console.log(errors);

  const lastWeights = trpc.weights.getWeights.useQuery()?.data?.payload;

  // const {
  //   mutate: submitWeights,
  //   data,
  //   isLoading,
  // } = trpc.useMutation("weights.updateWeights");
  // signOut();
  const { mutate: updateWeights, isLoading } =
    trpc.weights.updateWeights.useMutation({
      // onSuccess: () => {
      //   router.push("/home");
      // },
    });

  const { mutate: addUserWorkout, isLoading: userWorkoutLoading } =
    trpc.userWorkouts.addUserWorkout.useMutation({
      // onSuccess: () => {
      //   router.push("/home");
      // },
    });

  const onSubmit = handleSubmit(async (data) => {
    // First update the weights table

    console.log("data");
    console.log("data");
    console.log(data);
    console.log("data");
    console.log("data");
    console.log("data");

    const weights = {};

    if (data.squat) {
      weights.squat = lastWeights?.weights?.squat + 5;
    }

    if (data["deadlift-day"]) {
      if (data.deadlift) {
        weights.deadlift = lastWeights?.weights?.deadlift + 10;
      } else {
        weights.deadlift = lastWeights?.weights?.deadlift;
      }
    }

    if (data["bench-day"]) {
      if (data.bench) {
        weights.bench = lastWeights?.weights?.bench + 5;
      } else {
        weights.bench = lastWeights?.weights?.bench;
      }
    }

    if (data["clean-day"]) {
      if (data.clean) {
        weights.clean = lastWeights?.weights?.clean + 5;
      } else {
        weights.clean = lastWeights?.weights?.clean;
      }
    }

    if (data["press-day"]) {
      if (data.press) {
        weights.press = lastWeights?.weights?.press + 5;
      } else {
        weights.press = lastWeights?.weights?.press;
      }
    }

    console.log("data");
    console.log("data");
    console.log(weights);
    console.log("data");
    console.log("data");
    console.log("data");

    if (data.row) {
      weights.row = data.row;
    }
    if (data.curl) {
      weights.curl = data.curl;
    }
    if (data.tricep) {
      weights.tricep = data.tricep;
    }
    if (data.incline) {
      weights.incline = data.incline;
    }
    if (data.chinup) {
      weights.chinup = data.chinup;
    }

    const userWorkout = {
      weights,
    };

    if (data.notes) {
      userWorkout.notes = data.notes;
    }

    try {
      await updateWeights({ weights });

      await addUserWorkout({ ...userWorkout });
    } catch (error) {
      console.log(error);
    }
  });

  // handleSubmit(async (data) => {
  //   console.log("data", data);
  //   console.log("data", data);
  //   console.log("data", data);

  //   // const weights = {
  //   //   squat: data.squat,
  //   //   deadlift: data.deadlift,
  //   //   bench: data.bench,
  //   //   clean: data.clean,
  //   //   press: data.press,
  //   // };

  //   // const res = await updateWeights({ weights });

  //   // submitWeights({ weights: data });
  // });

  return (
    <>
      <WithViewHeader backHref="/" title="Today's routine">
        <Head>
          <title>{`Today's Routine`}</title>
        </Head>
        <div className="mb-10 flex h-min w-3/4 flex-col justify-between justify-self-center rounded-3xl bg-primary-light px-14 pt-14 pb-2">
          {/* weights */}
          <form
            className="flex flex-col gap-10"
            id="save-workout"
            action="#"
            method="POST"
            onSubmit={onSubmit}
          >
            {/* Exercises */}
            <Exercises register={register} lastWeights={lastWeights} />
            {/* Accessories*/}
            <Accessories register={register} lastWeights={lastWeights} />
            <div className="flex flex-col">
              <label className="font-bold text-white">Notes</label>
              <textarea
                id="notes"
                rows={4}
                className="block w-full flex-1 rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder=""
                {...register("notes")}
              />
            </div>
            <div className="flex justify-center ">
              <Button
                size="lg"
                isLoading={isLoading}
                type="submit"
                className="mt-8 mb-8 flex-1 justify-center rounded-full"
                textColor="text-white"
                variant="secondary"
              >
                Save Workout
              </Button>
            </div>
          </form>
        </div>
      </WithViewHeader>
    </>
  );
};

export default Workout;
