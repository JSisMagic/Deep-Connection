//final-react-project/final-project/src/components/Hero/Hero.jsx

import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import HeroImg from "../../assets/images/hero.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box position="relative" direction="column">
      <Stack
        zIndex={10}
        color="white"
        left={0}
        right={0}
        textAlign="left"
        height="100vh"
        bgImage={HeroImg}
        justify="center"
        spacing={6}
        padding={6}
      >
        <Heading size="4xl" maxWidth="80%" marginInline="auto">
          Deep Connection
        </Heading>
        <Heading size="xl" maxWidth="80%" marginInline="auto">
          Synchronizing Connections Through Events
        </Heading>
        <Button
          marginTop={8}
          size="lg"
          width="200px"
          marginInline="auto"
          onClick={() => navigate("/register")}
        >
          Get started
        </Button>
      </Stack>

      <Box position="absolute" left={8} bottom={8} maxWidth="60%" padding={6}>
        <Text fontSize="lg" color="white" fontWeight="bold">
          {" "}
          {/* Set color to white and font weight to bold */}
          Deep Connection is more than just an event planning platform; it's a
          gateway to a world of deep connections and meaningful experiences. We
          believe that connecting with like-minded individuals can lead to
          personal growth, and our platform is designed to make that journey
          effortless.
        </Text>
      </Box>
    </Box>
  );
};

export default Hero;
