import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import {
  Box,
  Heading,
  List,
  ListItem,
  Collapse,
  Input,
  Button,
  Stack,
  VStack,
  Spinner,
  Select,
  Divider,
  Flex,
  Avatar,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"
import {
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaUserEdit
} from "react-icons/fa";
import { BiTrashAlt, BiEditAlt } from "react-icons/bi";
import {
  getUserContactLists,
  createContactListForUser,
  updateContactListForUser,
  deleteContactListForUser,
  getUsersByUsernamePartial,
  getContacts,
  removeContact
} from "../../services/users.services";

const ContactList = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [contactLists, setContactLists] = useState({});
  const [myContacts, setMyContacts] = useState([]);
  const [listName, setListName] = useState("");
  const [emailToAdd, setEmailToAdd] = useState("");
  const [selectedList, setSelectedList] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedList, setExpandedList] = useState(null);
  const [expandModifyBox, setExpandModifyBox] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userUid) {
      const fetchContactLists = async () => {
        const lists = await getUserContactLists(userUid);
        setContactLists(lists);
      };

      fetchContactLists();
    }
  }, [userUid]);

  useEffect(() => {
    if (userUid) {
      const fetchContactLists = async () => {
        const lists = await getUserContactLists(userUid);
        setContactLists(lists);
        const contacts = await getContacts(userUid);
        setMyContacts(contacts);
      };
  
      fetchContactLists();
    }
  }, [userUid]);

  const searchUsers = async (usernamePartial) => {
    if (usernamePartial.length >= 3) {
      const results = await getUsersByUsernamePartial(usernamePartial);
      setSearchResults(results);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleCreateList = async () => {
    try {
      if (listName && userUid) {
        const newList = await createContactListForUser(userUid, {
          name: listName,
          contacts: {},
        });
  
        setContactLists((prevLists) => {
          return { ...prevLists, [newList.id]: newList };
        });
  
        setListName("");
  
        toast({
          title: "List Created",
          description: `Successfully created the list "${listName}".`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Creation Failed",
          description: "Please provide a valid list name and user UID.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred while creating the list: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddUserToList = async (user) => {
    try {
      const currentList = contactLists[selectedList];
      if (currentList) {
        const existingContacts = currentList.contacts || {};
  
        if (!existingContacts[user.uid]) {
          existingContacts[user.uid] = {
            id: user.uid, 
            name: `${user.firstName} ${user.lastName}`, 
            username: user.username,
            avatar: user.profilePicture || null, 
          };
  
          await updateContactListForUser(userUid, selectedList, existingContacts);
  
          setContactLists((prevLists) => {
            return { ...prevLists, [selectedList]: { ...currentList, contacts: existingContacts } };
          });

          toast({
            title: "Contact Added",
            description: `Successfully added ${user.firstName} ${user.lastName} to the list.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
  
          setEmailToAdd("");
          setSearchResults([]);
          setIsDropdownOpen(false);
        } else {
          toast({
            title: "Contact Already Exists",
            description: `${user.firstName} ${user.lastName} is already in the list.`,
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        console.error("No list selected.");
        toast({
          title: "No List Selected",
          description: "Please select a list to add the contact to.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error adding user to list:", error);
      toast({
        title: "Error",
        description: "There was an error adding the contact to the list.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  const handleDeleteList = async (listId) => {
    try {
      await deleteContactListForUser(userUid, listId);
  
      setContactLists((prevLists) => {
        const updatedLists = { ...prevLists };
        delete updatedLists[listId];
        return updatedLists;
      });
  
      toast({
        title: "List Deleted",
        description: "Successfully deleted the list.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred while deleting the list: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoveUserFromList = async (listId, userId) => {
    try {
      const updatedList = { ...contactLists[listId] };
      if (updatedList.contacts[userId]) {
        delete updatedList.contacts[userId];
        await updateContactListForUser(userUid, listId, updatedList);
        setContactLists((prevLists) => ({
          ...prevLists,
          [listId]: updatedList,
        }));
  
        toast({
          title: "User Removed",
          description: "Successfully removed the user from the list.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred while removing the user from the list: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!userUid) {
    return <p>User not authenticated!</p>;
  }

  return (
    <Flex flexDirection={{ base: "column", md: "row" }} height="100vh" padding="20px">
     
     <VStack spacing={6} w={{ base: "100%", md: "50%" }} pr={{ md: "4" }}>
  
          {/* Groups Section */}
          <Box w="100%">
            <Heading fontWeight={600} mb={4}> My Groups</Heading>
            <VStack width="100%" align="stretch">
             {Object.keys(contactLists).length === 0 ? (
              <Box p={4} textAlign="center">
                <p>You don't have any groups yet.</p>
                <p>Create one to get started!</p>
              </Box>
            ) : (
              Object.values(contactLists).map((list) => (
                <Box
                  key={list.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  width="100%"
                >
                  <Heading
                    size="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    fontWeight={600}
                  >
                    {list.name}
                    <Box>
                      <Button
                        size="sm"
                        fontWeight={600} 
                        onClick={() =>
                          setExpandedList((prev) =>
                            prev === list.id ? null : list.id
                          )
                        }
                        mr={2}
                      >
                        {expandedList === list.id ? <FaChevronUp /> : <FaChevronDown />}
                      </Button>
                      <Button
                        size="sm"
                        mr={2}
                        
                        onClick={() => handleDeleteList(list.id)}
                        bgColor="grey.100"
                      >
                        <BiTrashAlt />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setExpandModifyBox(!expandModifyBox);
                          setSelectedList(list.id)
                        }}
                        bgColor="grey.100"
                      >
                        <BiEditAlt />
                      </Button>
                    </Box>
                  </Heading>
                  <Collapse in={expandedList === list.id}>
                    <List spacing={2} fontWeight={600}>
                      {Object.values(list.contacts || {}).map((contact, index) => {
                        return (
                          <ListItem
                            key={contact.id || index}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Flex gap={3} onClick={() => navigate(`/profile/${contact.id}`)} cursor="pointer">
                              <Avatar src={contact.avatar} size="sm" mr={2} />
                              {contact.name}
                            </Flex>
                            <Button
                              size="sm"
                              leftIcon={<FaTimes />}
                              onClick={() => handleRemoveUserFromList(list.id, contact.id)}
                              variant="outline"
                            ></Button>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                  <Collapse in={expandModifyBox} >
                    <Input
                      value={emailToAdd}
                      onChange={(e) => {
                        setEmailToAdd(e.target.value);
                        searchUsers(e.target.value);

                        if (e.target.value === '') {
                          setSearchResults([])
                        }
                      }}
                      placeholder="Add user to group"
                      
                    />
                    <Box
                      position="absolute"
                      mt={2}
                      w="300px"
                      zIndex="dropdown"
                      borderRadius="md"
                      boxShadow="md"
                      bg="gray.50"
                      overflowY="auto"
                      maxHeight="300px"
                    >
                      {searchResults.map(user => (
                        <Flex
                          key={user.uid}
                          background="white"
                          p={3}
                          borderRadius="md"
                          justify="space-between"
                          align="center"
                          boxShadow="base"
                          onClick={() => handleAddUserToList(user)}
                          cursor="pointer"
                          _hover={{ bg: "rgba(255,255,255, .2)" }}
                        >
                          <Flex gap={3}>
                            <Avatar src={user.profilePicture} />
                            <Box>
                              <Heading size="sm">
                                {user.firstName} {user.lastName}
                              </Heading>
                              <Text fontWeight={600}>@{user.username}</Text>
                            </Box>
                          </Flex>
                        </Flex>
                        ))}
                    </Box>
                  </Collapse>
                </Box>
              ))
            )}
  
            <Box mt={4}>
              <Input
                placeholder="New group name"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
              <Button
                mt={2}
                onClick={handleCreateList}
                disabled={!listName.trim()}
              >
                Create new group
              </Button>
            </Box>
          </VStack>
          </Box>
          </VStack>
  
          {/* My Contacts Section */}
          <VStack spacing={6} w={{ base: "100%", md: "50%" }} pl={{ md: "4" }} mt={{ base: "6", md: "0" }}>
          <Box w="100%">
            <Heading fontWeight={600} mb={4} fontFamily="heading">My Contacts</Heading>
            <SimpleGrid columns={1} spacing={2}>
              {myContacts.map((contact, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Flex gap={3} onClick={() => navigate(`/profile/${contact.contactUserId}`)} cursor="pointer">
                    <Avatar src={contact.profilePicture} size="sm" mr={2} />
                    {contact.name}
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
          </VStack>
    </Flex>
  )
 }
  

export default ContactList;