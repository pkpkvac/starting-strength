import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import Button from "@/components/Button";
import Image from "next/image";

import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  if (sessionData) {
    router.push("/home");
  }

  return (
    <>
      <Head>
        <title>Starting Strength | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-primary-light">
        {/* to be the layout div */}

        <div className="flex w-1/2 flex-col justify-center ">
          <Image
            src={"/logo.png"}
            className="mb-4 w-full rounded-lg"
            width={400}
            height={400}
            alt="logo"
          />
          <Button
            textColor="text-white"
            variant="primary"
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
