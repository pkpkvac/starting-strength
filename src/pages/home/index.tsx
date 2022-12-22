import { type NextPage } from "next";
import Head from "next/head";

import Button from "@/components/Button";

const Home: NextPage = () => {
  //   signOut();

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
        <div className="my-10 text-center">No workout history to show</div>
      </div>
      {/* </WithViewHeader> */}
    </>
  );
};

export default Home;
