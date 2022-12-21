import { type NextPage } from "next";
import Head from "next/head";

import WithViewHeader from "@/components/WithViewHeader";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import Router, { useRouter } from "next/router";
import format from "date-fns/format";
import Exercises from "@/components/Exercises";

const schema = z.object({
  squat: z.boolean().optional(),
  deadlift: z.boolean().optional(),
  bench: z.boolean().optional(),
  clean: z.boolean().optional(),
  press: z.boolean().optional(),
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

  const lastWeights = trpc.weights.getWeights.useQuery()?.data?.payload;

  // const {
  //   mutate: submitWeights,
  //   data,
  //   isLoading,
  // } = trpc.useMutation("weights.updateWeights");
  // signOut();
  const { mutate: updateWeights, isLoading } =
    trpc.weights.updateWeights.useMutation({
      onSuccess: () => {
        router.push("/home");
      },
    });

  const onSubmit = handleSubmit(async (data) => {
    console.log("data");
    console.log("data");
    console.log(data);
    console.log("data");
    console.log("data");
    console.log("data");
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
            {/* Exercises */}
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
