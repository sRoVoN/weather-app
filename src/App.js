import { useEffect, useState } from "react";
import LocalWeather from "./components/LocalWeather";
import Carousel from "./components/Carousel";


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]); 
  const cities = [
    {
        name:'London'
     },
     {
        name: 'Berlin'
     },
     {
        name: 'New York'
     },
     {
        name: 'Tokyo'
     },
     {
        name: 'Paris'
     }
  ];


   
  // Fetch weather data for each city
  const fetchFaveLocationsData = async () => {
    setLoading(true);
    setError(null);  // Clear any previous errors
    
    try {
      const weatherPromises = cities.map(city =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=ad1638d70d18524d5c67056b3e47f843&units=metric`
        ).then(response => response.json())
      );

      const weatherResponses = await Promise.all(weatherPromises);

      setLocations(weatherResponses);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ad1638d70d18524d5c67056b3e47f843&units=metric`;
    console.log(`Request URL: ${url}`);
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      if (data.weather && data.main) {
        setWeatherData({
          city: data.name,
          description: data.weather[0].description,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          feelsLike: data.main.feels_like,
          windSpeed: data.wind.speed,
        });
      } else {
        setError("Weather data not available");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getWeather(latitude, longitude);
      });
    }
  };

  useEffect(() => {
    getCurrentWeather();
    fetchFaveLocationsData();
  }, []);
  return (
    <div className="flex flex-col items-center bg-sky-100 w-screen h-screen">
      {loading && <div> Loading ....</div>}
      {weatherData && <LocalWeather weatherData={weatherData} />}
      { locations && <Carousel cities={cities} locations={locations} />}
    </div>
  );
}

export default App;
