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
} from "@chakra-ui/react";
import {
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaUserPlus,
  FaPlus,
} from "react-icons/fa";
import {
  getUserByEmail,
  getUserContactLists,
  createContactListForUser,
  updateContactListForUser,
  deleteContactListForUser,
} from "../../services/users.services";

const ContactList = () => {
  const [contactLists, setContactLists] = useState({});
  const [listName, setListName] = useState("");
  const [emailToAdd, setEmailToAdd] = useState("");
  const [selectedList, setSelectedList] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedList, setExpandedList] = useState(null);

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

  const handleCreateList = async () => {
    if (listName && userUid) {
      const newList = await createContactListForUser(userUid, {
        name: listName,
        contacts: {},
      });

      setContactLists((prevLists) => {
        return { ...prevLists, [newList.id]: newList };
      });

      setListName("");
    }
  };

  const handleAddUserToList = async () => {
    try {
      const user = await getUserByEmail(emailToAdd);
      if (user) {
        const list = { ...contactLists[selectedList] };

        if (list.contacts[user.uid] === undefined) {
          list.contacts[user.uid] = {
            id: user.uid,
            name: `${user.firstName} ${user.lastName}`,
          };

          await updateContactListForUser(userUid, selectedList, list);
          setContactLists({ ...contactLists, [selectedList]: list });
          setEmailToAdd("");
        } else {
          alert("User already in the list.");
        }
      } else {
        alert("No user found with that email.");
      }
    } catch (error) {
      console.log("Error:", error.message);
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
    } catch (error) {
      console.log("Error deleting list:", error.message);
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
      }
    } catch (error) {
      console.log("Error removing user from list:", error.message);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!userUid) {
    return <p>User not authenticated!</p>;
  }

  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
    >
      {/* Contact Lists */}
      <Box
        width={{ base: "100%", md: "30%" }}
        padding="4"
        backgroundColor="rgba(255,255,255)"
        maxHeight="100vh"
        overflowY="auto"
      >
        <VStack spacing={4}>
          <Heading fontWeight={600}>Contact Lists</Heading>
          <Divider />
          <VStack width="100%" align="stretch">
            {Object.values(contactLists).map((list) => (
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
                      {expandedList === list.id ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<FaTrash />}
                      onClick={() => handleDeleteList(list.id)}
                      bgColor="#E9D8FD"
                    ></Button>
                  </Box>
                </Heading>
                <Collapse in={expandedList === list.id}>
                  <List spacing={2} fontWeight={600}>
                    {Object.values(list.contacts || {}).map((contact) => (
                      <ListItem
                        key={contact.id}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        {contact.name}
                        <Button
                          size="sm"
                          leftIcon={<FaTimes />}
                          onClick={() =>
                            handleRemoveUserFromList(list.id, contact.id)
                          }
                          variant="outline"
                        ></Button>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box width={{ base: "100%", md: "70%" }} padding="4">
        <VStack spacing={4} width="100%">
          <Heading fontWeight={600}>Manage Contact Lists</Heading>
          <Divider />

          {/* Create List */}
          <Stack direction="column" spacing={4} width="100%">
            <Input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Enter list name"
            />
            <Button
              onClick={handleCreateList}
              bgColor="#E9D8FD"
              rightIcon={<FaPlus />}
            >
              Create List
            </Button>
          </Stack>

          <Divider />

          {/* Add User to List */}
          <Stack direction="column" spacing={4} width="100%">
            <Input
              value={emailToAdd}
              onChange={(e) => setEmailToAdd(e.target.value)}
              placeholder="Enter user email to add"
            />
            <Select
              placeholder="Select a contact list"
              onChange={(e) => setSelectedList(e.target.value)}
            >
              {Object.values(contactLists).map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </Select>
            <Button
              onClick={handleAddUserToList}
              bgColor="#E9D8FD"
              rightIcon={<FaUserPlus />}
            >
              Add User to List
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ContactList;
