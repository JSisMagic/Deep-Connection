import { Box } from '@chakra-ui/react';
import Hero from '../../components/Hero/Hero';
import Weather from '../../components/Weather/Weather';

const LandingPage = () => {
  return (
    <Box>
      <Hero />
      <Weather />
    </Box>
  );
};

export default LandingPage;
