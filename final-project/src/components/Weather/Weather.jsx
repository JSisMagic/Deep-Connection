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

  const gradientBackground = {
    background: "linear-gradient(to bottom, #FFC0CB, #FF69B4)",
  };

  return (
    <Box
      p={4}
      borderRadius="lg"
      mt={4}
      boxShadow="md"
      style={gradientBackground}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box flex="1" textAlign="center">
          <Image
            src={
              weatherIcon[state.weather?.currentConditions.icon] ||
              weatherIcon["cloudy"]
            }
            alt={state.weather?.currentConditions.icon}
            boxSize="50px"
            objectFit="contain"
          />
        </Box>
        <Box flex="2">
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Current Weather
          </Text>
          <Text color="gray.600" fontSize="sm" textAlign="center">
            {state.weather?.timezone}
          </Text>
          <Text color="gray.600" fontSize="sm" textAlign="center">
            {new Date(Date.now()).toLocaleDateString()}
          </Text>
        </Box>
        <Box flex="2" textAlign="center">
          <Text fontSize="4xl" fontWeight="bold" color="teal.500">
            {isNaN(tempCalc(state.weather?.currentConditions.temp))
              ? 0
              : tempCalc(state.weather?.currentConditions.temp)}
            &#176;C
          </Text>
          <Text color="gray.600" fontSize="md" textAlign="center">
            {state.weather?.currentConditions.conditions}
          </Text>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Box flex="1" textAlign="center">
          <Text fontSize="md" fontWeight="medium" textAlign="center">
            Wind
          </Text>
          <Flex alignItems="center" mt={1}>
            <WiStrongWind size={36} color="pink.500" />
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              {state.weather?.currentConditions.windspeed} km/h
            </Text>
          </Flex>
        </Box>
        <Box flex="1" textAlign="center">
          <Text fontSize="md" fontWeight="medium" textAlign="center">
            Humidity
          </Text>
          <Flex alignItems="center" mt={1}>
            <WiHumidity size={36} color="pink.500" />
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              {state.weather?.currentConditions?.humidity?.toFixed()}%
            </Text>
          </Flex>
        </Box>
        <Box flex="1" textAlign="center">
          <Text fontSize="md" fontWeight="medium" textAlign="center">
            Visibility
          </Text>
          <Flex alignItems="center" mt={1}>
            <WiCloudy size={36} color="pink.500" />
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              {state.weather?.currentConditions?.visibility?.toFixed()} km
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
