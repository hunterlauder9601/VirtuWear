"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

const DropDown = ({
  children,
  ...rest
}: { children: React.ReactNode } & LinkProps) => {
  const { href } = rest;
  const expectedPath = href.toString();
  const pathName = usePathname();

  const isActive = pathName === href || pathName.startsWith(expectedPath);
  return (
    <div
      className={
        isActive
          ? " dropdown dropdown-hover border-primary text-primary py-1 px-2 border-b-2 rounded-sm transition-all duration-150 ease-linear"
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
