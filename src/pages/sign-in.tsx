import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getProviders, signIn, useSession } from "next-auth/react";
import { Provider } from "next-auth/providers";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import Button from "@/components/Button";

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  // const session = true;

  // console.log(session);

  if (session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return {
    props: {
      providers: await getProviders(),
      // csrfToken: await csrfToken(context),
    },
  };
};

const SignInPage: NextPage<{ providers: Provider[] }> = ({}) => {
  // console.log(providers);

  const { data: session } = useSession();
  console.log(session);

  const providers = getProviders();

  return (
    <>
      <Head>
        <title>Sign In | Starting Strength</title>
      </Head>
      {/* <WithViewHeader backHref="/host" title="Sign In"> */}
      <div className="flex flex-col items-center justify-center gap-4 ">
        {Object.values(providers).map((provider) => (
          <Button
            className="w-full"
            onClick={() => signIn(provider.id)}
            key={provider.name}
          >
            Sign with {provider.name}
          </Button>
        ))}
        {/* <p className="text-center">
          {`don't have an account? `}
          <Link href="/sign-in">Sign in here</Link>
        </p> */}
      </div>
      {/* </WithViewHeader> */}
    </>
  );
};

export default SignInPage;
