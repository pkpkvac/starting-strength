// import Navbar from "./navbar";
// import Footer from "./footer";

import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header className="bg-primary-base" />
      <div className="h-full bg-primary-base">{children}</div>
      {/* <Footer /> */}
    </>
  );
}
