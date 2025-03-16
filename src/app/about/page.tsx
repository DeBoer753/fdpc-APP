"use client";

import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

export default function About() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start p-6 lg:p-10 gap-5 max-w-[1200px] mx-auto">
      
      {/* Image Section with Opacity Transition */}
      <motion.div
        className="w-full lg:w-[50%] flex justify-center lg:mt-auto lg:mb-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
      >
        <Image
          src="/imgs/about-photo.png"
          alt="About Image"
          width={800}
          height={600}
          className="object-contain w-[90%] sm:w-[70%] md:w-[40%] lg:w-[70%]"
          priority
        />
      </motion.div>

      {/* Text Content with Opacity Transition */}
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in sdsd s
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
        </p>

        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
          Fusce vel nulla eget odio tempus tincidunt. Phasellus nec odio non
          ligula s sds sds t. Curabitur sed risus in tortor ornare mollis.
        </p>

        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
          Fusce vel nulla eget odio tempus tincidunt. Phasellus nec odio non
          ligula placerat hendrerit. Curabitur sed risus in tortor ornare mollis.
        </p>
      </motion.div>
    </div>
  );
}
