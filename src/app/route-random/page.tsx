"use client";

// PLUGINS & OTHER
import Image from "next/image";
import { motion } from "framer-motion";

// images being mapped:
const Images = [
  "/imgs/random-jim-1.jpg",
  "/imgs/random-jim-2.jpg",
  "/imgs/random-jim-3.jpg",
];

// RANDOM
export default function Random() {
  return (
    <div className="flex flex-col items-center justify-start bg-gray-200 min-h-screen p-4 bg-stone-300">
      <motion.div
        className="max-w-[1200px] w-full p-6 rounded-lg flex flex-col items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
      >
        <div className="mt-4 rounded-lg max-w-[400px] text-center w-full flex justify-center flex-col">
          <h1 className="text-2xl sm:text-3xl font-thin text-stone-500 italic px-6 mb-5">
            Random
          </h1>
          <p className="text-stone-500 text-xl">
            Welcome to the Random page — a space where anything goes. From
            spontaneous ideas to local art and everything in between, this is
            our creative catch-all. Take a look around and enjoy the unexpected.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <h2 className="text-stone-500">
            <span className="font-bold">Local Artist:</span> Jim Lavioda
          </h2>
          {Images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Jim Lavioda artwork ${index + 1}`}
              width={500}
              height={300}
              className=" shadow-lg"
              priority={index === 0} // Prioritize only the first image
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
