import { Box, Button, Heading, Stack } from "@chakra-ui/react"
import HeroImg from "../../assets/images/hero.png"

const Hero = () => {
  return (
    <Box position="relative" direction="column">
      <Stack
        zIndex={10}
        left={0}
        right={0}
        textAlign="center"
        height="100vh"
        bgImage={HeroImg}
        justify="center"
      >
        <Stack>
          <Heading size="2xl" maxWidth={{ lg: "40%" }} marginInline="auto">
            Welcome to Deep Connection!
          </Heading>
          <Heading maxWidth={{ lg: "50%" }} marginInline="auto" size="lg">
            Unite, Innovate, and Empower
          </Heading>
        </Stack>
        <Button marginTop={10} size="lg" width="200px" marginInline="auto">
          Get started
        </Button>
      </Stack>

      {/* <Image height="100%" width="100%" opacity="70%" src={HeroImg} /> */}
    </Box>
  )
}

export default Hero
