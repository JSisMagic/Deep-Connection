import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../../common/constrants";
import ProfileCard from "./ProfileCard";
import { CloseIcon } from "@chakra-ui/icons";
import { logoutUser } from "../../services/auth.services";
import { IoIosNotificationsOutline } from "react-icons/io";

const Sidebar = ({ notificationCount }) => {
  const { showSidebar, showMobileSidebar, hideMobileSidebar } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const navLink = (link) => (
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
        <Text>{link.title} {link.notificationCount ? `(${link.notificationCount})` : ''}</Text>
      </Flex>
    </NavLink>
  )

  return (
    <Box
      display={{
        base: showMobileSidebar ? "block" : "none",
        lg: showSidebar ? "block" : "none",
      }}
      h="100vh"
      zIndex={100}
      width={{ base: "100vw", md: "320px" }}
      pos={{ base: "fixed", md: "static" }}
      // Updated background gradient from purple to blue
      bg="linear-gradient(135deg, #8232B2, #3490E3)"
      p="1rem"
      textColor="white"
    >
      <Flex direction="column" h="100%">
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
        <Stack flex={1} marginTop={6} fontWeight={600}>
          {navLinks.map((link) => navLink(link))}
          {navLink({ title: "Notifications", path: "/notifications", icon: IoIosNotificationsOutline, notificationCount })}
        </Stack>
        <Flex mt="auto" alignItems="center" paddingLeft="1rem">
          <Button size="sm" width="1/3" onClick={handleLogout}>
            Log out
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
