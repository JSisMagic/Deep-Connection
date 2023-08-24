import { useState, useMemo } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Box, VStack } from "@chakra-ui/react";

import GoogleMapComponent from "./GoogleMaps";
import PlacesAutocomplete from "./PlacesAutocomplete";

const GOOGLE_MAPS_API_KEY = "AIzaSyCs89FEdCghqxYJoWMICN59cqhVOYyRLgs";

const PlacesWrapper = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  if (!isLoaded) return <Box>Loading...</Box>;

  return (
    <VStack>
      <Box>
        <PlacesAutocomplete setSelected={setSelected} />
      </Box>
      <GoogleMapComponent center={center} selected={selected} />
    </VStack>
  );
};

export default PlacesWrapper;
