import React, { useState} from 'react';


const Carousel = ({cities, locations}) => {
  const [currentIndex, setCurrentIndex] = useState(0);  // Track the current active slide
  const [weatherData, setWeatherData] = useState([]);  // Store weather data for all cities
  const [loading, setLoading] = useState(true);  // Loading state to show when fetching weather data
  const [error, setError] = useState(null);  // Error state for handling failed fetches



  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cities.length);
  };

  return (
    <div className="relative mt-3 ">    
      <div id="weather-carousel" className="relative  w-screen " data-carousel="static">
        <div className=" overflow-hidden rounded-lg ">
         
          {cities.map((city, index) => (
            <div
              key={index}
              className={`duration-200 ease-linear ${index === currentIndex ? '' : 'hidden'}`}
              data-carousel-item
            >
              
              <div className=" p-4 bg-sky-200 text-gray-500 rounded-lg">
               
                {locations[index] && (
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="font-semibold text-lg text-gray-700">{city.name}</h3>
                    <p>Temperature: {locations[index].main.temp}°C</p>
                    <p>Condition: {locations[index].weather[0].description}</p>
                    <p>Humidity: {locations[index].main.humidity}%</p>
                    <p>Wind Speed: {locations[index].wind.speed} m/s</p>
                  </div>
                )}

                {/* City Image */}
                <img
                  src={city.picture}
                  className="w-full mt-4 rounded-md"
                  alt=''
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
