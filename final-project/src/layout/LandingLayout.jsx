import { Box } from "@chakra-ui/react"
import LandingHeader from "../components/LandingHeader/LandingHeader"
import LandingFooter from "../components/LandingFooter/LandingFooter"

const LandingLayout = ({ children }) => {
  return (
    <Box height="100vh" position="relative">
      <LandingHeader />
      {children}
      <LandingFooter />
    </Box>
  )
}

export default LandingLayout
