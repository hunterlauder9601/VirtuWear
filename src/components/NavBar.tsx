import Link from "next/link";
import ActiveLink from "./activeLink";
import DropDown from "./DropDown";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCart } from "@/lib/cartDBmethods";
import ShoppingCartButton from "./ShoppingCartButton";

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <nav className="fixed top-0 z-20 w-full bg-neutral font-bold tracking-wider text-white shadow-xl">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 justify-between">
          <Link href="/" className="flex items-center">
            <div className="-skew-x-6 text-2xl font-bold tracking-widest text-white">
              <span className="text-accent">VIRTU</span>WEAR
            </div>
          </Link>
          <div className="hidden items-end justify-center gap-6 text-lg md:flex">
            <ActiveLink href="/">Home</ActiveLink>
            <DropDown href="/products">Products</DropDown>
            <ActiveLink href="/customizer">Customizer</ActiveLink>
            <UserMenuButton session={session} />
            <ShoppingCartButton cart={cart} />
          </div>
          <div className="md:hidden items-end justify-center gap-6 text-lg text-white flex">
            <div className="dropdown relative hover:text-primary">
              <label tabIndex={0} className="btn btn-circle btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-box z-[1] w-52 bg-neutral p-2 shadow right-0 origin-top-right"
              >
                <li>
                  <a>MEN&apos;S</a>
                </li>
                <li>
                  <a>WOMEN&apos;S</a>
                </li>
                <li>
                  <a>MISC</a>
                </li>
              </ul>
            </div>
            <UserMenuButton session={session} />
            <ShoppingCartButton cart={cart} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export { NavBar as default };
