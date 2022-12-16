import useUserMe from "@/hooks/useUserMe";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";

// export interface IHeader extends React.ComponentPropsWithoutRef<"header"> {}

const Header: React.FC<React.ComponentPropsWithoutRef<"header">> = ({
  className,
  ...headerProps
}) => {
  const userMe = useUserMe();

  if (!userMe) return null;

  return (
    <header
      {...headerProps}
      className={`flex w-full flex-row justify-between px-6 ${className}`}
    >
      <div className="m-5 space-x-5 ">
        <Link href="/">
          <Image src={"/logo.png"} width={100} height={100} alt="logo" />
        </Link>
      </div>
      <div className="m-5 flex items-center space-x-10">
        <Link className="text-white" href="/generate">
          Generate
        </Link>
        <Link className="text-white" href="/">
          Charts
        </Link>
        <Link className="text-white" href="/">
          Log
        </Link>
        <Button
          onClick={userMe ? () => signOut() : () => signIn()}
          variant="secondary"
          className="h-fit text-white "
        >
          {userMe ? "Sign out" : "Sign in"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
