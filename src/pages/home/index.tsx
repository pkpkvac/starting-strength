import { type NextPage } from "next";
import Head from "next/head";

import WithViewHeader from "@/components/WithViewHeader";

const Home: NextPage = () => {
  //   signOut();

  return (
    <>
      {/* <WithViewHeader backHref="/" title="Generate Routine"> */}
      <Head>
        <title>Starting Strength | Home</title>
      </Head>
      <>some component</>
      {/* </WithViewHeader> */}
    </>
  );
};

export default Home;
