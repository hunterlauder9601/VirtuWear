import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NavBar from "../components/NavBar";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VirtuWear",
  description: "Interactive E-Commerce Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
