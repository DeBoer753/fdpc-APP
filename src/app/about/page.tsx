import Image from "next/image";

export default function About() {
  return (
<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start p-6 lg:p-10 gap-5 max-w-[1200px] mx-auto">
  
      
      {/* Image Section */}
      <div className="w-full lg:w-[50%] flex justify-center lg:mt-auto lg:mb-auto">

        <Image
          src="/imgs/about-photo.png"
          alt="About Image"
          width={800}
          height={600}
          className="object-contain w-[90%] sm:w-[70%] md:w-[40%] lg:w-[70%]"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-5 w-full lg:w-[40%] lg:pt-15 lg:pr-10">
        <h1 className="text-stone-500 italic text-2xl sm:text-3xl font-thin text-center lg:text-left lg:ml-5">
          About
        </h1>



        {/* Paragraphs */}
        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
        </p>

        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
          Fusce vel nulla eget odio tempus tincidunt. Phasellus nec odio non
          ligula placerat hendrerit. Curabitur sed risus in tortor ornare mollis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
        </p>

        <p className="text-stone-500 px-4 sm:px-6 sm:text-center md:text-left lg:text-left mx-auto">
          Fusce vel nulla eget odio tempus tincidunt. Phasellus nec odio non
          ligula placerat hendrerit. Curabitur sed risus in tortor ornare mollis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
        </p>
      </div>
    </div>
  );
}
