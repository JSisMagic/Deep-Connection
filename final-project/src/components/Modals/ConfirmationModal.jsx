import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

function ConfirmationModal({ children, header, isOpen, onClose, message }) {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>{message}</Center>

          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;
