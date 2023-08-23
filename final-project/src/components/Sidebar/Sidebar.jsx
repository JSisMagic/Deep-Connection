import { Box, Button, Flex, Heading, Icon, IconButton, Stack, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { NavLink, useNavigate } from "react-router-dom"
import { navLinks } from "../../common/constrants"
import ProfileCard from "./ProfileCard"
import { CloseIcon } from "@chakra-ui/icons"
import { logoutUser } from "../../services/auth.services"

const Sidebar = () => {
  const { showSidebar, showMobileSidebar, hideMobileSidebar } = useContext(AppContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/")
  }

  return (
    <Box
      display={{ base: showMobileSidebar ? "block" : "none", lg: showSidebar ? "block" : "none" }}
      h="100vh"
      zIndex={10}
      width={{ base: "50vw", md: "320px" }}
      pos={{ base: "fixed", md: "static" }}
      bg="linear-gradient(#8232B2, #AD85EE)"
      p="1rem"
      textColor="white"
    >
      <Flex justify="space-between" p={2}>
        <ProfileCard />
        <IconButton
          display={{ base: showMobileSidebar ? "block" : "none" }}
          color="white"
          bg="transparent"
          icon={<CloseIcon />}
          onClick={hideMobileSidebar}
          _focus={{ bg: "transparent" }}
        />
      </Flex>
      <Stack marginTop={6} fontWeight={600}>
        {navLinks.map(link => (
          <NavLink
            key={link.title}
            to={link.path}
            style={({ isActive }) => ({
              background: isActive && "rgba(0,0,0,.1)",
              borderRadius: "8px",
              padding: "1rem",
            })}
            onClick={hideMobileSidebar}
          >
            <Flex align="center" gap={2}>
              <Icon boxSize={6} as={link.icon} />
              <Text>{link.title}</Text>
            </Flex>
          </NavLink>
        ))}
      </Stack>
      <Button onClick={handleLogout}>Log out</Button>
    </Box>
  )
}

export default Sidebar
