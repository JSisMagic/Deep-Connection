import { useEffect, useState } from 'react';
import { Box, Text, Image, Flex, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { getWeather } from '../../services/weather.service';
import { weatherIcon } from '../../common/weather-icons.enum';

export default function Weather() {
  const [state, setState] = useState({ location: null, weather: null });
  // const toast = useToast();
  // const { addToast } = useContext(AppContext);

  const setLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState((state) => ({
          ...state,
          location: position.coords.latitude + ',' + position.coords.longitude,
        }));
      },
      (error) => {
        // addToast({
        //   title: 'Error',
        //   description: error.message,
        //   status: 'error',
        // });
        console.log(error.message);
      }
    );
  };

  useEffect(() => setLocation(), []);

  useEffect(() => {
    if (state.location === null) return;

    getWeather(state.location)
      .then((response) => response.json())
      .then((data) => setState((state) => ({ ...state, weather: data })))
      .catch((e) => {
        // addToast({
        //   title: 'Error',
        //   description: e.message,
        //   status: 'error',
        // });
        console.log(e.message);
      });
  }, [state.location]);

  const tempCalc = (f) => {
    const val = parseFloat(f);
    return ((val - 32) / 1.8).toFixed();
  };

  return (
    <>
      {/* <Alert status="error">
        <AlertIcon />
        <AlertDescription>Couldnt fetch weather data!</AlertDescription>
      </Alert> */}
      <Box p={4} bg="gray.200" borderWidth="1px" borderRadius="xl" mt={2} mb={4} display={{ base: 'flex', md: 'block' }} flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-around" alignItems="center">
        <Flex flexDirection="column" alignItems="center" mb={{ base: 2, md: 0 }}>
          <Text fontSize="lg">Current Weather</Text>
          <Text>{state.weather?.timezone}</Text>
          <Text>{new Date(Date.now()).toDateString()}</Text>
        </Flex>
        <Image src={weatherIcon[state.weather?.currentConditions.icon] || weatherIcon['cloudy']} alt={state.weather?.currentConditions.icon} boxSize="20" objectFit="contain" />
        <Flex flexDirection="row" alignItems="center" justifyContent="center" mt={{ base: 2, md: 0 }}>
          <Text fontSize="5xl" fontWeight="medium" color="teal.500">
            {isNaN(tempCalc(state.weather?.currentConditions.temp)) ? 0 : tempCalc(state.weather?.currentConditions.temp)}
            &#176;C
          </Text>
          <Flex flexDirection="column" alignItems="center" ml={2}>
            <Text>{state.weather?.currentConditions.conditions}</Text>
            <Text fontSize="md" fontWeight="bold" color="teal.500">
              {isNaN(tempCalc(state.weather?.days[0].tempmin)) ? 0 : tempCalc(state.weather?.days[0].tempmin)}
              &#176;C
            </Text>
            <Text fontSize="md" fontWeight="bold" color="teal.500">
              {isNaN(tempCalc(state.weather?.days[0].tempmax)) ? 0 : tempCalc(state.weather?.days[0].tempmax)}
              &#176;C
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Text fontSize="md" fontWeight="medium">
            Wind
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="teal.500">
            {state.weather?.currentConditions.windspeed}km/h
          </Text>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Text fontSize="md" fontWeight="medium">
            Humidity
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="teal.500">
            {state.weather?.currentConditions?.humidity?.toFixed()}%
          </Text>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Text fontSize="md" fontWeight="medium">
            Visibility
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="teal.500">
            {state.weather?.currentConditions?.visibility?.toFixed()}km
          </Text>
        </Flex>
      </Box>
    </>
  );
}
