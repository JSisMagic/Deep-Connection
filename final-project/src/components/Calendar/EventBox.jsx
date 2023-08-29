import { useState } from "react"
import { Box, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react"
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
          <p>Start Date: {format(startDate, "EEEE, d MMMM yyyy, H:mm")}</p>
          <p>End Date: {format(endDate, "EEEE, d MMMM yyyy, H:mm")}</p>
          <p>Location: {location}</p>
          <p>Description: {description}</p>

        </ModalBody>
      </ModalContent>
    </Modal>
  </>
  )
}

export default EventBox
