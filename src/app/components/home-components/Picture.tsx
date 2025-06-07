"use client"; // Needed for Next.js App Router (useState) 

// PLUGINS & OTHER
import { useState, useEffect } from "react";
import Image from "next/image";

// PICTURE
export default function Picture() {
  const [scaleFactor, setScaleFactor] = useState(1); // Default to no scaling

  // detect Scroll Position to Adjust Scaling (Desktop Only)
  useEffect(() => {
    const handleScroll = () => {
      // disable scaling for mobile (below 768px)
      if (window.innerWidth < 768) {
        setScaleFactor(1);
        return;
      }

      const frameImage = document.getElementById("frame-image");
      if (frameImage) {
        const rect = frameImage.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // calculate how much of the image is visible
        const visibleHeight = Math.min(windowHeight - rect.top, rect.height);
        const visibilityRatio = Math.max(
          0,
          Math.min(visibleHeight / rect.height, 1)
        );

        // scale smoothly between 0.9 (when entering) to 1.1 (fully visible)
        const newScale = 0.9 + visibilityRatio * 0.2; // Adjust this range as needed
        setScaleFactor(newScale);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="frame-image"
      className="mt-20 mb-20 flex justify-center transition-transform duration-500 ease-out"
      style={{ transform: `scale(${scaleFactor})` }}
      role="img"
      aria-label="Image of our frame store with decorative shadow background"
    >
      {/* Shadow Behind the Image */}
      <div
        className="absolute w-[360px] h-[400px] bg-black blur-lg rounded-lg translate-y-10 transition-opacity duration-500 ease-out"
        style={{
          opacity: (1.1 - scaleFactor) / 0.2,
        }}
        aria-hidden="true"
      ></div>

      {/* Framed Store Image */}
      <Image
        src="/imgs/home-frame-store.png"
        alt="Exterior view of our custom framing store"
        width={350}
        height={150}
        className="object-contain relative shadow-lg rounded-lg"
      />
    </div>
  );
}
