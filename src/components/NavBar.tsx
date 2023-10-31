"use client";
import React, { useEffect, useState, useRef} from 'react'
import { HiX, HiMenu, HiUserCircle } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ActiveLink from './activeLink';

const NavBar =  () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleExitClick(event: globalThis.MouseEvent) {
      if(userMenuButtonRef.current?.contains(event.target as Node)) {
        return;
      }
      else {
        setShowUserMenu(false);
        setIsMobileMenuOpen(false);
      }
    }

    // Attach the event listener when the user menu is open
    if (showUserMenu) {
      document.addEventListener('click', handleExitClick);
    } else {
      // Remove the event listener when the user menu is closed
      document.removeEventListener('click', handleExitClick);
      
    }

    // Cleanup when component unmounts
    return () => {
      document.removeEventListener('click', handleExitClick);
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
    <nav className="w-full fixed top-0 z-20 bg-neutral text-white font-bold tracking-wider border-b border-primary">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="text-2xl text-white tracking-widest font-bold -skew-x-6"><span className='text-accent'>E</span>COMMERCE</div>
          </Link>
          <div className="hidden md:flex gap-6 text-lg text-primary">
            <ActiveLink href="/">Home</ActiveLink>
            <ActiveLink href="/products">Products</ActiveLink>
            <ActiveLink href="/customizer">Customizer</ActiveLink>
            <ActiveLink href="/about">About</ActiveLink>
            {!isLoggedIn && <ActiveLink href="/login">Log in</ActiveLink>}
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  ref={userMenuButtonRef}
                  className={`group duration-300 ease-linear p-1 rounded-md transition-all ${
                    showUserMenu
                      ? 'bg-purple-500 fill-purple-500'
                      : 'hover:bg-purple-500 hover:fill-purple-500'
                  }`}
                >
                  <HiUserCircle
                    size={30}
                    className={`${
                      showUserMenu ? 'text-gray-100' : 'group-hover:text-gray-100'
                    } duration-200 ease-linear`}
                  />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-[11px] w-60 bg-white shadow-2xl shadow-gray-400 rounded-b-3xl overflow-clip">
                    <Link href="/account" className="block w-full py-2 px-4 text-center hover:bg-gray-200">{username}
                    </Link>
                    <button
                      onClick={() => {
                        toggleUserMenu();
                      }}
                      className="block w-full py-2 px-4 text-center bg-red-300 hover:bg-red-500 "
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {!isMobileMenuOpen &&
          <div className="md:hidden flex items-center">
            <button type="button" className="text-gray-900 hover:text-purple-600 focus:outline-none focus:text-purple-600" onClick={toggleMenu}>
                 <HiMenu size={30} className='bg-transparent hover:text-purple-600 duration-300 ease-linear cursor-pointer'/>
            </button>
          </div>}
        </div>
        <div className={`${isMobileMenuOpen ? "block fixed top-0 left-0 w-full h-screen bg-gray-200 z-50" : "hidden"} md:hidden`}>
        <button
          type="button"
          className="absolute top-0 right-0 m-4 text-gray-900 hover:text-purple-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <HiX size={30} />
        </button>
        <div className="flex flex-col items-center justify-center h-full font-bold text-2xl">
          <hr className='w-1/2 border my-[5vh] border-gray-300'/>
          <ActiveLink href="/" onClick={toggleMenu}>Home</ActiveLink>
          <hr className='w-1/2 border my-[5vh] border-gray-300'/>
          <ActiveLink href="/products" onClick={toggleMenu}>Products</ActiveLink>
          <hr className='w-1/2 border my-[5vh] border-gray-300'/>
          <ActiveLink href="/customizer" onClick={toggleMenu}>Customizer</ActiveLink>
          <hr className='w-1/2 border my-[5vh] border-gray-300'/>
          <ActiveLink href="/about" onClick={toggleMenu}>About</ActiveLink>
          <hr className='w-1/2 border my-[5vh] border-gray-300'/>
          {!isLoggedIn && <ActiveLink href="/login" onClick={toggleMenu}>Log in</ActiveLink>}
          {isLoggedIn && <>
          <Link href="/account" onClick={toggleMenu} className="hover:text-purple-600 duration-100 ease-linear">{username}
          </Link>
          <hr className='w-1/2 border my-[5vh] border-gray-300'/>
          <button onClick={() => { toggleMenu(); } } className="hover:text-red-500 text-red-400 duration-100 ease-linear">Log out</button>
          </>}
          <hr className='w-1/2 border my-[5vh] border-gray-300'/>
        </div>
      </div>
      </div>
    </nav>
  )
}


export { NavBar as default}