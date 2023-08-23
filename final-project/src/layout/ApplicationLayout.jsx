import { Box, Button } from "@chakra-ui/react"
import { logoutUser } from "../services/auth.services"
import { Link } from "react-router-dom"
import LandingHeader from "../components/LandingHeader/LandingHeader";


const ApplicationLayout = ({ children }) => {
  const handleLogout = () => {
    logoutUser();
  }

  //TODO structure to be changed later
  return (
    <Box height="100vh" position="relative">
      <LandingHeader />
      <Button onClick={handleLogout} position="absolute" top="1rem" right="1rem">
        Logout
      </Button>
      <Link to="/profile">
        <Button position="absolute" top="1rem" right="6rem">Profile</Button>
      </Link>
      <Box mt="100px">{children}</Box>
    </Box>
  );
};

export default ApplicationLayout;
