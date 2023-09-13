import { Box, Heading, Flex } from "@chakra-ui/react"
import { format } from "date-fns"
import { categoryColors } from "../../common/colors"

const EventBox = ({ eventData, isUsedInWeek, isUsedInMonth, onOpenDetailedModal }) => {
  return (
    <Flex
      onClick={() => onOpenDetailedModal(eventData)}
      border="1px grey"
      bg="blue.100"
      height={isUsedInMonth ? "auto" : "full"} // Adjusted the height
      overflowWrap="break-word"
      color={`rgb(${categoryColors[eventData.color]})`}
      backgroundColor={`rgba(${categoryColors[eventData.color]}, .2)`}
      padding={2}
      cursor="pointer"
      gap={1}
      direction={isUsedInMonth || eventData?.durationInHours === 0 ? "row" : "column"}
    >
      <Heading fontSize={12} fontWeight={700} mb={1}>
        {format(eventData.startDate, "H:mm")}
      </Heading>
      <Heading
        textOverflow="ellipsis"
        noOfLines={isUsedInMonth || eventData?.durationInHours === 0 ? 1 : 3}
        size={{ base: "xs" }}
        fontWeight={600}
        // maxW="170px"
      >
        {eventData.title}
      </Heading>
    </Flex>
  )
}

export default EventBox
