import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
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
  IconButton,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { format } from "date-fns"
import { FaLocationDot } from "react-icons/fa6"
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { acceptInvite, deleteSingleEvent, denyInvite } from "../../services/event.services"
import EventCreatorInfo from "../Events/EventCreatorInfor"
import ConfirmationModal from "../Modals/ConfirmationModal"
import { confirmMessages } from "../../common/confirmation-messages"
import { useNavigate } from "react-router-dom"

const DetailedEventCard = ({ detailedEventData, isOpen, onClose, onInviteAcceptDeny }) => {
  const { user } = useContext(AuthContext)
  const { attendees } = detailedEventData || {}
  const { onOpen } = useDisclosure()
  const confirmationModal = useDisclosure()
  const navigate = useNavigate()
  // console.log(detailedEventData)

  const handleAccept = async () => {
    const event = await acceptInvite(user.email, detailedEventData.id)
    onInviteAcceptDeny(event)
  }

  const handleDeny = async () => {
    const event = await denyInvite(user.email, detailedEventData.id)
    onInviteAcceptDeny(event)
  }

  const hasPendingInvite = () => {
    const { pending } = attendees || []
    return pending && pending.find(e => e.email === user.email) !== undefined
  }

  const hasAccepted = () => {
    const { accepted } = attendees || []
    // debugger;
    return accepted && accepted.find(e => e.email === user.email) !== undefined
  }

  const hasDenied = () => {
    const { denied } = attendees || []
    return denied && denied.find(e => e.email === user.email) !== undefined
  }


  const handleDeleteEvent = async () => {
    try {
      await deleteSingleEvent(detailedEventData.id, detailedEventData.creatorId)
    } catch (e) {
      console.log(e)
    }
  }

  const messageContainer = text => (
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
  )

  if (detailedEventData === undefined) {
    return
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
            <EventCreatorInfo creator={detailedEventData.creatorId} />
            {detailedEventData?.creatorId === user?.uid && (
              <div>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => navigate(`/edit-event/${detailedEventData.id}`)}
                />
                <IconButton icon={<DeleteIcon />} onClick={confirmationModal.onOpen} />
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
          {((detailedEventData.isPrivate && hasAccepted()) || !detailedEventData.isPrivate) && (
          <Menu>
            <MenuButton as={Button} rightIcon="▼">
              Participants
            </MenuButton>
            <MenuList maxH="200px" overflowY="auto">
              {attendees?.accepted?.map((userDetail, index) => (
                <MenuItem key={index} onClick={() => navigate(`/profile/${userDetail.uid}`)}>
                  <Flex background="white" p={3} borderRadius="md" justify="space-between" align="center" boxShadow="base">
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
  )
}

export default DetailedEventCard
