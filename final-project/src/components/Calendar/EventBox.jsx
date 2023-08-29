import { useState } from "react"
import { Box, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from "@chakra-ui/react"
import { categoryColors } from "../../common/colors"
import { format } from "date-fns"

const EventBox = ({ title, color = "blue", startDate, endDate, description, location, isUsedInWeek }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  
  const handleBoxClick = () => {
    setIsOpen(true);
  };

  return (
    <>
    <Box
      onClick={handleBoxClick}
      border="1px grey"
      bg="blue.100"
      w={isUsedInWeek ? "100%" : "full"}
      height="full"
      overflowWrap="break-word"
      color={`rgb(${categoryColors[color]})`}
      backgroundColor={`rgba(${categoryColors[color]}, .2)`}
      padding={2}
      cursor="pointer"
    >
      <Box>
        <Heading fontSize={12} fontWeight={700} maxW="150px" mb={1}>
          {format(startDate, "H:mm")}
        </Heading>
        <Heading noOfLines={3} size={{ base: "xs" }} fontWeight={600} maxW="170px">
          {title}
        </Heading>
      </Box>
    </Box>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
              <Text fontWeight="bold">Start Date:</Text>
              <Heading fontSize={13} fontWeight={700} maxW="150px" mb={1}>
                  {format(startDate, "EEEE, d MMMM yyyy, h:mm a")}
              </Heading>
          </Box>
          <Box>
              <Text fontWeight="bold">End Date:</Text>
              <Heading fontSize={13} fontWeight={700} maxW="150px" mb={1}>
                  {format(endDate, "EEEE, d MMMM yyyy, h:mm a")}
              </Heading>
          </Box>
          <Box>
              <Text fontWeight="bold">Location:</Text>
              <Heading fontSize={13} fontWeight={600} maxW="150px" mb={1}>
                  {location}
              </Heading>
          </Box>
          <Box>
              <Text fontWeight="bold">Description:</Text>
              <Heading fontSize={13} fontWeight={600} maxW="150px" mb={1}>
                  {description}
              </Heading>
          </Box>

        </ModalBody>
      </ModalContent>
    </Modal>
  </>
  )
}

export default EventBox
