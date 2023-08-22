import { Box, Button, ButtonGroup, Divider, Flex, Heading, Link } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const LandingHeader = () => {
  const navigate = useNavigate()
  const handleRedirect = path => {
    return () => navigate(path)
  }

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
      // bg="rgba(255,255,255, .1)"
      // boxShadow="0px 4px 12px rgba(0,0,0,.05)"
    >
      <Flex gap={8} align="center" color="white">
        <Heading>Logo</Heading>
        <Flex gap={3} align="center">
          <Link fontSize={20} fontWeight={600}>
            Events
          </Link>

          <Link fontSize={20} fontWeight={600}>
            About us
          </Link>
        </Flex>
      </Flex>
      <Flex gap={2}>
        <Button
          variant="outline"
          color="white"
          _hover={{ bg: "rgba(255,255,255, .2)" }}
          onClick={handleRedirect("/login")}
        >
          Log in
        </Button>
        <Button
          variant="outline"
          color="white"
          _hover={{ bg: "rgba(255,255,255, .2)" }}
          onClick={handleRedirect("/register")}
        >
          Sign up
        </Button>
      </Flex>
    </Box>
  )
}

export default LandingHeader
