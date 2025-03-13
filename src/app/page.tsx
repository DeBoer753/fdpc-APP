"use client"; // Required for Next.js App Router (useState & useEffect)

import { useState, useEffect } from "react";
import Image from "next/image"; // Import Next.js Image component

export default function Home() {
  const reviews = [
    '"Raphael is a true artist. He is the best in his craft and a pleasure to work with."',
    '"Raphael is a master framer. I am an interior designer and will not be going anywhere else, as I just moved to the area.. and I am very picky and have high-end clients, so that speaks to his talent! He is also super friendly and easy to work with."',
    '"Very professional, very thorough pricing, and exceptional customer service. Will definitely use them again."',
    '"Outstanding experience framing a special print. Raphael was helpful, knowledgeable, considerate of our timing needs, and friendly. Importantly, he did a superb framing job, knows his craft, and was a pleasure to work with. Highly recommend!"',
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true); // Controls fade-in and fade-out
  const [scrolled, setScrolled] = useState(false); // Track scroll position

  // Detect Scroll Position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 140); // If user scrolls past 100px, apply zoom-out
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  // Review Fading Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out effect

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % reviews.length); // Change review
        setFade(true); // Start fade-in effect
      }, 500); // Delay review change until fade-out completes
    }, 9000); // Change review every 9 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Banner Section */}
      <div className="relative w-full h-[400px] sm:h-[490px] bg-black overflow-hidden">
        {/* Background Image with Scroll-Based Zoom Effect */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${
            scrolled ? "scale-100" : "scale-105"
          }`}
          style={{
            backgroundImage: "url('/imgs/home-banner.png')",
          }}
        />
      </div>

      {/* Logo Section */}
      <div className="mr-5 mt-5">
        <Image
          src="/imgs/logo.png" // Ensure logo.png is inside the public folder
          alt="Company Logo"
          width={150} // Adjust dimensions as needed
          height={150}
          className="object-contain"
        />
      </div>

      {/* Reviews Section */}
      <div className="flex flex-col gap-5 items-center min-h-[200px] max-w-[1200px]">
        {/* Auto-Fading Review Text */}
        <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-4xl text-white text-center italic font-thin mt-6 mx-5 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
          {reviews[index]}
        </h1>


      </div>

      {/* White Divider (Always Below Reviews & Shrinks Responsively) */}
      <div className="h-[1px] bg-white mt-5 w-[50%] sm:w-[30%] xs:w-[50%]"></div>


      <div>
        <h1>new field (image?)</h1>
      </div>

    </div>
  );
}
