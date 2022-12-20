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
import Exercises from "@/components/Workout";

const schema = z.object({
  squat: z
    .number()
    .min(45, { message: "This app is only for those who squat" }),
  deadlift: z
    .number()
    .min(45, { message: "This app is only for those who deadlift" }),
  bench: z
    .number()
    .min(45, { message: "This app is only for those who bench" }),
  clean: z
    .number()
    .min(45, { message: "This app is only for those who clean" }),
  press: z
    .number()
    .min(45, { message: "This app is only for those who press" }),
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
  console.log(lastWeights?.weights);

  // console.log(weightQuery.data?.payload?.weights);

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
    const weights = {
      squat: data.squat,
      deadlift: data.deadlift,
      bench: data.bench,
      clean: data.clean,
      press: data.press,
    };

    const res = await updateWeights({ weights });

    console.log(res);

    // submitWeights({ weights: data });
  });

  return (
    <>
      <WithViewHeader backHref="/" title="Today's routine">
        <Head>
          <title>{`Today's Routine`}</title>
        </Head>
        <div className="mb-10 flex h-min w-3/4 flex-col justify-between justify-self-center rounded-3xl bg-primary-light px-14 pt-14 pb-2">
          {/* title */}
          <div className="mb-5 flex flex-col gap-5 text-left font-bold text-white">
            <p className="">{format(Date.now(), "E, MMM dd, yyyy ")}</p>
            <p className="">{`Week ${
              Math.floor((lastWeights?.day || 0) / 3) + 1
            }, Day ${lastWeights?.day}`}</p>
          </div>

          {/* weights */}
          <form
            className="flex flex-col gap-10"
            id="starting-weight"
            action="#"
            method="POST"
            onSubmit={onSubmit}
          >
            {/* TODO: THIS NEEDS TO BE A COMPONENT AND CLEANED UP */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <Exercises register={register} lastWeights={lastWeights} />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-4 text-white">
                  <div>
                    <label className="font-bold text-white">Press</label>
                    <div
                      style={{
                        position: "relative",
                        width: "60px",
                        height: "60px",
                      }}
                    >
                      <Image
                        className="rounded-full"
                        src={"/ss_press.png"}
                        fill
                        alt="press_icon"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-white">Weights</label>
                    <ul>
                      <li>{`${lastWeights?.weights?.press + 5} x 5`}</li>
                      <li>{`${lastWeights?.weights?.press + 5} x 5`}</li>
                      <li>{`${lastWeights?.weights?.press + 5} x 5`}</li>
                    </ul>
                  </div>
                  <div className="flex flex-col text-center">
                    <label className="font-bold text-white">Success</label>
                    <div>
                      <input
                        type="checkbox"
                        id="press"
                        checked={true}
                        // className="block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        // placeholder={lastWeights?.weights.squat.toString() || ""}
                        {...register("press")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col text-center">
                    <label className="font-bold text-white">Stall</label>
                    <div>
                      <input
                        type="checkbox"
                        id="press"
                        checked={true}
                        // className="block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        // placeholder={lastWeights?.weights.squat.toString() || ""}
                        {...register("press")}
                      />
                    </div>
                  </div>
                </div>
                {errors.squat?.message && (
                  <p className="text-error-light">
                    {errors.squat?.message.toString()}
                  </p>
                )}
              </div>

              {/* </div> */}
              {/* <div className="flex gap-4"> */}
              <div className="flex flex-col gap-4">
                <label className="font-bold text-white">Bench</label>
                <div className="flex gap-4">
                  <div
                    style={{
                      position: "relative",
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    <Image
                      className="rounded-full"
                      src={"/ss_bench.png"}
                      fill
                      alt="bench"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <input
                    type="number"
                    id="bench"
                    className="block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={lastWeights?.weights.bench.toString() || ""}
                    {...register("bench", {
                      setValueAs: (v) => parseInt(v === "" ? -1 : v, 10),
                    })}
                  />
                </div>
                {errors.bench?.message && (
                  <p className="text-error-light">
                    {errors.bench?.message.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <label className="font-bold text-white">Clean</label>
                <div className="flex gap-4">
                  <div
                    style={{
                      position: "relative",
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    <Image
                      className="rounded-full"
                      src={"/ss_clean.png"}
                      fill
                      alt="clean_icon"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <input
                    type="number"
                    id="clean"
                    className="block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={lastWeights?.weights.clean.toString() || ""}
                    {...register("clean", {
                      setValueAs: (v) => parseInt(v === "" ? -1 : v, 10),
                    })}
                  />
                </div>
                {errors.clean?.message && (
                  <p className="text-error-light">
                    {errors.clean?.message.toString()}
                  </p>
                )}
              </div>
              {/* </div> */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <label className="font-bold text-white">Deadlift</label>
                  <div className="flex gap-4">
                    <div
                      style={{
                        position: "relative",
                        width: "60px",
                        height: "60px",
                      }}
                    >
                      <Image
                        className="rounded-full"
                        src={"/ss_deadlift.png"}
                        fill
                        alt="deadlift"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <input
                      type="number"
                      id="deadlift"
                      className="block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder={
                        lastWeights?.weights.deadlift.toString() || ""
                      }
                      {...register("deadlift", {
                        setValueAs: (v) => parseInt(v === "" ? -1 : v, 10),
                      })}
                    />
                  </div>
                  {errors.deadlift?.message && (
                    <p className="text-error-light">
                      {errors.deadlift?.message.toString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
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
