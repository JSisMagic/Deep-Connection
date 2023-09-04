import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Flex,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { getWeather } from "../../services/weather.service";
import { weatherIcon } from "../../common/weather-icons.enum";

// Import the icons with unique names
import { WiStrongWind, WiHumidity, WiCloudy } from "react-icons/wi";

export default function Weather() {
  const [state, setState] = useState({ location: null, weather: null });

  const setLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState((state) => ({
          ...state,
          location: position.coords.latitude + "," + position.coords.longitude,
        }));
      },
      (error) => {
        console.log(error.message);
      }
    );
  };

  useEffect(() => {
    setLocation();
  }, []);

  useEffect(() => {
    if (state.location === null) return;

    getWeather(state.location)
      .then((response) => response.json())
      .then((data) => setState((state) => ({ ...state, weather: data })))
      .catch((e) => {
        console.log(e.message);
      });
  }, [state.location]);

  const tempCalc = (f) => {
    const val = parseFloat(f);
    return ((val - 32) / 1.8).toFixed();
  };

  return (
    <Box p={4} bg="gray.200" borderWidth="1px" borderRadius="xl" mt={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box flex="1" textAlign="center">
          <Image
            src={
              weatherIcon[state.weather?.currentConditions.icon] ||
              weatherIcon["cloudy"]
            }
            alt={state.weather?.currentConditions.icon}
            boxSize="20"
            objectFit="contain"
          />
        </Box>
        <Box flex="2">
          <Text fontSize="lg" fontWeight="bold">
            Current Weather
          </Text>
          <Text>{state.weather?.timezone}</Text>
          <Text>{new Date(Date.now()).toDateString()}</Text>
        </Box>
        <Box flex="2" textAlign="center">
          <Text fontSize="5xl" fontWeight="bold" color="teal.500">
            {isNaN(tempCalc(state.weather?.currentConditions.temp))
              ? 0
              : tempCalc(state.weather?.currentConditions.temp)}
            &#176;C
          </Text>
          <Text>{state.weather?.currentConditions.conditions}</Text>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Box flex="1" textAlign="center">
          <Text fontSize="md" fontWeight="medium">
            Wind
          </Text>
          <Flex alignItems="center">
            <WiStrongWind size={24} />
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              {state.weather?.currentConditions.windspeed}km/h
            </Text>
          </Flex>
        </Box>
        <Box flex="1" textAlign="center">
          <Text fontSize="md" fontWeight="medium">
            Humidity
          </Text>
          <Flex alignItems="center">
            <WiHumidity size={24} />
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              {state.weather?.currentConditions?.humidity?.toFixed()}%
            </Text>
          </Flex>
        </Box>
        <Box flex="1" textAlign="center">
          <Text fontSize="md" fontWeight="medium">
            Visibility
          </Text>
          <Flex alignItems="center">
            <WiCloudy size={24} />
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              {state.weather?.currentConditions?.visibility?.toFixed()}km
            </Text>
          </Flex>
        </Box>
      </Flex>
      {/* Uncomment this section if you want to display an error message */}
      {/* <Alert status="error" mt={4}>
        <AlertIcon />
        <AlertDescription>Could not fetch weather data!</AlertDescription>
      </Alert> */}
    </Box>
  );
}
