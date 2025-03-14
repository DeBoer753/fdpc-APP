import Image from "next/image";

export default function About() {
  return (
    <div className="flex justify-center min-h-screen p-10 gap-5">
     
        <Image
          src="/imgs/home-frame-store.png"
          alt="About Image"
          width={900}
          height={600}
          className="object-cover"
        />
   
      <div className="flex flex-col gap-5 w-[80%]">

        <h1 className="text-stone-500 italic text-3xl font-thin p-4 ml-2 text-left ">
          About
        </h1>

        <p className="text-stone-500  p-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
        </p>

        <p className="text-stone-500 p-6 ">
          Fusce vel nulla eget odio tempus tincidunt. Phasellus nec odio non
          ligula placerat hendrerit. Curabitur sed risus in tortor ornare mollis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
        </p>


        <p className="text-stone-500 p-6 ">
          Fusce vel nulla eget odio tempus tincidunt. Phasellus nec odio non
          ligula placerat hendrerit. Curabitur sed risus in tortor ornare mollis.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          libero nec urna fermentum commodo non eget ligula. Suspendisse potenti.
        </p>
      </div>
      
    </div>
  );
}
