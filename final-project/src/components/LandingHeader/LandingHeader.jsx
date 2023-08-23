import { Box, Button, Flex, Heading, Link as ChakraLink } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.services";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <Box
      padding="1rem 2rem"
      position="absolute"
      top={0}
      right={0}
      left={0}
      zIndex={2}
      display="flex"
      align="center"
      justifyContent="space-between"
    >
      <Flex gap={8} align="center" color="white">
        <Heading>Logo</Heading>
        <Flex gap={3} align="center">
          <ChakraLink fontSize={20} fontWeight={600}>
            Events
          </ChakraLink>

          <ChakraLink fontSize={20} fontWeight={600}>
            About us
          </ChakraLink>
        </Flex>
      </Flex>
      <Flex gap={2}>
        <Button variant="outline" color="white" _hover={{ bg: "rgba(255,255,255, .2)" }} onClick={() => navigate("/login")}>
          Log in
        </Button>
        <Button variant="outline" color="white" _hover={{ bg: "rgba(255,255,255, .2)" }} onClick={() => navigate("/register")}>
          Sign up
        </Button>
    </Flex>

    </Box>
  );
};

export default LandingHeader;
