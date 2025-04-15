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
          Framing Dragon is a custom framing studio located in Mill Valley, California, dedicated to preserving and showcasing the meaningful pieces in your life. With over 30 years of experience, we specialize in high-quality, archival framing for artwork, photography, documents, memorabilia, and more.
        </p>

        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
          We believe that framing is both an art and a craft. Each piece we frame is handled with care, attention to detail, and a commitment to longevity. From classic frames to modern designs, our curated selection of materials ensures we can match a wide variety of styles and preferences.
        </p>

        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
         Whether you`re a local artist, a collector, or someone looking to frame a sentimental item, our team is here to guide you through the process and help bring your vision to life. At Framing Dragon, we’re passionate about creating frames that not only protect but also enhance what matters most.
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
