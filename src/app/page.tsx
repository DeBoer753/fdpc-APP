"use client"; // Required for Next.js App Router (useState & useEffect)

import { useState, useEffect } from "react";
import Image from "next/image"; // Import Next.js Image component
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const reviews = [
    '"Raphael is a true artist. He is the best in his craft and a pleasure to work with."',
    '"Raphael is a master framer. I am an interior designer and will not be going anywhere else, as I just moved to the area.. and I am very picky and have high-end clients, so that speaks to his talent! He is also super friendly and easy to work with."',
    '"Very professional, very thorough pricing, and exceptional customer service. Will definitely use them again."',
    '"Outstanding experience framing a special print. Raphael was helpful, knowledgeable, considerate of our timing needs, and friendly. Importantly, he did a superb framing job, knows his craft, and was a pleasure to work with. Highly recommend!"',
  ];

  const bannerImages = [
    "/imgs/home-banner-1.png",
    "/imgs/home-banner-2.png",
    "/imgs/home-banner-3.png",
  ];

  const imageUrls = [
    "/imgs/home-frame-1.png",
    "/imgs/home-frame-2.png",
    "/imgs/home-frame-3.png",
    "/imgs/home-frame-4.png",
    "/imgs/home-frame-5.png",
    "/imgs/home-frame-6.png",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true); // Controls fade-in and fade-out
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrolled, setScrolled] = useState(false); // Track scroll position
  const [bannerIndex, setBannerIndex] = useState(0); // Track current banner image
  const [scaleFactor, setScaleFactor] = useState(1); // Default to no scaling
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  // Detect Scroll Position for Banner Zoom Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 140); // If user scrolls past 140px, apply zoom-out
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  // Smooth Crossfade Effect for Banner
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length); // Loop through images
    }, 6000); // Change banner every 6 seconds

    return () => clearInterval(bannerInterval); // Cleanup on unmount
  }, []);

  // Auto-Fading Review Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out effect

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % reviews.length); // Change review
        setFade(true); // Start fade-in effect
      }, 500); // Wait for fade-out before changing review
    }, 8000); // Change review every 8 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Detect Scroll Position to Adjust Scaling (Desktop Only)
  useEffect(() => {
    const handleScroll = () => {
      // Disable scaling for mobile (below 768px)
      if (window.innerWidth < 768) {
        setScaleFactor(1); // Keep original size
        return;
      }

      const frameImage = document.getElementById("frame-image");
      if (frameImage) {
        const rect = frameImage.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the image is visible
        const visibleHeight = Math.min(windowHeight - rect.top, rect.height);
        const visibilityRatio = Math.max(0, Math.min(visibleHeight / rect.height, 1));

        // Scale smoothly between 0.9 (when entering) to 1.1 (fully visible)
        const newScale = 0.9 + visibilityRatio * 0.2; // Adjust this range as needed
        setScaleFactor(newScale);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      {/* Banner Section (Auto-Changing with Smooth Crossfade) */}
      <div className="relative w-full h-[400px] sm:h-[490px] bg-black overflow-hidden">
      {bannerImages.map((image, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === bannerIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Next.js Image Component */}
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

      {/* Logo Section */}
      <motion.div 
        className="mr-5 mt-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
        >
        <Image
          src="/imgs/logo.png" // Ensure logo.png is inside the public folder
          alt="Company Logo"
          width={150} // Adjust dimensions as needed
          height={150}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Reviews Section */}
      <div className="min-h-[200px] max-w-[1200px]">
        {/* Auto-Fading Review Text */}
        <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-4xl text-stone-500 text-center italic font-thin mt-6 mx-5 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
          {reviews[index]}
        </h1>
      </div>

      {/* White Stars */}
      <div className="flex justify-center gap-2 mt-5">
        {Array(5).fill(null).map((_, i) => (
          <FaStar key={i} className="text-white text-lg sm:text-xl md:text-2xl" />
        ))}
      </div>

      {/* Frame Image with Scaling Disabled on Mobile */}
      <div
        id="frame-image"
        className="mt-20 mb-20 flex justify-center transition-transform duration-500 ease-out"
        style={{ transform: `scale(${scaleFactor})` }} // Dynamic scaling (Desktop Only)
      >
        {/* Shadow Behind the Image */}
        <div
          className="absolute w-[360px] h-[400px] bg-black blur-lg rounded-lg translate-y-10 transition-opacity duration-500 ease-out"
          style={{
            opacity: (1.1 - scaleFactor) / 0.2, // Fade out as scaleFactor increases
          }}
        ></div>

        <Image
          src="/imgs/home-frame-store.png"
          alt="Company Logo"
          width={350}
          height={150}
          className="object-contain relative shadow-lg rounded-lg"
        />
      </div>

      <h2 className="max-w-[600px] text-center mb-15 text-stone-500 text-2xl font-thin leading-relaxed px-5">
        Discover a diverse selection of exquisite frames, thoughtfully crafted to complement any artwork or space. From classic elegance to modern sophistication, our collection offers the perfect frame for every style and vision.
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

      <div className="flex flex-col items-center">
        <h2 className="max-w-[600px] text-center mb-5 text-stone-500 text-3xl italic font-thin leading-relaxed px-5">
          ...and <span className="font-bold">much</span> more.
        </h2>
        <a href="/contact">
          <button className="px-6 py-3 border-2 border-stone-500 bg-stone-300 text-white text-lg font-medium transition-all duration-300 hover:bg-stone-500 hover:border-stone-300 cursor-pointer mb-20">
            Contact Us
          </button>
        </a>
      </div>



    </div>
  );
}
