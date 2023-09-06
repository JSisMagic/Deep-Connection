
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Box,
  StackDivider,
  CardBody,
  Heading,
  Stack,
  CardHeader,
  Text,
  Card,
  Icon,
  useToast,
  Button,
} from "@chakra-ui/react";
import { FaLocationDot, FaFlag } from "react-icons/fa6";
import { updateNotification } from "../../services/notification.services";
import DetailedEventCard from "../DetailedEventCard/DetailedEventCard";
import { getEventData } from "../../services/event.services";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Notifications = ({ data, onNotificationRead }) => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [event, setEvent] = useState();
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  const openEventDetails = async (notification) => {
    const eventData = await getEventData(notification.meta.eventId);
    if (!eventData.id) {
      toast({
        position: "top",
        render: ({ onClose }) => (
          <Box color="white" p={3} bg="red.500" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
            <Text>The event has been deleted.</Text>
            <Button size="sm" ml={3} onClick={onClose}>
              Close
            </Button>
          </Box>
        ),
        duration: 5000,
        isClosable: true,
      });
    } else {
      setEvent(eventData);
      setEventDialogOpen(true);
      setRead(notification);
    }
  };

  const setRead = async (notification) => {
    await updateNotification(user.uid, notification.id, { ...notification, read: true });
    onNotificationRead(notification);
  }

  return (
    <Card>
      <DetailedEventCard
        isOpen={eventDialogOpen}
        onClose={() => setEventDialogOpen(false)}
        detailedEventData={event}
        onInviteAcceptDeny={(e) => setEvent(e)}
      />
      <CardHeader>
        <Heading size='md'>Notifications</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
        {data.map(n => (
            <Box 
                key={n.id} 
                onClick={() => openEventDetails(n)} 
                mt='1'  
                bgColor={n.read ? "" : "gray.100"} 
                cursor="pointer" 
            >
              <Heading size='xs' textTransform='uppercase'>
                {n.title}
                {!n.read && <Icon as={FaFlag} ml="2" color="red.500" />} 
              </Heading>
              <Text pt='2' fontSize='sm' flexGrow={1}>
                Event at 
                <Icon as={FaLocationDot} boxSize={6} color="red.700" />
                <Text as="span" fontWeight="bold">{n.location}</Text>
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  )

}

export default Notifications;