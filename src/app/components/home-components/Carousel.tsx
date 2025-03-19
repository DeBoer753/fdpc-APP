"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Playfair_Display } from "next/font/google";

// Import Playfair font
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
});

// Left and right arrows for mobile carousel
const Arrow = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 transform -translate-y-1/2 bg-transparent backdrop-blur-md text-stone-700 p-3 z-10 mx-5 transition-all duration-300 hover:bg-white/10 text-2xl ${
      direction === "left" ? "left-[-50px]" : "right-[-50px]"
    }`}
  >
    {direction === "left" ? "←" : "→"}
  </button>
);

export default function Carousel() {

  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  const imageUrls = [
    "/imgs/home-frame-1.png",
    "/imgs/home-frame-2.png",
    "/imgs/home-frame-3.png",
    "/imgs/home-frame-4.png",
    "/imgs/home-frame-5.png",
    "/imgs/home-frame-6.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // We will use custom arrows
  };

  return (
    <div className="flex flex-col items-center">

      {/* Section Title */}
      <h2 className="max-w-[600px] text-center mb-15 text-stone-500 text-2xl font-thin leading-relaxed px-5 italic">
      A well chosen frame does more than protecting. It enhances, preserves, and honors the art. Our services offers timeless craftsmanship, drawing inspiration from history, theater, and minimalist design. Whether classic or contemporary, each frame is made to complement your space and bring your vision to life.
      </h2>

      {/* Frame Images Grid (Desktop) / Carousel (Mobile) */}
      <div className="max-w-[1000px] w-full mx-auto mb-20">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center px-2">
          {imageUrls.map((src, index) => (
            <motion.div
              key={index}
              className="relative w-[230px] h-[230px] mx-auto border-2 border-stone-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Image src={src} alt={`Image ${index + 1}`} fill className="object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Mobile & Tablet Carousel */}
        <div className="block md:hidden relative w-full max-w-[300px] mx-auto">
          <Arrow direction="left" onClick={() => sliderRef?.slickPrev()} />
          <Slider {...settings} ref={setSliderRef}>
            {imageUrls.map((src, index) => (
              <div key={index} className="relative w-full h-[350px] border-2 border-stone-500">
                <Image src={src} alt={`Image ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </Slider>
          <Arrow direction="right" onClick={() => sliderRef?.slickNext()} />
        </div>
      </div>

      {/* Footer Text & Contact Button */}
      <div className="flex flex-col items-center">
        <h2 className={`${playfair.className} max-w-[600px] text-center mb-10 text-stone-500 text-3xl italic font-thin leading-relaxed px-5`}>
          ...and more.
        </h2>

        <a href="/route-contact">
          <button className="px-6 py-3 border-4 border-[#a67c52] bg-white text-stone-500 text-lg font-medium transition-all duration-300 hover:text-white hover:bg-stone-400 cursor-pointer mb-20">
            Contact Us
          </button>
        </a>
      </div>
      
    </div>
  );
}
