"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Banner() {
  
  const [bannerIndex, setBannerIndex] = useState(0); // Track current banner image

  const bannerImages = [
    "/imgs/home-banner-1.png",
    "/imgs/home-banner-2.png",
    "/imgs/home-banner-3.png",
  ];

  // Smooth Cross fade Effect for Banner 
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length); // Loop through images
    }, 6000); // Change banner every 6 seconds

    return () => clearInterval(bannerInterval); // Cleanup on unmount
  }, [bannerImages.length]);

  return (
    <div className="relative w-full h-[400px] sm:h-[490px] bg-black overflow-hidden">

      {/* Banner */}
      {bannerImages.map((image, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === bannerIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Banner ${i}`}
            layout="fill" // Cover the div completely
            objectFit="cover" // Maintain aspect ratio
            priority={i === 0} // Load first image with priority
          />
        </div>
      ))}

    </div>
  );
}
