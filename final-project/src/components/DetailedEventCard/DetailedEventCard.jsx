import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Box,
  Flex,
  Icon,
  Text,
  Heading,
  Stack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button
} from "@chakra-ui/react"
import { format } from "date-fns"
import { FaLocationDot } from "react-icons/fa6"
import { acceptInvite, denyInvite } from "../../services/event.services"

const DetailedEventCard = ({ detailedEventData, isOpen, onClose, onInviteAcceptDeny }) => {
  const { user } = useContext(AuthContext);
  const { attendees } = detailedEventData || {};

  const handleAccept = async () => {
    const event = await acceptInvite(user.email, detailedEventData.id);
    onInviteAcceptDeny(event);
  }

  const handleDeny = async () => {
    const event = await denyInvite(user.email, detailedEventData.id);
    onInviteAcceptDeny(event);
  }

  const hasPendingInvite = () => {
    const { pending } = attendees || [];
    return pending && pending.indexOf(user.email) !== -1;
  }

  const hasAccepted = () => {
    const { accepted } = attendees || [];
    return accepted && accepted.indexOf(user.email) !== -1;
  }

  const hasDenied = () => {
    const { denied } = attendees || [];
    return denied && denied.indexOf(user.email) !== -1;
  }

  const getAllInvited = () => {
    const { accepted = [], pending = [], denied = [] } = attendees || {};

    return {
      all: [...accepted, ...pending, ...denied],
      accepted,
      denied,
    };
    
  };

  const messageContainer = (text) => (<Flex
    p={5}
    bg="gray.100"
    borderRadius="lg"
    gap={3}
    justifyContent="space-between"
    align="center"
  >
    {text}
  </Flex>)

const renderInvitees = (title, list) => (
  <>
    <Text fontSize="sm" color="gray.600" mt={3}>
      {title}:
    </Text>
    {list.map((email) => (
      <Text key={email} fontSize="sm">{email}</Text>
    ))}
  </>
);

if (detailedEventData === undefined) {
  return;
}

return (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader></ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack gap={3} py={5}>
          <Heading size="lg">{detailedEventData.title}</Heading>
          <Flex
            p={5}
            bg="gray.100"
            borderRadius="lg"
            gap={3}
            justifyContent="space-between"
            align="center"
          >
            <Box flexGrow={1} minWidth="60%">
              <Heading size="md" mb={1}>
                {format(detailedEventData.startDate, "MMMM d")}
              </Heading>
              <Text fontWeight={700}>
                @{format(detailedEventData.startDate, "HH:mm")} -{" "}
                {format(detailedEventData.endDate, "HH:mm O")}
              </Text>
            </Box>
            {detailedEventData?.location && (
              <Flex gap={1}>
                <Icon as={FaLocationDot} boxSize={6} color="red.700" />
                <Text fontSize={14} fontWeight={600}>
                  {detailedEventData.location}
                </Text>
              </Flex>
            )}
          </Flex>
          <Image src={detailedEventData.image} borderRadius="lg" />
          <Box dangerouslySetInnerHTML={{ __html: detailedEventData.description }} />
        </Stack>
        { hasPendingInvite() && (<Flex
            p={5}
            bg="gray.100"
            borderRadius="lg"
            gap={3}
            justifyContent="space-between"
            align="center"
          >
            <Button
              colorScheme="blue"
              width="100%"
              height="50px"
              fontSize="xl"
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button
              colorScheme="blue"
              width="100%"
              height="50px"
              fontSize="xl"
              onClick={handleDeny}
            >
              Deny
            </Button>
          </Flex>)}
          { hasAccepted() && messageContainer("You have accepted this event")}
          { hasDenied() && messageContainer("You have denied this event")}
        { !detailedEventData.isPrivate && (
          <Box
            p={5}
            bg="gray.100"
            borderRadius="lg"
            mt={5}
          >
            {renderInvitees('All Invited', getAllInvited().all)}
            {renderInvitees('Accepted', getAllInvited().accepted)}
            {renderInvitees('Denied', getAllInvited().denied)}
          </Box>
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
);

}

export default DetailedEventCard
