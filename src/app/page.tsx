// COMPONENTS
import Banner from "./components/home-components/Banner";
import Reviews from "./components/home-components/Reviews";
import Picture from "./components/home-components/Picture";
import Carousel from "./components/home-components/Carousel";
import Work from "./components/home-components/Work";

// HOME
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Banner />
      <Reviews />
      <Picture />
      <Carousel />
      <Work />
    </div>
  );
}
