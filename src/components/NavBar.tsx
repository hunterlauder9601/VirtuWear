"use client";
import React, { useEffect, useState, useRef } from "react";
import { HiX, HiMenu, HiUserCircle } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ActiveLink from "./activeLink";
import DropDown from "./DropDown";

const NavBar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleExitClick(event: globalThis.MouseEvent) {
      if (userMenuButtonRef.current?.contains(event.target as Node)) {
        return;
      } else {
        setShowUserMenu(false);
        setIsMobileMenuOpen(false);
      }
    }

    // Attach the event listener when the user menu is open
    if (showUserMenu) {
      document.addEventListener("click", handleExitClick);
    } else {
      // Remove the event listener when the user menu is closed
      document.removeEventListener("click", handleExitClick);
    }

    // Cleanup when component unmounts
    return () => {
      document.removeEventListener("click", handleExitClick);
    };
  }, [showUserMenu]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    toggleMenu();
  };

  return (
    <nav className="fixed top-0 z-20 w-full bg-neutral font-bold tracking-wider text-white shadow-xl">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 justify-between">
          <Link href="/" className="flex items-center">
            <div className="-skew-x-6 text-2xl font-bold tracking-widest text-white">
              <span className="text-accent">VIRTU</span>WEAR
            </div>
          </Link>
          <div className="hidden gap-6 text-lg text-primary md:flex md:items-end md:justify-center">
            <ActiveLink href="/">Home</ActiveLink>
            <DropDown href="/products">Products</DropDown>
            <ActiveLink href="/customizer">Customizer</ActiveLink>
            <ActiveLink href="/about">About</ActiveLink>
            {!isLoggedIn && <ActiveLink href="/login">Log in</ActiveLink>}
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  ref={userMenuButtonRef}
                  className={`group rounded-md p-1 transition-all duration-300 ease-linear ${
                    showUserMenu
                      ? "bg-primary fill-primary"
                      : "hover:bg-primary hover:fill-primary"
                  }`}
                >
                  <HiUserCircle
                    size={30}
                    className={`${
                      showUserMenu
                        ? "text-gray-100"
                        : "group-hover:text-gray-100"
                    } duration-200 ease-linear`}
                  />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-[11px] w-60 overflow-clip rounded-b-3xl bg-white shadow-2xl shadow-gray-400">
                    <Link
                      href="/account"
                      className="block w-full px-4 py-2 text-center hover:bg-gray-200"
                    >
                      {username}
                    </Link>
                    <button
                      onClick={() => {
                        toggleUserMenu();
                      }}
                      className="block w-full bg-red-300 px-4 py-2 text-center hover:bg-red-500 "
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {!isMobileMenuOpen && (
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="text-white hover:text-primary focus:text-primary focus:outline-none"
                onClick={toggleMenu}
              >
                <HiMenu
                  size={30}
                  className="cursor-pointer bg-transparent duration-300 ease-linear hover:text-primary"
                />
              </button>
            </div>
          )}
        </div>
        <div
          className={`${
            isMobileMenuOpen
              ? "fixed left-0 top-0 z-50 block h-screen w-full bg-neutral"
              : "hidden"
          } md:hidden`}
        >
          <button
            type="button"
            className="absolute right-0 top-0 m-4 text-white hover:text-primary focus:outline-none"
            onClick={toggleMenu}
          >
            <HiX size={30} />
          </button>
          <div className="flex h-full flex-col items-center justify-center text-2xl font-bold">
            <hr className="my-[5vh] w-1/2 border border-base-100" />
            <ActiveLink href="/" onClick={toggleMenu}>
              Home
            </ActiveLink>
            <hr className="my-[5vh] w-1/2 border border-base-100" />
            <ActiveLink href="/products" onClick={toggleMenu}>
              Products
            </ActiveLink>
            <hr className="my-[5vh] w-1/2 border border-base-100" />
            <ActiveLink href="/customizer" onClick={toggleMenu}>
              Customizer
            </ActiveLink>
            <hr className="my-[5vh] w-1/2 border border-base-100" />
            <ActiveLink href="/about" onClick={toggleMenu}>
              About
            </ActiveLink>
            <hr className="my-[5vh] w-1/2 border border-base-100" />
            {!isLoggedIn && (
              <ActiveLink href="/login" onClick={toggleMenu}>
                Log in
              </ActiveLink>
            )}
            {isLoggedIn && (
              <>
                <Link
                  href="/account"
                  onClick={toggleMenu}
                  className="duration-100 ease-linear hover:text-primary"
                >
                  {username}
                </Link>
                <hr className="my-[5vh] w-1/2 border border-base-100" />
                <button
                  onClick={() => {
                    toggleMenu();
                  }}
                  className="text-red-400 duration-100 ease-linear hover:text-red-500"
                >
                  Log out
                </button>
              </>
            )}
            <hr className="my-[5vh] w-1/2 border border-base-100" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export { NavBar as default };
