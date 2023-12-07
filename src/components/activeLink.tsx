"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({
  children,
  ...rest
}: { children: React.ReactNode } & LinkProps) => {
  const { href } = rest;
  const pathName = usePathname();

  const isActive = pathName === href;
  return (
    <Link
      {...rest}
      className={
        isActive
          ? "rounded-sm border-b-2 border-primary px-2 pb-2 text-primary transition-all duration-150 ease-linear"
          : "navBarButton"
      }
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
