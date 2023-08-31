import { Flex, Heading, Icon, Image, Stack, Text } from "@chakra-ui/react"
import { format } from "date-fns"
import { FaLocationDot } from "react-icons/fa6"
import FallbackImg from "../../assets/images/event.jpg"

const EventPageCard = ({ eventData }) => {
  return (
    <Flex height="220px" width="100%" gap={8} bg="gray.50" borderRadius="md" cursor="pointer">
      <Stack align="center" width="200px" py={3}>
        <Text fontWeight={500}>{format(eventData.startDate, "ccc").toUpperCase()}</Text>
        <Heading size="md">{format(eventData.startDate, "d")}</Heading>
      </Stack>
      <Stack justify="space-between" flexGrow={1} py={3}>
        <Text fontWeight={500}>
          {format(eventData.startDate, "MMMM")} @{format(eventData.startDate, "HH:mm")} -
          {format(eventData.endDate, "HH:mm O")}
        </Text>
        <Heading size="lg">{eventData.title}</Heading>
        {eventData?.location && (
          <Flex gap={1}>
            <Icon as={FaLocationDot} boxSize={6} color="red.700" />
            <Text fontWeight={600}>{eventData.location}</Text>
          </Flex>
        )}
        <Text dangerouslySetInnerHTML={{ __html: eventData.description }} />
      </Stack>
      <Image
        w="600px"
        height="220px"
        borderRadius="md"
        p={3}
        src={eventData?.image || FallbackImg}
        objectFit="cover"
      />
    </Flex>
  )
}

export default EventPageCard
