import { useNavigate } from "react-router-dom";
import { Flex, Avatar, Heading, Text, Box } from "@chakra-ui/react";

const EventCreatorInfo = ({ creator }) => {
  const navigate = useNavigate();

  return (
    <Box>
    <Text fontSize="5 px" color="gray.600" mb={2}>Creator:</Text>
    <Flex
      cursor="pointer"
      background="white"
      p={3}
      borderRadius="md"
      justify="space-between"
      align="center"
      boxShadow="base"
    >
      <Flex gap={3} onClick={() => navigate(`/profile/${creator.uid}`)}>
        <Avatar src={creator.profilePicture} />
        <Box>
          <Heading size="sm">
            {creator.firstName} {creator.lastName}
          </Heading>
          <Text fontWeight={600}>@{creator.username}</Text>
        </Box>
      </Flex>
      {/* You can add more buttons or actions related to the creator here */}
    </Flex>
  </Box>
  );
};

export default EventCreatorInfo;