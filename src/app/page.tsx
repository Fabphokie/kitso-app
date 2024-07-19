'use client'
import QueryComponent from "../components/QueryComponent"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-white p-4">
      
      <div className="carousel mb-4">
        <div className="carousel-text text-4xl font-bold text-pastel-green animate-marquee">
          <span> Knowledge | Growth | Innovation </span>
          
        </div>
      </div>
      <QueryComponent/>
      <div className="w-full max-w-4xl">
        <div className="relative pb-9/16">
          <iframe
            allowFullScreen
            frameBorder="0"
            src="https://giphy.com/embed/CHJAZ8hZUsH3yyBw4q/video"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>

    </div>
  );
}
