import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "@/utils/trpc";

import Button from "@/components/Button";
import PastWorkout from "@/components/PastWorkout";

const Home: NextPage = () => {
  const pastWorkouts =
    trpc.userWorkouts.getUserWorkouts.useQuery()?.data?.payload;

  const pastWorkoutsComponent = pastWorkouts
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    ?.map((workout) => {
      return <PastWorkout key={workout.id} workout={workout} />;
    });

  return (
    <>
      <Head>
        <title>Starting Strength | Home</title>
      </Head>
      <div className="h-[100vh] w-full">
        <div className="mx-auto flex w-3/4 justify-center rounded-3xl bg-primary-light p-10">
          <Button
            variant="primary"
            className="w-full rounded-xl"
            textColor="text-white"
            href="/workout"
            type="internalLink"
          >{`I'm working out today`}</Button>
        </div>
        {pastWorkoutsComponent}
      </div>
    </>
  );
};

export default Home;
