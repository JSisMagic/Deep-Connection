import { useState } from "react"
import {
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react"
import { categoryColors } from "../../common/colors"
import { format } from "date-fns"

const EventBox = ({ eventData, isUsedInWeek, onOpenDetailedModal }) => {
  return (
    <Box
      onClick={() => onOpenDetailedModal(eventData)}
      border="1px grey"
      bg="blue.100"
      w={isUsedInWeek ? "100%" : "full"}
      height="full"
      overflowWrap="break-word"
      color={`rgb(${categoryColors[eventData.color]})`}
      backgroundColor={`rgba(${categoryColors[eventData.color]}, .2)`}
      padding={2}
      cursor="pointer"
    >
      <Box>
        <Heading fontSize={12} fontWeight={700} maxW="150px" mb={1}>
          {format(eventData.startDate, "H:mm")}
        </Heading>
        <Heading noOfLines={3} size={{ base: "xs" }} fontWeight={600} maxW="170px">
          {eventData.title}
        </Heading>
      </Box>
    </Box>
  )
}

export default EventBox
