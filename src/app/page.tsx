'use client';
import QueryComponent from '../components/QueryComponent';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const carouselItems = [
    {
      text: 'Knowledge',
      image: 'https://i.gifer.com/E2Ak.gif',
    },
    {
      text: 'Growth',
      image: 'https://i.gifer.com/MPu0.gif',
    },
    {
      text: 'Empowerment',
      image: 'https://i.gifer.com/7yvN.gif',
    },
    {
      text: 'Transformation',
      image: 'https://i.gifer.com/N9OM.gif',
    },
    {
      text: 'Confidence',
      image: 'https://i.gifer.com/7w4o.gif',
    },
    {
      text: 'Well-being',
      image: 'https://i.gifer.com/rU.gif',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) { // Only change slide if not hovered
        setCurrentIndex((prevIndex) =>
          prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [isHovered]); // Depend on hover state

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-white p-4">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-bold text-pastel-green">Navigating Girlhood to Womanhood</h1>
      </header>

      <QueryComponent />

      <div className="carousel-container w-full max-w-4xl mb-8 relative text-center">
        <div className="carousel-text text-4xl font-bold text-pastel-green mb-4">
          {carouselItems[currentIndex].text}
        </div>
        <div
          className="carousel-image relative w-full flex justify-center"
          onMouseEnter={() => setIsHovered(true)} // Pause on hover
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={carouselItems[currentIndex].image}
            alt={carouselItems[currentIndex].text}
            className="rounded-lg shadow-lg transition-all duration-300" // Add smooth transition
            style={{ width: '400px', height: '400px', objectFit: 'cover' }}
          />
        </div>
        <div className="carousel-controls absolute inset-0 flex justify-between items-center p-4">
          <button
            className="bg-blush-pink text-white p-2 rounded-full"
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
              )
            }
          >
            &#9664;
          </button>
          <button
            className="bg-blush-pink text-white p-2 rounded-full"
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
              )
            }
          >
            &#9654;
          </button>
        </div>
      </div>
    </div>
  );
}
