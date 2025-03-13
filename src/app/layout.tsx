// COMPONENTS
import Navbar from "../app/components/custom/Navbar";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-stone-200 flex flex-col">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

