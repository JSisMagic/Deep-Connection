import { Box, Button, Flex, Heading, Link as ChakraLink, Stack, useBreakpointValue  } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../services/auth.services"
import { Link } from "react-router-dom"
import { publicNavLinks } from "../../common/constrants"
import Logo from "../Logo/Logo"

const LandingHeader = ({ handleClickNavLink }) => {
  const navigate = useNavigate()
  const direction = useBreakpointValue({ base: "column", md: "row" });

  return (
    <Box
      padding="1rem 2rem"
      position="fixed"
      top={0}
      right={0}
      left={0}
      zIndex={2}
    >
      <Stack direction={direction} spacing={6} align="center" justify="space-between" width="100%">
        <Flex gap={8} align="center" color="white">
          <Logo handleClickNavLink={handleClickNavLink} />
          <Flex gap={3} align="center">
            <ChakraLink
              fontSize={20}
              fontWeight={600}
              onClick={() => handleClickNavLink(publicNavLinks.events)}
            >
              Events
            </ChakraLink>
            <ChakraLink
              fontSize={20}
              fontWeight={600}
              onClick={() => handleClickNavLink(publicNavLinks.aboutUs)}
            >
              About us
            </ChakraLink>
          </Flex>
        </Flex>
        <Flex gap={2} align="center">
          <Button
            variant="outline"
            color="white"
            _hover={{ bg: "rgba(255,255,255, .2)" }}
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button
            variant="outline"
            color="white"
            _hover={{ bg: "rgba(255,255,255, .2)" }}
            onClick={() => navigate("/register")}
          >
            Sign up
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}

export default LandingHeader
