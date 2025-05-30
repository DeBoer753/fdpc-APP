"use client";

// COMPONENTS
import Arrow from "../custom/Arrow";

// PLUGINS & OTHER
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Playfair_Display } from "next/font/google";
import { FaHandPointer } from "react-icons/fa";

// font
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
});

// images being mapped
const images = [
  "home-work-2.jpg",
  "home-work-1.jpg",
  "home-work-3.jpg",
  "home-work-4.jpg",
];

// WORK
export default function Work() {
  const [isMobile, setIsMobile] = useState(false);
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // navigation dots (currently do not show because it pushed down div)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // update isMobile based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // open the modal with the selected image and reset zoom/position
  const openModal = (src: string) => {
    setSelectedImage(src);
    setIsModalOpen(true);
    setScale(1.3);
    setTranslate({ x: 0, y: 0 });
  };

  // zoom the image in/out based on scroll direction
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
    setScale((prev) => Math.min(Math.max(prev * zoomFactor, 1), 4));
  };

  // begin dragging and track initial cursor position
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - translate.x,
      y: e.clientY - translate.y,
    });
  };

  // update image position while dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTranslate({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
  };

  // stop dragging on mouse release
  const handleMouseUp = () => setIsDragging(false);

  // reset zoom and image position to default
  const resetZoom = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  // disable page scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // show scroll-to-zoom tooltip briefly when modal opens on desktop
  useEffect(() => {
    if (isModalOpen && window.innerWidth >= 768) {
      setShowTooltip(true);
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <div
      className="flex flex-col items-center p-6 lg:p-10 max-w-[1200px] mx-auto"
      role="region"
      aria-labelledby="work-heading"
    >
      {isMobile ? (
        <div
          className="relative w-full max-w-[300px] mx-auto mt-5"
          role="region"
          aria-label="Work image carousel"
        >
          <Arrow direction="left" onClick={() => sliderRef?.slickPrev()} />
          <Slider {...settings} ref={setSliderRef}>
            {images.map((img, index) => (
              <div
                key={index}
                className="relative w-full h-[350px] border-2 border-stone-500 cursor-pointer group"
                onClick={() => openModal(`/imgs/${img}`)}
                role="button"
                tabIndex={0}
                aria-label={`View enlarged work image ${index + 1}`}
                onKeyDown={(e) =>
                  e.key === "Enter" && openModal(`/imgs/${img}`)
                }
              >
                <Image
                  src={`/imgs/${img}`}
                  alt={`Work image ${index + 1}`}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaHandPointer
                    className="text-stone-900 text-3xl drop-shadow-lg"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </Slider>
          <Arrow direction="right" onClick={() => sliderRef?.slickNext()} />
        </div>
      ) : (
        <div className="flex justify-center flex-wrap gap-5">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative cursor-pointer border-2 border-stone-500 group"
              onClick={() => openModal(`/imgs/${img}`)}
              role="button"
              tabIndex={0}
              aria-label={`View enlarged work image ${index + 1}`}
              onKeyDown={(e) => e.key === "Enter" && openModal(`/imgs/${img}`)}
            >
              <Image
                src={`/imgs/${img}`}
                alt={`Work image ${index + 1}`}
                width={400}
                height={400}
                className="object-contain w-full max-w-[500px] transition-opacity duration-300 group-hover:opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaHandPointer
                  className="text-stone-900 text-3xl drop-shadow-lg"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 backdrop-blur-lg bg-black/30 flex items-center justify-center z-50 p-5 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed work image"
        >
          <button
            className="absolute top-5 right-5 text-black text-3xl font-bold z-50"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close image modal"
          >
            &times;
          </button>

          {showTooltip && (
            <div className="absolute top-10 bg-white text-gray-800 px-4 py-2 rounded-md shadow-md text-sm z-50">
              Scroll to Zoom (Down to Zoom In, Up to Zoom Out)
            </div>
          )}

          <div
            className="relative w-auto max-w-[100vw] max-h-[100vh] overflow-hidden cursor-grab active:cursor-grabbing"
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
              src={selectedImage}
              alt="Zoomed view of work image"
              width={1000}
              height={850}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col items-center mt-20">
        <h2
          id="work-heading"
          className={`${playfair.className} max-w-[600px] text-center mb-10 text-stone-500 text-3xl italic font-thin leading-relaxed px-5`}
        >
          ...some work of ours.
        </h2>

        <a href="/route-contact">
          <button
            className="px-6 py-3 border-4 border-[#a67c52] bg-white text-stone-500 text-lg font-medium transition-all duration-300 hover:text-white hover:bg-stone-400 cursor-pointer mb-20"
            aria-label="Go to contact page"
          >
            Contact Us
          </button>
        </a>
      </div>
    </div>
  );
}
