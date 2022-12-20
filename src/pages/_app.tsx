import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import Layout from "@/components/Layout";

// globals should be last to override any styles
import "@/styles/tailwind-forms.scss";
import "@/styles/globals.scss";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "@/utils/trpc";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
