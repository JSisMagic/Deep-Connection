import { Box, Button, Flex, Heading, Icon, Image, Stack, Text } from "@chakra-ui/react"
import { format } from "date-fns"
import { FaLocationDot } from "react-icons/fa6"
import FallbackImg from "../../assets/images/event.jpg"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { joinOrLeaveEvent } from "../../services/event.services"
import { eventActions } from "../../common/event-enums"

const EventPageCard = ({ eventData, onOpenDetailedEvent }) => {
  const { userData } = useContext(AuthContext)

  const hasJoined = userData?.events[eventData.id]

  const handleJoinOrLeave = event => {
    event.stopPropagation()

    joinOrLeaveEvent(userData, eventData.id, hasJoined ? eventActions.leave : eventActions.join)
  }

  return (
    <Flex
      p={3}
      direction={{ base: "column", lg: "row" }}
      h={{ base: "max-content", lg: "25vh" }}
      align="center"
      width="100%"
      gap={8}
      bg="gray.50"
      borderRadius="md"
      cursor="pointer"
      maxW="1500px"
      marginInline="auto"
      onClick={() => onOpenDetailedEvent(eventData)}
    >
      <Stack alignSelf={{ lg: "start" }} align="center" width="10%">
        <Text fontWeight={500}>{format(eventData.startDate, "ccc").toUpperCase()}</Text>
        <Heading size="md">{format(eventData.startDate, "d")}</Heading>
      </Stack>
      <Stack h="100%" justify="space-between" flexGrow={1} width={{ lg: "60%" }}>
        <Flex justify="space-between" align="center">
          <Text fontWeight={500}>
            {format(eventData.startDate, "MMMM")} @{format(eventData.startDate, "HH:mm")} -
            {format(eventData.endDate, "HH:mm O")}
          </Text>
          {userData.uid !== eventData.creatorId && (
            <Button colorScheme="blue" onClick={handleJoinOrLeave}>
              {hasJoined ? "Leave" : "Join"}
            </Button>
          )}
        </Flex>
        <Heading size="lg">{eventData.title}</Heading>
        {eventData?.location && (
          <Flex gap={1}>
            <Icon as={FaLocationDot} boxSize={6} color="red.700" />
            <Text fontWeight={600}>{eventData.location}</Text>
          </Flex>
        )}
        <Text dangerouslySetInnerHTML={{ __html: eventData.description }} overflow="hidden" />
      </Stack>
      <Box h="100%" w={{ lg: "30%" }}>
        <Image
          h="100%"
          w="100%"
          borderRadius="md"
          src={eventData?.image || FallbackImg}
          objectFit="cover"
        />
      </Box>
    </Flex>
  )
}

export default EventPageCard
