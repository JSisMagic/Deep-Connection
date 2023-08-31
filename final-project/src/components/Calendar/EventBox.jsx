import { Box, Heading, Flex } from "@chakra-ui/react"
import { format } from "date-fns"
import { categoryColors } from "../../common/colors"

const EventBox = ({ eventData, isUsedInWeek, isUsedInMonth, onOpenDetailedModal }) => {
  return (
    <Box
      onClick={() => onOpenDetailedModal(eventData)}
      border="1px grey"
      bg="blue.100"
      w={isUsedInWeek ? "100%" : "full"}
      height={isUsedInMonth ? "30px" : "full"}
      overflowWrap="break-word"
      color={`rgb(${categoryColors[eventData.color]})`}
      backgroundColor={`rgba(${categoryColors[eventData.color]}, .2)`}
      padding={2}
      cursor="pointer"
    >
      <Flex direction={isUsedInMonth ? "row" : "column"} gap={isUsedInMonth && 1}>
        <Heading fontSize={12} fontWeight={700} maxW="150px" mb={1}>
          {format(eventData.startDate, "H:mm")}
        </Heading>
        <Heading noOfLines={3} size={{ base: "xs" }} fontWeight={600} maxW="170px">
          {eventData.title}
        </Heading>
      </Flex>
    </Box>
  )
}

export default EventBox
