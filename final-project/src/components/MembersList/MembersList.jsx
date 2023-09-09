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
} from "@chakra-ui/react"
import { FaUserPlus, FaBan, FaSearch, FaUserMinus } from "react-icons/fa"
import { getAllUsers, toggleBlockUser, updateUser, addContact, removeContact, getContacts } from "../../services/users.services"
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
  const { userData } = useContext(AuthContext)
  const [isCurrentlyBlocked, setIsCurrentlyBlocked] = useState(user?.isBlocked || false)
  const [isContact, setIsContact] = useState(false);
  
  const toggleBlock = () => {
    console.log(isCurrentlyBlocked, user.username);
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
    } catch (error) {
      console.error('Failed to add contact:', error);
    }
  };
  
  const handleRemoveContact = async () => {
    try {
      const contacts = await getContacts(userData.uid); 
      // console.log('All Contacts:', contacts)
      const contact = contacts.find((contact) => contact.name === `${user.firstName} ${user.lastName}` && contact.contactUserId === user.uid); // Added user UID check
      // console.log('Found Contact:', contact);
  
      if (contact) {
        await removeContact(userData.uid, contact.id);
        setIsContact(false);
      } else {
        console.error('Contact not found');
      }
    } catch (error) {
      console.error('Failed to remove contact:', error);
    }
  };

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
