// COMPONENTS
import Navbar from "./components/custom/Navbar";
import Footer from "./components/custom/footer";

// CSS
import "./globals.css";

// PLUGINS & OTHER
import type { Metadata } from "next";

// metadata:
export const metadata: Metadata = {
  title: "The Framing Dragon | Custom Framing in Mill Valley",
  description: "A Bay Area trusted custom framing shop. Get high-quality frames for photos, artwork, posters, and collectibles at The Framing Dragon.",
  icons: {
    icon: "/favicon.ico", 
    apple: "/apple-touch-icon.png", 
  },
};

// ROOT LAYOUT
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
