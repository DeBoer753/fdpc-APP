"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start p-6 lg:p-10 gap-5 max-w-[1200px] mx-auto">
      
      {/* Static Image Section */}
      <motion.div
        className="w-full lg:w-[50%] flex justify-center lg:mt-auto lg:mb-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
      >
        <Image
          src="/imgs/about-photo.jpg"
          alt="About Image"
          width={800}
          height={600}
          className="object-contain w-[80%] sm:w-[60%] md:w-[40%] lg:w-[70%]"
          priority
        />
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="flex flex-col gap-5 w-full lg:w-[40%] lg:pt-0 lg:pr-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1.5 } }}
        viewport={{ once: true }}
      >
        <h1 className="text-stone-500 italic text-2xl sm:text-3xl font-thin text-center lg:text-left lg:ml-5">
          About
        </h1>

        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
          Before becoming involved in the framing industry, Raphael often traveled for work and he grew concerned about time slipping away from his family. He imagined missing out on the small moments that make a life full.
        </p>

        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
          One day, he noticed the office plants kept dying under the harsh fluorescent lights. The building staff would then swap them out with fresh ones. That stuck with Raphael — how easily things were replaced instead of cared for.
        </p>

        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
          Around that same time, he heard about a local frame shop closing that had originally opened in 1976. Curious, he walked in — and walked out with a new chapter. The original owner, a skilled master framer named Bill, took Raphael under his wing.
        </p>

        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
          For five years, Bill trained him in the art and discipline of custom framing. Eventually, Raphael took over the business and became the new steward of Framing Dragon — where he’s been framing with purpose for over 30 years.
        </p>


        <a href="/route-services" className="mx-auto">
          <button className=" px-6 py-3 border-4 border-[#a67c52] bg-white text-stone-500 text-md font-medium transition-all duration-300 hover:text-white hover:bg-stone-400 cursor-pointer">
            Our Services
          </button>
        </a>

      </motion.div>
    </div>
  );
}
