import { Icon } from "@iconify/react";
import arrowLeft from "@iconify-icons/ph/arrow-left-bold";
import Link from "next/link";
import React from "react";

type Props = {
  title?: string;
  backHref?: string;
};
const ViewHeader = ({ backHref = "/", title = "" }: Props) => {
  return (
    <div
      className="mx-10 grid items-center"
      style={{ gridTemplateColumns: "1fr 3fr 1fr" }}
    >
      {backHref && (
        <Link href={backHref}>
          <Icon className="text-white" icon={arrowLeft} />
        </Link>
      )}
      {title && (
        <h1 className="text-center text-lg font-extrabold text-white">
          {title}
        </h1>
      )}
      <span></span>
    </div>
  );
};

const WithViewHeader = ({
  backHref = "/",
  title = "",
  children,
}: Props & { children?: React.ReactNode }) => {
  return (
    <div className="grid h-full gap-8" style={{ gridTemplateRows: "auto 1fr" }}>
      <ViewHeader backHref={backHref} title={title} />
      {children}
    </div>
  );
};
export default WithViewHeader;
