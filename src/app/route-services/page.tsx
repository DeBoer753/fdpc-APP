"use client"; // Ensure this file is treated as a client component

import Image from 'next/image';
import { motion } from "framer-motion";

const services = [
  "Custom Fine Framing",
  "French Mats",
  "Matting Services",
  "Glass Replacement",
  "Canvas Stretching",
  "Shadow Box Framing",
  "Conservation Framing",
  "Restoration Services",
  "Floating Frames",
  "Mirror Framing",
  "Collage and Multi-Opening Frames",
  "Diploma & Certificate Framing",
  "Jersey & Sports Memorabilia Framing",
  "Object Framing",
  "Heirloom & Keepsake Framing",
  "Vinyl Record Framing",
  "Needlework & Textile Framing",
  "Color Matching & Design Consultation",
  "Dry Mounting",
  "Gallery Wall Planning",
  "UV-Protection Glass",
  "Anti-Reflective Glass",
  "Acrylic & Plexiglass Framing",
  "Oversized or Panorama Framing",
  "Archival Backing & Taping", 
  "On-Site Consultations",
  "Pickup & Delivery Services",
  "Rush Framing",
  "Hanging Hardware Installation",
];


export default function Services() {

    return (
      <div className="flex flex-col items-center justify-start bg-gray-200 min-h-screen p-4 bg-stone-300">
        
        {/* Motion applied to the main content container */}
        <motion.div 
          className="max-w-[1200px] w-full p-6 rounded-lg flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 1 } }}
          viewport={{ once: true }}
        > 
          {/* Image Container */}
          <div className="flex justify-center">
            <Image 
              src="/imgs/services-photo.jpg" 
              alt="Services" 
              width={500} 
              height={200} 
              priority
            />
          </div>

          {/* Title */}
          <div className="flex justify-center mt-4">
            <h1 className="text-2xl sm:text-3xl font-thin text-stone-500 italic px-6 py-2">Services</h1>
          </div>

          {/* Services List */}
          <div className="mt-5 rounded-lg max-w-[400px] w-full flex justify-center">
            <ul className="list-disc list-inside text-stone-500 text-center text-base sm:text-lg xs:text-sm">
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        <a href="/route-contact">
          <button className="px-6 py-3 border-4 border-[#a67c52] bg-white text-stone-500 text-lg font-medium transition-all duration-300 hover:text-white hover:bg-stone-400 cursor-pointer mb-20">
            Contact Us
          </button>
        </a>

      </div>
    );
}
