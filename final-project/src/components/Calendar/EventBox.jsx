import { Box } from "@chakra-ui/react"

const EventBox = ({ title, isUsedInWeek }) => {
  return (
    <Box
      border="1px solid black"
      bg="green.100"
      // marginInline="auto"
      w={isUsedInWeek ? "98%" : "full"}
      height="full"
      opacity="60%"
    >
      {title}
    </Box>
  )
}

export default EventBox
