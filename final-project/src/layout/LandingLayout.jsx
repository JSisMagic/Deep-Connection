import { Box } from "@chakra-ui/react"
import LandingHeader from "../components/LandingHeader/LandingHeader"
import LandingFooter from "../components/LandingFooter/LandingFooter"
import Hero from "../components/Hero/Hero"

const LandingLayout = () => {
  return (
    <Box height="100vh" position="relative">
      <LandingHeader />
      <Hero />
      <LandingFooter />
    </Box>
  )
}

export default LandingLayout
