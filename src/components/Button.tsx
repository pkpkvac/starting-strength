import Link from "next/link";
import React from "react";
import Loading from "./Loading";

type variants =
  | "primary"
  | "secondary"
  | "link"
  | "ghost"
  | "danger"
  | "success"
  | "ghost-primary";

type sizes = "sm" | "md" | "lg";

type borders = "none" | "success";
type types = "button" | "submit" | "internalLink";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: variants;
  textColor?: string;
  size?: sizes;
  type?: types;
  href?: string;
  borderOverride?: borders;
  className?: string;
  style?: Record<string, string>;
  isLoading?: boolean;
};

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  textColor = "text-black",
  size = "md",
  borderOverride = "none",
  type = "button",
  href,
  className,
  style,
  isLoading,
}: Props) {
  const baseStyles = `flex justify-center items-center rounded border px-2.5 py-1.5 font-bold kerning-l shadow-sm ${textColor} ${
    disabled ? "opacity-50" : ""
  }`;

  const borderMap: Record<borders, string> = {
    none: "",
    success: "border-success-light hover:border-success-highlight",
  };

  const sizeMap: Record<sizes, string> = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-lg",
  };

  const variantMap: Record<variants, string> = {
    primary: "border-primary-dark bg-primary-base hover:bg-primary-highlight",

    secondary:
      "border-secondary-dark bg-secondary-base hover:bg-secondary-highlight text-white",

    success: "border-success-dark bg-success-base hover:bg-success-highlight",

    danger: "border-error-dark bg-error-base hover:bg-error-highlight",

    ghost: "border-gray-300 bg-transparent hover:border-gray-500",

    "ghost-primary":
      "border-primary-dark bg-transparent hover:border-primary-highlight",

    link: "",
  };

  if (type === "internalLink") {
    return (
      <Link
        href={href ?? "#"}
        className={`${baseStyles} ${sizeMap[size]} ${variantMap[variant]} ${borderMap[borderOverride]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeMap[size]} ${variantMap[variant]} ${borderMap[borderOverride]} ${className}`}
      style={style}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading && <Loading />}
      {children}
    </button>
  );
}
//
