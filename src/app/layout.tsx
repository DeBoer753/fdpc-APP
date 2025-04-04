import Navbar from "./components/custom/Navbar";
import Footer from "./components/custom/footer";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Framing Dragon",
  description: "Custom Framing in Marin County",
  icons: {
    icon: "/src/favicon.ico", // Add this line
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-stone-300 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
