"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaHandPointer } from "react-icons/fa";

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(true);

  // Hide tooltip after 3 seconds
  useEffect(() => {
    if (isModalOpen) {
      setShowTooltip(true);
      const timer = setTimeout(() => setShowTooltip(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  // Reverse Zoom Direction: Scrolling down zooms in, scrolling up zooms out
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9; // Reversed zoom direction
    setScale((prev) => Math.min(Math.max(prev * zoomFactor, 1), 4)); // Limit zoom between 1x and 4x
  };

  // Handle drag for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPosition({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTranslate({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset zoom on double-click
  const resetZoom = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start p-6 lg:p-10 gap-5 max-w-[1200px] mx-auto">
      
      {/* Image Section with Click Event to Open Modal */}
      <motion.div
        className="w-full lg:w-[50%] flex justify-center lg:mt-auto lg:mb-auto cursor-pointer relative group"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image with Hover Effect */}
        <Image
          src="/imgs/about-photo.png"
          alt="About Image"
          width={800}
          height={600}
          className="object-contain w-[90%] sm:w-[70%] md:w-[40%] lg:w-[70%] transition-opacity duration-300 group-hover:opacity-60"
          priority
        />

        {/* Pointer Icon (Appears on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaHandPointer className="text-stone-900 text-4xl drop-shadow-lg" />
        </div>
      </motion.div>

      {/* Modal for Image Zoom */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 backdrop-blur-lg bg-black/80 flex items-center justify-center z-50 p-5 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>

          {/* Scroll to Zoom Tooltip */}
          {showTooltip && (
            <div className="absolute top-10 bg-white text-gray-800 px-4 py-2 rounded-md shadow-md text-sm opacity-100 transition-opacity duration-1000">
              Scroll to Zoom (Down to Zoom In, Up to Zoom Out)
            </div>
          )}

          {/* Zoomable & Draggable Image */}
          <div
            className="relative w-auto max-w-[90vw] max-h-[90vh] overflow-hidden cursor-grab active:cursor-grabbing"
            ref={imageRef}
            onWheel={handleWheel}
            onDoubleClick={resetZoom}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
              transition: isDragging ? "none" : "transform 0.2s ease-out",
            }}
          >
            <Image
              src="/imgs/about-photo.png"
              alt="Zoomed Image"
              width={1000}
              height={800}
              className="object-contain w-full h-full"
            />
          </div>
        </motion.div>
      )}

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
        </p>

        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
          Fusce vel nulla eget odio tempus tincidunt. Phasellus nec odio non ligula placerat hendrerit. Curabitur sed risus in tortor ornare mollis.
        </p>
      </motion.div>
      
    </div>
  );
}
