import { WEATHER_API_KEY } from '../common/weather-constants';

export const getWeather = async (coordinates) => {
  return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${coordinates}?key=${WEATHER_API_KEY}`);
};
