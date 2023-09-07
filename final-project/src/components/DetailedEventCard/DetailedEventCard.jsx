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
  Button,
  Grid,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { FaLocationDot } from "react-icons/fa6";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  acceptInvite,
  deleteSingleEvent,
  denyInvite,
} from "../../services/event.services";
import { getUserByUid } from "../../services/users.services";
import EventCreatorInfo from "../Events/EventCreatorInfor";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { confirmMessages } from "../../common/confirmation-messages";
import { useNavigate } from "react-router-dom";

const DetailedEventCard = ({
  detailedEventData,
  isOpen,
  onClose,
  onInviteAcceptDeny,
}) => {
  const { user } = useContext(AuthContext);
  const { attendees } = detailedEventData || {};
  const [creator, setCreator] = useState(null);
  const { onOpen } = useDisclosure();
  const confirmationModal = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreator = async () => {
      if (detailedEventData && detailedEventData.creatorId) {
        console.log(detailedEventData.id);
        const creatorData = await getUserByUid(detailedEventData.creatorId);
        console.log(creatorData);
        setCreator(user);
      }
    };

    fetchCreator();
  }, [detailedEventData]);

  const handleAccept = async () => {
    const event = await acceptInvite(user.email, detailedEventData.id);
    onInviteAcceptDeny(event);
  };

  const handleDeny = async () => {
    const event = await denyInvite(user.email, detailedEventData.id);
    onInviteAcceptDeny(event);
  };

  const hasPendingInvite = () => {
    const { pending } = attendees || [];
    return pending && pending.indexOf(user.email) !== -1;
  };

  const hasAccepted = () => {
    const { accepted } = attendees || [];
    return accepted && accepted.indexOf(user.email) !== -1;
  };

  const hasDenied = () => {
    const { denied } = attendees || [];
    return denied && denied.indexOf(user.email) !== -1;
  };

  const getAllInvited = () => {
    const { accepted = [], pending = [], denied = [] } = attendees || {};

    return {
      all: [...accepted, ...pending, ...denied],
      accepted,
      denied,
    };
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteSingleEvent(detailedEventData.id);
      navigate(-1);
    } catch (e) {
      console.log(e);
    }
  };

  const messageContainer = (text) => (
    <Flex
      p={5}
      bg="gray.100"
      borderRadius="lg"
      gap={3}
      justifyContent="space-between"
      align="center"
    >
      {text}
    </Flex>
  );

  const renderInvitees = (title, list) => (
    <>
      <Text fontSize="sm" color="gray.600" mt={3}>
        {title}:
      </Text>
      {list.map((email) => (
        <Text key={email} fontSize="sm" isTruncated>
          {email}
        </Text>
      ))}
    </>
  );

  if (detailedEventData === undefined) {
    return;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={confirmationModal.onClose}
          message={confirmMessages.DELETE_EVENT}
        >
          <Flex justify="center" align="center" gap={4} my={5}>
            <Button size={{ base: "sm" }} onClick={confirmationModal.onClose}>
              Cancel
            </Button>
            <Button size={{ base: "sm" }} mr={3} onClick={handleDeleteEvent}>
              Delete
            </Button>
          </Flex>
        </ConfirmationModal>

        <ModalBody>
          <Stack gap={3} py={5}>
            <Heading size="lg">{detailedEventData.title}</Heading>
            {creator && <EventCreatorInfo creator={creator} />}
            {detailedEventData?.creatorId === user?.uid && (
              <div>
                <IconButton icon={<EditIcon />} onClick={onOpen} />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={confirmationModal.onOpen}
                />
              </div>
            )}
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
            <Box
              dangerouslySetInnerHTML={{
                __html: detailedEventData.description,
              }}
            />
          </Stack>
          {hasPendingInvite() && (
            <Flex
              p={5}
              bg="gray.100"
              borderRadius="lg"
              gap={3}
              justifyContent="space-between"
              align="center"
            >
              <Button
                colorScheme="grey"
                border="2px solid"
                borderColor="green"
                color="black"
                width="80%"
                height="40px"
                fontSize="xl"
                onClick={handleAccept}
                leftIcon={<CheckIcon />}
              >
                Accept
              </Button>
              <Button
                colorScheme="grey"
                border="2px solid"
                borderColor="red"
                color="black"
                width="80%"
                height="40px"
                fontSize="xl"
                onClick={handleDeny}
                leftIcon={<CloseIcon />}
              >
                Deny
              </Button>
            </Flex>
          )}
          {hasAccepted() && messageContainer("You have accepted this event")}
          {hasDenied() && messageContainer("You have denied this event")}
          {!detailedEventData.isPrivate && (
            <Box p={5} bg="gray.100" borderRadius="lg" mt={5}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(3, 1fr)",
                }}
                gap={6}
              >
                <Box>{renderInvitees("All Invited", getAllInvited().all)}</Box>
                <Box>
                  {renderInvitees("Accepted", getAllInvited().accepted)}
                </Box>
                <Box>{renderInvitees("Denied", getAllInvited().denied)}</Box>
              </Grid>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailedEventCard;
