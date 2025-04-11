"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Playfair_Display } from "next/font/google";
import { FaHandPointer } from "react-icons/fa";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
});

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const imageUrls = [
    "/imgs/home-frame-1.jpg",
    "/imgs/home-frame-2.jpg",
    "/imgs/home-frame-7.jpg",
    "/imgs/home-frame-4.jpg",
    "/imgs/home-frame-5.jpg",
    "/imgs/home-frame-6.jpg",
    "/imgs/home-frame-3.jpg",
    "/imgs/home-frame-9.jpg",
    "/imgs/home-frame-10.jpg",
    "/imgs/home-frame-11.jpg",
    "/imgs/home-frame-8.jpg",
    "/imgs/home-frame-12.jpg",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Disable page scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Show tooltip on desktop when modal opens
  useEffect(() => {
    if (isModalOpen && window.innerWidth >= 768) {
      setShowTooltip(true);
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  // Open modal with selected image
  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
    setScale(1.3);
    setTranslate({ x: 0, y: 0 });
  };

  // Scroll-based zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
    setScale((prev) => Math.min(Math.max(prev * zoomFactor, 1), 4));
  };

  // Drag-to-move image
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

  const handleMouseUp = () => setIsDragging(false);

  // Reset zoom on double-click
  const resetZoom = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Section Title */}
      <h2 className="max-w-[600px] text-center mb-15 text-stone-500 text-2xl font-thin leading-relaxed px-5 italic">
        A well chosen frame does more than protecting. It enhances, preserves, and honors the art. Our services offer timeless craftsmanship, drawing inspiration from history, theater, and minimalist design.
      </h2>

      {/* Desktop Image Grid */}
      <div className="max-w-[1000px] w-full mx-auto mb-20">
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center px-2">
          {imageUrls.map((src, index) => (
            <motion.div
              key={index}
              className="relative w-[230px] h-[230px] mx-auto border-2 border-stone-500 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              onClick={() => openModal(src)}
            >
              <Image src={src} alt={`Image ${index + 1}`} fill className="object-cover transition-opacity duration-300 group-hover:opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaHandPointer className="text-stone-900 text-3xl drop-shadow-lg" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="block md:hidden relative w-full max-w-[300px] mx-auto">
          <Arrow direction="left" onClick={() => sliderRef?.slickPrev()} />
          <Slider {...settings} ref={setSliderRef}>
            {imageUrls.map((src, index) => (
              <div key={index} className="relative w-full h-[350px] border-2 border-stone-500 cursor-pointer group" onClick={() => openModal(src)}>
                <Image src={src} alt={`Image ${index + 1}`} fill className="object-cover transition-opacity duration-300 group-hover:opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaHandPointer className="text-stone-900 text-3xl drop-shadow-lg" />
                </div>
              </div>
            ))}
          </Slider>
          <Arrow direction="right" onClick={() => sliderRef?.slickNext()} />
        </div>
      </div>

      {/* Modal for Zoomable Images */}
      {isModalOpen && selectedImage && (
        <motion.div className="fixed inset-0 backdrop-blur-lg bg-black/30 flex items-center justify-center z-50 p-5 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="absolute top-5 right-5 text-black text-3xl font-bold z-50" onClick={() => setIsModalOpen(false)}>
            &times;
          </button>

          {/* Tooltip for Scroll-Zoom (Desktop Only) */}
          {showTooltip && (
            <div className="absolute top-10 bg-stone-200 z-50 text-gray-800 px-4 py-2 rounded-md shadow-md text-sm opacity-100 transition-opacity duration-1000">
              Scroll to Zoom (Down to Zoom In, Up to Zoom Out)
            </div>
          )}

          <div className="relative w-auto max-w-[100vw] max-h-[100vh] overflow-hidden cursor-grab active:cursor-grabbing"
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
            <Image src={selectedImage} alt="Zoomed Image" width={1000} height={850} className="object-contain w-full h-full" />
          </div>
        </motion.div>
      )}

      {/* Text & Contact Button */}
      <div className="flex flex-col items-center">
        <h2 className={`${playfair.className} max-w-[600px] text-center mb-10 text-stone-500 text-3xl italic font-thin leading-relaxed px-5`}>
          ...we have plenty to choose from.
        </h2>

        <a href="/route-services">
          <button className="px-6 py-3 border-4 border-[#a67c52] bg-white text-stone-500 text-lg font-medium transition-all duration-300 hover:text-white hover:bg-stone-400 cursor-pointer mb-20">
            Our Services
          </button>
        </a>
      </div>
    </div>
  );
}
