export default function Home() {
  return (
    <div className="relative w-full h-[400px] sm:h-[530px] bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-75"
        style={{
          backgroundImage: "url('/imgs/home-banner.png')",
        }}
      />

      {/* Top and Bottom Shadows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Shadow */}
        <div className="absolute top-0 w-full h-1/9 bg-gradient-to-b from-black/70 to-transparent" />
        
        {/* Bottom Shadow */}
        <div className="absolute bottom-0 w-full h-1/9 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
    </div>
  );
}
