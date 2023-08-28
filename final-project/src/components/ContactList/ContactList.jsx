import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';  
import {
  Box, Heading, List, ListItem, Collapse, Input, Button,
  Stack, VStack, Spinner, Select, Divider
} from '@chakra-ui/react';
import { FaTrash, FaChevronDown, FaChevronUp, FaTimes, FaUserPlus, FaPlus  } from 'react-icons/fa';
import { getUserByEmail, getUserContactLists, createContactListForUser, updateContactListForUser, deleteContactListForUser } from '../../services/users.services';

const ContactList = () => {
  const [contactLists, setContactLists] = useState({});
  const [listName, setListName] = useState('');
  const [emailToAdd, setEmailToAdd] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedList, setExpandedList] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
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
        contacts: {}
      });

      setContactLists(prevLists => { 
        return {...prevLists, [newList.id]: newList}
      });

      setListName('');
    }
  };

  const handleAddUserToList = async () => {
    try {
      const user = await getUserByEmail(emailToAdd);
      if(user) {
        const list = { ...contactLists[selectedList] };

        if (list.contacts[user.uid] === undefined) {
          list.contacts[user.uid] = {
            id: user.uid,
            name: `${user.firstName} ${user.lastName}`
          }

          await updateContactListForUser(userUid, selectedList, list);
          setContactLists({ ...contactLists, [selectedList]: list });
          setEmailToAdd('');
        } else {
          alert("User already in the list.");
        }
      } else {
        alert("No user found with that email.");
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await deleteContactListForUser(userUid, listId);

      setContactLists(prevLists => {
        const updatedLists = { ...prevLists };
        delete updatedLists[listId];
        return updatedLists;
      });
    } catch (error) {
      console.log('Error deleting list:', error.message);
    }
  };

  const handleRemoveUserFromList = async (listId, userId) => {
    try {
      const updatedList = { ...contactLists[listId] };
      if (updatedList.contacts[userId]) {
        delete updatedList.contacts[userId];
        await updateContactListForUser(userUid, listId, updatedList);
        setContactLists(prevLists => ({
          ...prevLists,
          [listId]: updatedList
        }));
      }
    } catch (error) {
      console.log('Error removing user from list:', error.message);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!userUid) {
    return <p>User not authenticated!</p>
  }

  return  (
    
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
    <VStack 
      spacing={4}
      padding={5}
      width="30%"
      bgColor="rgba(255,255,255)"
      borderRadius="lg"
      boxShadow="2xl">
      <Heading>Contact Lists</Heading>

      {Object.values(contactLists).map(list => (
        <Box key={list.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
          <Heading size="md" display="flex" alignItems="center" justifyContent="space-between">
            {list.name}
            <Box>
              <Button 
                size="sm" 
                onClick={() => setExpandedList(prev => prev === list.id ? null : list.id)} 
                mr={2}>
                  {expandedList === list.id ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              <Button 
                size="sm" 
                leftIcon={<FaTrash />} 
                onClick={() => handleDeleteList(list.id)} 
                bgColor="#E9D8FD">
              </Button>
            </Box>
          </Heading>
          <Collapse in={expandedList === list.id}>
            <List spacing={2}>
              {Object.values((list.contacts || {})).map(contact => (
                <ListItem key={contact.id} display="flex" justifyContent="space-between" alignItems="center">
                  {contact.name}
                  <Button 
                    size="sm" 
                    leftIcon={<FaTimes />} 
                    onClick={() => handleRemoveUserFromList(list.id, contact.id)} 
                    variant="outline">
                     
                  </Button>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}

      <Divider my={4} />

      <Box p={6} width="100%" borderWidth="1px" borderRadius="lg" boxShadow="sm">
        <Heading size="sm" mb={4}>Manage Contact Lists</Heading>
        <Stack direction="row" spacing={4} width="100%" mb={4}>
          <Input
            value={listName}
            onChange={e => setListName(e.target.value)}
            placeholder="Enter list name"
          />
          <Button 
            onClick={handleCreateList} 
            bgColor="#E9D8FD" 
            rightIcon={<FaPlus />}>
          </Button>
        </Stack>
        <Stack direction="row" spacing={4} width="100%">
          <Input
            value={emailToAdd}
            onChange={e => setEmailToAdd(e.target.value)}
            placeholder="Enter user email to add"
          />
          <Select placeholder="Select a contact list" onChange={e => setSelectedList(e.target.value)}>
            {Object.values(contactLists).map(list => (
              <option key={list.id} value={list.id}>{list.name}</option>
            ))}
          </Select>
          <Button 
            onClick={handleAddUserToList} 
            bgColor="#E9D8FD" 
            rightIcon={<FaUserPlus />}>
          </Button>
        </Stack>
      </Box>
    </VStack>
  </Box>
  );

}

export default ContactList;
