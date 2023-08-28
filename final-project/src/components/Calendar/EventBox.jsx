import { Box } from "@chakra-ui/react";

const EventBox = ({ title, isUsedInWeek }) => {
  return (
    <Box
      border="1px grey"
      bg="blue.100"
      // marginInline="auto"
      w={isUsedInWeek ? "100%" : "full"}
      height="full"
      opacity="55%"
    >
      {title}
    </Box>
  );
};

export default EventBox;
