import { type NextPage } from "next";
import Head from "next/head";

import WithViewHeader from "@/components/WithViewHeader";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

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

const Home: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const lastWeights =
    trpc.weights.getWeights.useQuery()?.data?.payload?.weights;

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

    updateWeights({ weights });
  });

  return (
    <>
      <WithViewHeader backHref="/" title="Generate Routine">
        <Head>
          <title>Generate Routine</title>
        </Head>
        <div className="mb-10 flex h-min w-3/4 flex-col justify-between justify-self-center rounded-3xl bg-primary-light px-14 pt-14 pb-2">
          {/* title */}
          <div className="mb-5 flex flex-col gap-5 text-left font-bold text-white">
            <p className="">Generate Novice Linear Progression</p>
            <p className="">Starting Weight for 5 reps (lbs)</p>
          </div>

          {/* weights */}
          <form
            id="starting-weight"
            action="#"
            method="POST"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <label className="font-bold text-white">Squat</label>
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
                      src={"/ss_squat.png"}
                      fill
                      alt="squat_icon"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <input
                    type="number"
                    id="squat"
                    className="block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={lastWeights?.squat?.toString() || ""}
                    {...register("squat", {
                      setValueAs: (v) => parseInt(v === "" ? -1 : v, 10),
                    })}
                  />
                </div>
                {errors.squat?.message && (
                  <p className="text-error-light">
                    {errors.squat?.message.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <label className="font-bold text-white">Press</label>
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
                      src={"/ss_press.png"}
                      fill
                      alt="press_icon"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <input
                    type="number"
                    id="press"
                    className="block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={lastWeights?.press?.toString() || ""}
                    {...register("press", {
                      setValueAs: (v) => parseInt(v === "" ? -1 : v, 10),
                    })}
                  />
                </div>
                {errors.press?.message && (
                  <p className="text-error-light">
                    {errors.press?.message.toString()}
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
                    placeholder={lastWeights?.bench?.toString() || ""}
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
                    placeholder={lastWeights?.clean?.toString() || ""}
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
                      placeholder={lastWeights?.deadlift?.toString() || ""}
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
            <div className="flex justify-center ">
              <Button
                size="lg"
                isLoading={isLoading}
                type="submit"
                className="mt-8 mb-8 flex-1 justify-center"
                textColor="text-white"
                variant="primary"
              >
                Generate Novice LP
              </Button>
            </div>
          </form>
        </div>
      </WithViewHeader>
    </>
  );
};

export default Home;
