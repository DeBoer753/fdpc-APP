"use client";

import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom left/right arrow component
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

export default function Work() {
  const images = ["home-work-1.jpg", "home-work-2.jpg"];
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="flex flex-col items-center p-6 lg:p-10 max-w-[1200px] mx-auto">
      {/* Desktop Grid View */}
      <div className="hidden md:flex justify-center gap-5">
        {images.map((img, index) => (
          <Image
            key={index}
            src={`/imgs/${img}`}
            alt={`Work Image ${index + 1}`}
            width={400}
            height={400}
            className="object-contain w-full max-w-[500px]"
            priority
          />
        ))}
      </div>

			{/* Mobile Carousel View */}
			<div className="block md:hidden relative w-full max-w-[300px] mx-auto mt-5">
				<Arrow direction="left" onClick={() => sliderRef?.slickPrev()} />
				<Slider {...settings} ref={setSliderRef}>
					{images.map((img, index) => (
						<div key={index} className="relative w-full h-[350px] border-2 border-stone-500">
							<Image
								src={`/imgs/${img}`}
								alt={`Work Image ${index + 1}`}
								fill
								className="object-cover"
							/>
						</div>
					))}
				</Slider>
				<Arrow direction="right" onClick={() => sliderRef?.slickNext()} />
			</div>

    </div>
  );
}
