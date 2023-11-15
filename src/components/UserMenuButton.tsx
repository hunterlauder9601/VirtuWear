"use client";

import { HiUserCircle } from "react-icons/hi";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="dropdown md:dropdown-hover group">
      <label tabIndex={0} className="btn btn-circle btn-ghost group-hover:text-primary">
        {user ? (
          <Image
            src={user?.image || HiUserCircle}
            alt="Profile picture"
            width={40}
            height={40}
            className="w-[24px] rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
        )}
      </label>
      <ul
        tabIndex={0}
        className=" menu dropdown-content rounded-box right-0 z-[1] w-52 origin-top-right bg-neutral p-2 shadow group-hover:text-primary"
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              SIGN OUT
            </button>
          ) : (
            <button onClick={() => signIn()}>SIGN IN</button>
          )}
        </li>
      </ul>
    </div>
  );
}
