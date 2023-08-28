import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';  
import {
  Box, Heading, List, ListItem,
  Input, Button, Stack, VStack,
  Spinner, Select
} from '@chakra-ui/react';
import { getUserByEmail, getUserContactLists, createContactListForUser, updateContactListForUser } from '../../services/users.services';

const ContactList = () => {
  const [contactLists, setContactLists] = useState({});
  const [listName, setListName] = useState('');
  const [emailToAdd, setEmailToAdd] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <Spinner />;
  }

  if (!userUid) {
    return <p>User not authenticated!</p>
  }

  return (
    <VStack spacing={5} width="100%">
      <Heading>Contact Lists</Heading>
      {Object.values(contactLists).map(list => (
        <Box key={list.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
          <Heading size="md">{list.name}</Heading>
          <List spacing={2}>
            {Object.values((list.contacts || {})).map(contact => (
              <ListItem key={contact.id}>{contact.name}</ListItem>
            ))}
          </List>
        </Box>
      ))}
      <Stack direction="row" spacing={4} width="100%">
        <Input
          value={listName}
          onChange={e => setListName(e.target.value)}
          placeholder="Enter list name"
        />
        <Button onClick={handleCreateList} colorScheme="blue">Create New List</Button>
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
        <Button onClick={handleAddUserToList} colorScheme="blue">Add User</Button>
      </Stack>
    </VStack>
  );
}

export default ContactList;
