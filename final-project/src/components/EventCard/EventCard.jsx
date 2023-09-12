import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { FaLocationDot } from "react-icons/fa6";
import FallbackImg from "../../assets/images/event.jpg";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { joinOrLeaveEvent } from "../../services/event.services";
import { eventActions } from "../../common/event-enums";
import { useNavigate } from "react-router-dom";

const EventPageCard = ({
  eventData,
  onOpenDetailedEvent,
  isUsedLanding = false,
}) => {
  const { userData } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  const [hasJoined, setHasJoined] = useState(userData?.events?.[eventData.id]);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function calculateTimeRemaining() {
    const now = new Date();
    const startDate = new Date(eventData.startDate);
    const timeDiff = startDate - now;

    if (timeDiff < 0) {
      return "Event started";
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  const handleClickEvent = () => {
    if (userData === null) {
      return navigate("/login");
    }
    onOpenDetailedEvent(eventData);
  };

  const handleJoinOrLeave = async (event) => {
    event.stopPropagation();

    if (userData === null) {
      return navigate("/login");
    }

    try {
      await joinOrLeaveEvent(
        userData,
        eventData.id,
        hasJoined ? eventActions.leave : eventActions.join
      );
      setHasJoined((prev) => !prev);

      toast({
        title: hasJoined ? "Left the event" : "Joined the event",
        description: hasJoined
          ? `You have left the event: ${eventData.title}`
          : `You have joined the event: ${eventData.title}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error while joining/leaving event:", error);
      toast({
        title: "An error occurred",
        description: "Failed to join/leave the event. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      p={3}
      direction={{ base: "column", lg: isUsedLanding ? "column" : "row" }}
      h={{ base: "max-content", lg: isUsedLanding ? "100%" : "25vh" }}
      align="center"
      width="100%"
      gap={8}
      bg="gray.50"
      borderRadius={isUsedLanding ? "xl" : "md"}
      cursor="pointer"
      maxW={{ lg: isUsedLanding ? "500px" : "1500px" }}
      marginInline="auto"
      transition="all .2s linear"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "0px 2px 6px rgba(0,0,0,.2)",
      }}
      onClick={handleClickEvent}
    >
      <Stack
        alignSelf={{ lg: !isUsedLanding && "start" }}
        align="center"
        width="10%"
      >
        <Text fontWeight={500}>
          {format(eventData.startDate, "ccc").toUpperCase()}
        </Text>
        <Heading size="md">
          {format(eventData.startDate, "d")}
        </Heading>
        
      </Stack>
      <Stack
        h="100%"
        justify="space-between"
        flexGrow={1}
        width={{ lg: isUsedLanding ? "90%" : "60%" }}
      >
        <Flex justify="space-between" align="center">
          <Text fontWeight={500}>
            {format(eventData.startDate, "MMMM")} @
            {format(eventData.startDate, "HH:mm")} -
            {format(eventData.endDate, "HH:mm O")}
          </Text>
          <Text fontSize="sm">{timeRemaining}</Text>
          {userData?.uid !== eventData.creatorId && (
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
        <Text
          dangerouslySetInnerHTML={{ __html: eventData.description }}
          overflow="hidden"
        />
      </Stack>
      <Box
        h={{ base: "100%", lg: isUsedLanding ? "30vh" : "100%" }}
        w={{ lg: isUsedLanding ? "100%" : "30%" }}
      >
        <Image
          h="100%"
          w="100%"
          borderRadius="md"
          src={eventData?.image || FallbackImg}
          objectFit="cover"
        />
      </Box>
    </Flex>
  );
};

export default EventPageCard;
