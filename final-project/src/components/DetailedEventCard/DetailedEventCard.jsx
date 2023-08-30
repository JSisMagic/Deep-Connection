import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react"
import { format } from "date-fns"

const DetailedEventCard = ({ detailedEventData }) => {
  return (
    <Stack gap={3}>
      <Heading size="lg">{detailedEventData.title}</Heading>
      <Box p={5} bg="gray.100" borderRadius="lg">
        <Heading size="md" mb={1}>
          {format(detailedEventData.startDate, "MMMM d")}
        </Heading>
        <Text fontWeight={700}>@
          {format(detailedEventData.startDate, "HH:mm")} -{" "}
          {format(detailedEventData.endDate, "HH:mm O")}
        </Text>
      </Box>
      <Text fontSize={18} fontWeight={500}>
        {detailedEventData.description}
      </Text>
      <Box>
        <Text fontWeight="bold">Location:</Text>
        <Heading fontSize={13} fontWeight={600} maxW="150px" mb={1}>
          {detailedEventData.location}
        </Heading>
      </Box>
    </Stack>
  )
}

export default DetailedEventCard
