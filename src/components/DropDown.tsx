"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

const DropDown = ({
  children,
  ...rest
}: { children: React.ReactNode } & LinkProps) => {
  const { href } = rest;
  const pathName = usePathname();

  const isActive = pathName === href;
  return (
    <div
      className={
        isActive
          ? "navBarButton dropdown dropdown-hover border-primary text-primary"
          : "navBarButton dropdown dropdown-hover"
      }
    >
      <Link {...rest} tabIndex={0}>
        {children}
      </Link>
      <ul
        tabIndex={0}
        className="mt-[6px] menu dropdown-content rounded-box z-[1] w-52 bg-neutral p-2 shadow"
      >
        <li>
          <Link href="/products/men">MEN&apos;S</Link>
        </li>
        <li>
          <Link href="/products/women">WOMEN&apos;S</Link>
        </li>
        <li>
          <Link href="/products/misc">MISC</Link>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
