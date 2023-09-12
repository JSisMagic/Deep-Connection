import { Box } from "@chakra-ui/react"
import { useContext } from "react"
import LandingFooter from "../components/LandingFooter/LandingFooter"
import LandingHeader from "../components/LandingHeader/LandingHeader"
import { AppContext } from "../context/AppContext"

const LandingLayout = ({ children }) => {
  const { handleClickNavLink } = useContext(AppContext)
  return (
    <Box height="100vh" position="relative">
      <LandingHeader handleClickNavLink={handleClickNavLink} />
      {children}
    
    </Box>
  )
}

export default LandingLayout
