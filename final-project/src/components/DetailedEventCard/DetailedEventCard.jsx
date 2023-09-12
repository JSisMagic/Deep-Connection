import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useContext, useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { confirmMessages } from "../../common/confirmation-messages";
import { userRole } from "../../common/member-role";
import { AuthContext } from "../../context/AuthContext";
import {
  acceptInvite,
  deleteSingleEvent,
  denyInvite,
} from "../../services/event.services";
import EventCreatorInfo from "../Events/EventCreatorInfor";
import ConfirmationModal from "../Modals/ConfirmationModal";

const DetailedEventCard = ({
  detailedEventData,
  isOpen,
  onClose,
  onInviteAcceptDeny,
}) => {
  const { user, userData } = useContext(AuthContext);
  const toast = useToast();
  const { attendees } = detailedEventData || {};
  const { onOpen } = useDisclosure();
  const confirmationModal = useDisclosure();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState("");

  const calculateTimeRemaining = () => {
    if (!detailedEventData || !detailedEventData.startDate) {
      setTimeRemaining("Event date not available");
      return;
    }

    const now = new Date();
    const startTime = new Date(detailedEventData.startDate); 
    const timeDifference = startTime - now;
  
    if (timeDifference <= 0) {
      setTimeRemaining("Event has ended");
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      setTimeRemaining({ days, hours, minutes, seconds });
    }
    }
  

    useEffect(() => {
      calculateTimeRemaining();
  
      const timerInterval = setInterval(() => {
        calculateTimeRemaining();
      }, 1000);
  
      return () => clearInterval(timerInterval);
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
    return pending && pending.find((e) => e.email === user.email) !== undefined;
  };

  const hasAccepted = () => {
    const { accepted } = attendees || [];
    // debugger;
    // console.log(accepted);
    return (
      accepted && accepted.find((e) => e.email === user.email) !== undefined
    );
  };

  const hasDenied = () => {
    const { denied } = attendees || [];
    return denied && denied.find((e) => e.email === user.email) !== undefined;
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteSingleEvent(
        detailedEventData.id,
        detailedEventData.creatorId
      );
      confirmationModal.onClose();
      onClose();

      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.error(e);

      toast({
        title: "Error",
        description:
          "An error occurred while deleting the event. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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

  const timerStyles = {
    container: {
      paddingTop: '2.0625rem',
      display: 'flex',
      alignItems: 'center',
    },
    digitContainer: {
      backgroundColor: '#f3f3f3',
      borderRadius: '0.25rem',
      margin: '0 0.1rem',
      padding: '0.2rem 0.4rem',
      border: '1px solid #ccc',
    },
    digit: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
    separator: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
      margin: '0',
    },
  };

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
            <Flex justify="space-between">
              <Heading size="lg">{detailedEventData.title}</Heading>
              {(detailedEventData?.creatorId === user?.uid ||
                userData.role === userRole.ADMIN) && (
                <ButtonGroup>
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() =>
                      navigate(`/edit-event/${detailedEventData.id}`)
                    }
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={confirmationModal.onOpen}
                  />
                </ButtonGroup>
              )}
            </Flex>
            
            <Flex justify="space-between">
              <EventCreatorInfo creator={detailedEventData.creatorId} />
                <Box textAlign="right" style={timerStyles.container}>
                  <Box style={timerStyles.digitContainer}>
                    <Text style={timerStyles.digit}>{timeRemaining.days}</Text>
                    <Text>Days</Text>
                  </Box>
                  <Box style={timerStyles.separator}>:</Box>
                  <Box style={timerStyles.digitContainer}>
                    <Text style={timerStyles.digit}>{timeRemaining.hours}</Text>
                    <Text>Hours</Text>
                  </Box>
                  <Box style={timerStyles.separator}>:</Box>
                  <Box style={timerStyles.digitContainer}>
                    <Text style={timerStyles.digit}>{timeRemaining.minutes}</Text>
                    <Text>Minutes</Text>
                  </Box>
                  <Box style={timerStyles.separator}>:</Box>
                  <Box style={timerStyles.digitContainer}>
                    <Text style={timerStyles.digit}>{timeRemaining.seconds}</Text>
                    <Text>Seconds</Text>
                  </Box>
                </Box>
            </Flex>
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
          {((detailedEventData.isPrivate && hasAccepted()) ||
            !detailedEventData.isPrivate) && (
            <Menu>
              <MenuButton as={Button} rightIcon="▼">
                Participants
              </MenuButton>
              <MenuList maxH="200px" overflowY="auto">
                {attendees?.accepted?.map((userDetail, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => navigate(`/profile/${userDetail.uid}`)}
                  >
                    <Flex
                      w="full"
                      background="white"
                      p={3}
                      borderRadius="md"
                      justify="space-between"
                      align="center"
                      boxShadow="base"
                    >
                      <Flex gap={3} cursor="pointer">
                        <Avatar src={userDetail.profilePicture} />
                        <Box>
                          <Heading size="sm">
                            {userDetail.firstName} {userDetail.lastName}
                          </Heading>
                          <Text fontWeight={600}>@{userDetail.username}</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailedEventCard;
