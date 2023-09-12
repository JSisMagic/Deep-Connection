import React, { useState, useEffect, useContext } from "react"
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  useToast
} from "@chakra-ui/react"
import { getAllUsers, toggleBlockUser, updateUser, addContact, removeContact, getContacts  } from "../../services/users.services"
import { FaUserPlus, FaBan, FaSearch, FaUserMinus } from "react-icons/fa"

import { useNavigate } from "react-router-dom"
import { MEMBERS_LIST_HEIGHT } from "../../common/constrants"
import { userRole } from "../../common/member-role"
import { AuthContext } from "../../context/AuthContext"

const MembersList = ({ searchTerm, setSearchTerm }) => {
  const [allMembers, setAllMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])

  useEffect(() => {
    getAllUsers().then(setAllMembers).catch(console.error)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = allMembers.filter(
        user =>
          user?.username?.toLowerCase().includes(searchTerm) ||
          user?.firstName?.concat(user?.lastName).toLowerCase().includes(searchTerm) ||
          user?.phone?.includes(searchTerm)
      )

      setFilteredMembers(filtered)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm, allMembers])

  // console.log(filteredMembers)
  return (
    <Stack
      marginTop={5}
      p={4}
      bg="gray.50"
      borderRadius="md"
      overflowY="auto"
      maxHeight={MEMBERS_LIST_HEIGHT}
    >
      <SimpleGrid columns={1} spacing={3} marginTop={3}>
        {filteredMembers.length ? (
          filteredMembers.map(user => <MemberItem key={user.uid} user={user} />)
        ) : (
          <Heading textAlign="center" marginTop={5}>
            No users found
          </Heading>
        )}
      </SimpleGrid>
    </Stack>
  )
}

const MemberItem = ({ user }) => {
  const navigate = useNavigate()
  const toast = useToast();
  const { userData } = useContext(AuthContext)
  const [isCurrentlyBlocked, setIsCurrentlyBlocked] = useState(user?.isBlocked || false)
  const [isContact, setIsContact] = useState(false);
  
  const toggleBlock = () => {
    console.log(isCurrentlyBlocked, user.username);
    // updateUser(user.uid, { isBlocked: isCurrentlyBlocked ? null : true })
    toggleBlockUser(user.uid, !isCurrentlyBlocked)
    setIsCurrentlyBlocked(prev => !prev)
  }

   useEffect(() => {
      const fetchIsContact = async () => {
        try {
          const contacts = await getContacts(userData.uid);
          const isUserContact = contacts.some(
            (contact) => contact.contactUserId === user.uid
          );
          setIsContact(isUserContact);
        } catch (error) {
          console.error('Failed to fetch contacts:', error);
        }
      };
    
      fetchIsContact();
    }, [userData.uid, user.uid]);
    
    const handleAddContact = async () => {
      try {
        const existingContacts = await getContacts(userData.uid);
  
        const alreadyExists = existingContacts.some(
          (contact) => contact.contactUserId === user.uid
        );
  
        if (alreadyExists) {
          console.error('User is already a contact');
          return;
        }
  
        await addContact(userData.uid, `${user.firstName} ${user.lastName}`, user.uid);
        setIsContact(true);
  
        toast({
          title: "Contact Added",
          description: `${user.firstName} ${user.lastName} has been added to your contacts.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Failed to add contact:', error);
        toast({
          title: "Error",
          description: "Failed to add contact. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
      
    const handleRemoveContact = async () => {
      try {
        const contacts = await getContacts(userData.uid);
        const contact = contacts.find(
          (contact) =>
            contact.name === `${user.firstName} ${user.lastName}` && contact.contactUserId === user.uid
        );
  
        if (contact) {
          await removeContact(userData.uid, contact.id);
          setIsContact(false);
  
          // Display a success toast
          toast({
            title: "Contact Removed",
            description: `${user.firstName} ${user.lastName} has been removed from your contacts.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          console.error('Contact not found');
        }
      } catch (error) {
        console.error('Failed to remove contact:', error);
        // Display an error toast
        toast({
          title: "Error",
          description: "Failed to remove contact. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

  return (
    <Flex
      background="white"
      p={3}
      borderRadius="md"
      justify="space-between"
      align="center"
      boxShadow="base"
    >
      <Flex gap={3} onClick={() => navigate(`/profile/${user.uid}`)} cursor="pointer">
        <Avatar src={user.profilePicture} />
        <Box>
          <Heading size="sm">
            {user.firstName} {user.lastName}
          </Heading>
          <Text fontWeight={600}>@{user.username}</Text>
        </Box>
      </Flex>
      {userData.uid !== user.uid && (
        <Stack spacing={2}>
          {!isContact ? (
            <Button
              bgColor="#E9D8FD"
              fontWeight={600}
              size="sm"
              leftIcon={<FaUserPlus />}
              onClick={handleAddContact}
            >
              Add
            </Button>
          ) : (
            <Button
              bgColor="#E9D8FD"
              fontWeight={600}
              size="sm"
              leftIcon={<FaUserMinus />} 
              onClick={handleRemoveContact}
            >
              Remove
            </Button>
          )}
          {userData.role === userRole.ADMIN && (
            <Button
              bgColor="#E9D8FD"
              fontWeight={600}
              size="sm"
              leftIcon={<FaBan />}
              onClick={() => toggleBlock(user.uid, isCurrentlyBlocked)}
            >
              {isCurrentlyBlocked ? "Unblock" : "Block"}
            </Button>
          )}
        </Stack>
      )}
    </Flex>
  )

}

export default MembersList
