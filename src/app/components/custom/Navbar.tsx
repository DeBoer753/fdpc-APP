"use client"; // Needed for Next.js App Router (useState)

// PLUGINS & OTHER
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons
import { Playfair_Display } from "next/font/google";

// font
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
});

// navigation links being mapped
const navlinks = [
  { name: "Home", href: "/", img: "/imgs/nav-link-home.jpg" },
  { name: "About", href: "/route-about", img: "/imgs/nav-link-about.jpg" },
  {
    name: "Services",
    href: "/route-services",
    img: "/imgs/nav-link-services.jpg",
  },
  {
    name: "Contact",
    href: "/route-contact",
    img: "/imgs/nav-link-contact.jpg",
  },
  { name: "Random", href: "/route-random", img: "/imgs/nav-link-random.jpg" },
];

// NAVBAR
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar Container */}
      <header className="bg-stone-400 text-white p-6" role="banner">
        <div className="container mx-auto flex justify-between items-center md:flex-col">
          {/* Left-aligned title on mobile, centered on desktop */}
          <h1
            className={`${playfair.className} text-lg sm:text-3xl italic md:text-center md:w-full`}
          >
            THE FRAMING DRAGON
          </h1>

          {/* Right-aligned hamburger menu (mobile only) */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-white text-3xl focus:outline-none md:hidden"
            aria-label="Open navigation menu"
          >
            <FiMenu aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Navbar (Centered) */}
        <nav
          className="hidden md:flex justify-center space-x-6 text-lg mt-4"
          aria-label="Main navigation"
        >
          {navlinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-light relative px-4 py-2 border-2 border-transparent hover:border-[#a67c52] transition-all duration-300 group"
            >
              <span className="relative z-10 cursor-pointer">{link.name}</span>

              {/* Background Image on Hover (Desktop Only) */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden"
                style={{
                  backgroundImage: `url(${link.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(1.2)",
                }}
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>
      </header>

      {/* Full-Width Sidebar Menu (Mobile) */}
      <div
        className={`h-[100dvh] w-full fixed inset-0 bg-stone-400 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-3xl focus:outline-none"
            aria-label="Close navigation menu"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>

        {/* Sidebar Links (No Image Backgrounds) */}
        <nav
          className="flex flex-col space-y-4 p-6 text-lg"
          aria-label="Sidebar navigation"
        >
          {[
            { name: "Home", href: "/" },
            { name: "About Us", href: "/route-about" },
            { name: "Services", href: "/route-services" },
            { name: "Contact", href: "/route-contact" },
            { name: "Random", href: "/route-random" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 border-b border-stone-100 hover:text-[#a67c52] transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
