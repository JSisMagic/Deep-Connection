//final-react-project/final-project/src/pages/Landing/LandingPage.jsx
import { Box, Link as ChakraLink } from "@chakra-ui/react";
import Hero from "../../components/Hero/Hero";
import Weather from "../../components/Weather/Weather";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const LandingPage = () => {
  return (
    <Box>
      <Hero />
      <Weather />
      <Box textAlign="center" mt={4}>
        {/* Add a Link to AboutUs page */}
        <ChakraLink as={Link} to="/aboutus" color="blue.500" fontSize="xl">
          About Us
        </ChakraLink>
      </Box>
    </Box>
  );
};

export default LandingPage;
