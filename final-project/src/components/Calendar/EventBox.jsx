import { Box, Heading } from "@chakra-ui/react"
import { categoryColors } from "../../common/colors"
import { format } from "date-fns"

const EventBox = ({ title, color = "blue", startDate, isUsedInWeek }) => {
  return (
    <Box
      border="1px grey"
      bg="blue.100"
      // marginInline="auto"
      w={isUsedInWeek ? "100%" : "full"}
      height="full"
      overflowWrap="break-word"
      color={`rgb(${categoryColors[color]})`}
      // color="gray.600"
      backgroundColor={`rgba(${categoryColors[color]}, .2)`}
      padding={2}
    >
      <Box>
        <Heading fontSize={12} fontWeight={700} maxW="150px" mb={1}>
          {format(startDate, "H:mm")}
        </Heading>
        <Heading noOfLines={3} size={{ base: "xs" }} fontWeight={600} maxW="170px">
          {title}
        </Heading>
      </Box>
    </Box>
  )
}

export default EventBox
