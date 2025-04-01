"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Playfair_Display } from "next/font/google";

// Import Playfair font
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
});

export default function Reviews() {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fade, setFade] = useState(true); // Controls fade-in and fade-out
  const [index, setIndex] = useState(0); // Track current review index
  const reviews = [
    '"Raphael is a true artist. He is the best in his craft and a pleasure to work with."',
    '"Raphael is a master framer. I am an interior designer and will not be going anywhere else, as I just moved to the area.. and I am very picky and have high-end clients, so that speaks to his talent! He is also super friendly and easy to work with."',
    '"Very professional, very thorough pricing, and exceptional customer service. Will definitely use them again."',
    '"Outstanding experience framing a special print. Raphael was helpful, knowledgeable, considerate of our timing needs, and friendly. Importantly, he did a superb framing job, knows his craft, and was a pleasure to work with. Highly recommend!"',
  ];

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
  }, [reviews.length]);

  return (
    <motion.div
      className="flex flex-col items-center relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 1 } }}
      viewport={{ once: true }}
    >

      {/* Logo Image */}
      <Image
        src="/imgs/logo.png"
        alt="Company Logo"
        width={180}
        height={150}
        className="object-contain mt-2"
        priority
      />

      {/* Navigation Dots */}
      <div className="flex gap-3 mt-3">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)} // Change review on click
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 cursor-pointer ${
              i === index ? "bg-stone-600" : "bg-stone-400"
            }`}
          ></button>
        ))}
      </div>

      {/* Reviews Section */}
      <div className="min-h-[220px] max-w-[1200px] text-center mt-4 mx-2">
        <motion.div
          key={index} // Forces Framer Motion to animate on index change
          initial={{ opacity: 0 }} // Start fade-in effect
          animate={{ opacity: 1 }} // Fade in smoothly
          exit={{ opacity: 0 }} // Fade out effect
          transition={{ duration: 0.6 }} // Smooth 0.6s transition
          className={`${playfair.className} text-lg sm:text-xl md:text-2xl lg:text-4xl text-stone-500`}
        >
          {reviews[index]}
          {/* White Stars */}
          <div className="flex justify-center gap-2 mt-5">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <FaStar
                  key={i}
                  className="text-white text-lg sm:text-xl md:text-2xl"
                />
              ))}
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}
