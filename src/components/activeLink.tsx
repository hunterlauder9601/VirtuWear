"use client"; // if you are planing to use it in the component which is not marker with use client directive this is a must

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation"; // usePathname is a hook now imported from navigation

const ActiveLink = ({
  children,
  ...rest
 }: { children: React.ReactNode } & LinkProps) => {
   const { href } = rest;
   const pathName = usePathname();

   const isActive = pathName === href;
     return (
    // you get a global isActive class name, it is better than 
    // nothing, but it means you do not have scoping ability in 
    // certain cases
       <Link {...rest} className={isActive ? "pb-2 px-2 border-b-2 border-primary text-primary rounded-sm transition-all duration-150 ease-linear" : "navBarButton"}> 
         {children}
       </Link>
   );
  };

export default ActiveLink;