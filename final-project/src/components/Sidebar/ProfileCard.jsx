import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Flex
      gap={3}
      onClick={() => navigate(`/profile/${userData.uid}`)}
      cursor="pointer"
    >
      <Avatar src={userData?.profilePicture} />
      <Box>
        <Heading size="md">
          {userData?.firstName} {userData?.lastName}
        </Heading>
        <Text fontWeight={600}>@{userData?.username}</Text>
      </Box>
    </Flex>
  );
};

export default ProfileCard;
