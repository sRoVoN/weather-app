import React from "react";
import sunnyPic from "../assist/images/sunny.jpg";
import rainyPic from "../assist/images/rainy.jpg";
import snowyPic from "../assist/images/snowy.jpg";
import cloudyPic from "../assist/images/cloudy.jpg";
import hazyPic from "../assist/images/haze.jpg";
import defaultPic from "../assist/images/image-1.jpg";

export default function LocalWeather({ weatherData }) {
  const getWeatherPic = (description) => {

    switch(description.toLowerCase()){
      case "clear sky":
        return sunnyPic;
      case "rain":
      case "light rain":
      case "moderate rain":
        return rainyPic;
      case "snow":
      case "light snow":
        return snowyPic;
      case "cloudy":
      case "scattered clouds":
        return cloudyPic;
      case "haze":
        return hazyPic;
      default:
        return defaultPic;
    }
  };
  const weatherImage = getWeatherPic(weatherData.description);
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5">
      <a href="#">
        <img className="rounded-t-lg w-72 h-52 object-cover" src={weatherImage} alt={weatherImage.description}  />
      </a>
      <div className="p-5 flex flex-col justify-center items-center">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {weatherData.city}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {weatherData.description}
        </p>
        <p className="mb-3 font-normal text-2xl text-gray-700 dark:text-gray-400">
          {`${weatherData.temperature}\u00B0C`}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {`Feels Like: ${weatherData.feelsLike}\u00B0C`}
        </p>
      </div>
    </div>
  );
}
