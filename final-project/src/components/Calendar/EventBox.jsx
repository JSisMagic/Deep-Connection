import { Box, Heading } from "@chakra-ui/react"

const EventBox = ({ title, isUsedInWeek }) => {
  return (
    <Box
      border="1px grey"
      bg="blue.100"
      // marginInline="auto"
      w={isUsedInWeek ? "100%" : "full"}
      height="full"
      opacity="55%" 
      overflowWrap="break-word"
    >
      <Heading noOfLines={3} size={{ base: "xs", xl: "sm" }} maxW="150px">
        {title}
      </Heading>
    </Box>
  )
}

export default EventBox
