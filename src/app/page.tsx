"use client"; // Ensures this is a client component

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Component for Carousel
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


export default function Home() {
  // Reviews Section
  const reviews = [
    '"Raphael is a true artist. He is the best in his craft and a pleasure to work with."',
    '"Raphael is a master framer. I am an interior designer and will not be going anywhere else, as I just moved to the area.. and I am very picky and have high-end clients, so that speaks to his talent! He is also super friendly and easy to work with."',
    '"Very professional, very thorough pricing, and exceptional customer service. Will definitely use them again."',
    '"Outstanding experience framing a special print. Raphael was helpful, knowledgeable, considerate of our timing needs, and friendly. Importantly, he did a superb framing job, knows his craft, and was a pleasure to work with. Highly recommend!"',
  ];

  // Image Arrays
  const bannerImages = ["/imgs/home-banner-1.png", "/imgs/home-banner-2.png", "/imgs/home-banner-3.png"];
  const imageUrls = [
    "/imgs/home-frame-1.png",
    "/imgs/home-frame-2.png",
    "/imgs/home-frame-3.png",
    "/imgs/home-frame-4.png",
    "/imgs/home-frame-5.png",
    "/imgs/home-frame-6.png",
  ];

  // State Variables
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  // Auto-Switching Banner
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-Fading Review Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        setFade(true);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Store Frame Image Scaling Effect on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return setScaleFactor(1);

      const frameImage = document.getElementById("frame-image");
      if (frameImage) {
        const rect = frameImage.getBoundingClientRect();
        const visibilityRatio = Math.max(0, Math.min((window.innerHeight - rect.top) / rect.height, 1));
        setScaleFactor(0.9 + visibilityRatio * 0.2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slick Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Custom arrows used instead
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[400px] sm:h-[490px] bg-black overflow-hidden">
        {bannerImages.map((image, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === bannerIndex ? "opacity-100" : "opacity-0"}`}>
            <Image src={image} alt={`Banner ${i}`} layout="fill" objectFit="cover" priority={i === 0} />
          </div>
        ))}
      </div>

      {/* Logo Section */}
      <motion.div className="mr-5 mt-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1 } }} viewport={{ once: true }}>
        <Image src="/imgs/logo.png" alt="Company Logo" width={150} height={150} className="object-contain" priority />
      </motion.div>

      {/* Auto-Fading Reviews Section */}
      <div className="min-h-[200px] max-w-[1200px]">
        <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-4xl text-stone-500 text-center italic font-thin mt-6 mx-5 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
          {reviews[index]}
        </h1>
      </div>

      {/* Star Rating */}
      <div className="flex justify-center gap-2 mt-5">
        {Array(5).fill(null).map((_, i) => (
          <FaStar key={i} className="text-white text-lg sm:text-xl md:text-2xl" />
        ))}
      </div>

      {/* Store Frame Image with Scaling Effect */}
      <div id="frame-image" className="mt-20 mb-20 flex justify-center transition-transform duration-500 ease-out" style={{ transform: `scale(${scaleFactor})` }}>
        <div className="absolute w-[360px] h-[400px] bg-black blur-lg rounded-lg translate-y-10 transition-opacity duration-500 ease-out" style={{ opacity: (1.1 - scaleFactor) / 0.2 }}></div>
        <Image src="/imgs/home-frame-store.png" alt="Store Frame" width={350} height={150} className="object-contain relative shadow-lg rounded-lg" />
      </div>

      {/* Section Description */}
      <h2 className="max-w-[600px] text-center mb-15 text-stone-500 text-2xl font-thin leading-relaxed px-5">
        Discover a diverse selection of exquisite frames, thoughtfully crafted to complement any artwork or space.
      </h2>

      {/* Grid (Desktop) / Carousel (Mobile) */}
      <div className="max-w-[1000px] w-full mx-auto mb-20">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center px-2">
          {imageUrls.map((src, index) => (
            <motion.div key={index} className="relative w-[230px] h-[230px] mx-auto border-2 border-stone-500" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }}>
              <Image src={src} alt={`Image ${index + 1}`} fill className="object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Mobile & Tablet Carousel */}
        <div className="block md:hidden relative w-full max-w-[300px] mx-auto">
          <Arrow direction="left" onClick={() => sliderRef?.slickPrev()} />
          <Slider {...sliderSettings} ref={setSliderRef}>
            {imageUrls.map((src, index) => (
              <div key={index} className="relative w-full h-[350px] border-2 border-stone-500">
                <Image src={src} alt={`Image ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </Slider>
          <Arrow direction="right" onClick={() => sliderRef?.slickNext()} />
        </div>
      </div>

      {/* Much More Text & Contact Button */}
      <div className="flex flex-col items-center">

        <h2 className="max-w-[600px] text-center mb-5 text-stone-500 text-3xl italic font-thin leading-relaxed px-5">
          ...and <span className="font-bold">much</span> more.
        </h2>

        <a href="/contact" className="mb-20">
          <button className="px-6 py-3 border-2 border-stone-500 bg-stone-400 text-white text-lg font-medium transition-all duration-300 hover:bg-stone-500 hover:border-stone-300 cursor-pointer">
            Contact Us
          </button>
        </a>

      </div>

    </div>
  );
}
