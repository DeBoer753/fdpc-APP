// COMPONENTS
import Banner from "./Banner";
import Reviews from "./Reviews";
import Picture from "./Picture";
import Carousel from "./Carousel"

// HOME
export default function Home() {

  return (
    <div className="flex flex-col items-center">

      <Banner/>
      <Reviews/>
      <Picture/>
      <Carousel/>

    </div>
  );
}
