"use client"; // Needed for Next.js App Router (useState)

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar Container */}
      <header className="bg-stone-400 text-white p-6">
        <div className="container mx-auto flex justify-between items-center md:flex-col">
          {/* Left-aligned title on mobile, centered on desktop */}
          <h1 className={`${playfair.className} text-lg sm:text-3xl italic md:text-center md:w-full`}>
          THE FRAMING DRAGON
          </h1>

          {/* Right-aligned hamburger menu (mobile only) */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-white text-3xl focus:outline-none md:hidden"
          >
            <FiMenu />
          </button>
        </div>

        {/* Desktop Navbar (Centered) */}
        <nav className="hidden md:flex justify-center space-x-6 text-lg mt-4">
          {[
            { name: "Home", href: "/", img: "/imgs/home.png" },
            { name: "About", href: "/about", img: "/imgs/about.png" },
            { name: "Services", href: "/expertise", img: "/imgs/services.png" },
            { name: "Contact", href: "/contact", img: "/imgs/contact.png" },
            { name: "Random", href: "/random", img: "/imgs/random.png" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-thin relative px-4 py-2 border-2 border-transparent hover:border-[#a67c52] transition-all duration-300 group`}
            >
              <span className="relative z-10 cursor-pointer">{link.name}</span>
              
              {/* Background Image on Hover (Desktop Only) */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden"
                style={{
                  backgroundImage: `url(${link.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.9)", // Adjusts visibility for contrast
                }}
              />
            </Link>
          ))}
        </nav>
      </header>

      {/* Full-Width Sidebar Menu (Mobile) */}
      <div
        className={`fixed inset-0 bg-stone-400 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-3xl focus:outline-none"
          >
            <FiX />
          </button>
        </div>

        {/* Sidebar Links (No Image Backgrounds) */}
        <nav className="flex flex-col space-y-4 p-6 text-lg">
          {[
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about" },
            { name: "Services", href: "/expertise" },
            { name: "Contact", href: "/contact" },
            { name: "Random", href: "/random" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 border-b border-stone-100 hover:text-[#a67c52] transition"
              onClick={() => setIsOpen(false)} // Close sidebar on click
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}


