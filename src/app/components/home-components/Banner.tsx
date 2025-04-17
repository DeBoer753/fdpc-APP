"use client"; // Needed for Next.js App Router (useState)

// PLUGINS & OTHER
import { useState, useEffect } from "react";
import Image from "next/image";

const bannerImages = [
  "/imgs/home-banner-3.jpg",
  "/imgs/home-banner-1.jpg",
  "/imgs/home-banner-2.jpg",
];

// BANNER
export default function Banner() {
  const [bannerIndex, setBannerIndex] = useState(0);

  // smooth Cross fade Effect for banner
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 6000);

    return () => clearInterval(bannerInterval);
  }, [bannerImages.length]);

  return (
    <div className="relative w-full h-[400px] sm:h-[490px] bg-black overflow-hidden">
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
            layout="fill"
            objectFit="cover"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
