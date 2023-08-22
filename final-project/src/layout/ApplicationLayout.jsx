import { Box, Button } from "@chakra-ui/react"
import { logoutUser } from "../services/auth.services"

const ApplicationLayout = ({ children }) => {
  const handleLogout = () => {
    logoutUser();
  }

  //TODO structure to be changed later
  return (
    <Box>
      <Button onClick={handleLogout}>Logout</Button>
      {children}
    </Box>
  )
}

export default ApplicationLayout
