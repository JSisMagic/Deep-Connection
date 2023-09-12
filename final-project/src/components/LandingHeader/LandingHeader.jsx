import {
  Box,
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  Stack,
  useBreakpointValue,
  ButtonGroup,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../services/auth.services"
import { Link } from "react-router-dom"
import { publicNavLinks } from "../../common/constrants"
import Logo from "../Logo/Logo"
import { useEffect, useState } from "react"
import bgImage from "../../assets/images/hero.png"

const LandingHeader = ({ handleClickNavLink }) => {
  const navigate = useNavigate()
  const direction = useBreakpointValue({ base: "column", md: "row" })
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true)

  const listenToScrollEvent = ev => {
    if (window.scrollY >= window.innerHeight - 200) {
      setIsHeaderTransparent(false)
    } else {
      setIsHeaderTransparent(true)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", listenToScrollEvent)
  }, [])

  return (
    <Box
      bg={!isHeaderTransparent && `url(${bgImage})`}
      backgroundFilter="blur(10px)"
      boxShadow={!isHeaderTransparent && "md"}
      transition={"all 0.2s linear"}
      padding="1rem 2rem"
      position="fixed"
      top={0}
      right={0}
      left={0}
      zIndex={2}
    >
      <Stack direction={direction} spacing={6} align="center" justify="space-between" width="100%">
        <Flex gap={8} align="center" color={"white"}>
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
        <ButtonGroup variant={"outline"} gap={2} align="center">
          <Button
            color={"white"}
            _hover={{ bg: "rgba(255,255,255, .2)" }}
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button
            color={"white"}
            _hover={{ bg: "rgba(255,255,255, .2)" }}
            onClick={() => navigate("/register")}
          >
            Sign up
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  )
}

export default LandingHeader
