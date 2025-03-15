// COMPONENTS
import Navbar from "./components/custom/Navbar";
import Footer from "./components/custom/footer";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-stone-300 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main> {/* Ensures content fills remaining space */}
        <Footer />
      </body>
    </html>
  );
}


