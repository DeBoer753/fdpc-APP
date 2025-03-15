export default function Footer() {
    return (
      <footer className="bg-stone-400 py-10 px-5 w-full">
        <p className="text-center text-white">
          <span className="font-bold">© The Framing Dragon</span> | Website created by  
          <a 
            href="https://graybuckmedia.com/"
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Visit Graybuck Media (opens in a new tab)"
            className="bg-stone-300 hover:bg-stone-500 text-stone-500 hover:text-white transition-colors duration-300 text-black font-medium px-1.5 py-1 ml-2 inline-block rounded-full"
          >
            Graybuck Media
          </a>
        </p>
      </footer>
    );
  }
  