import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';  
import {
  Box,
  Heading,
  List,
  ListItem,
  Input,
  Button,
  Stack,
  VStack,
  Spinner,
  Select
} from '@chakra-ui/react';
import { getUserByEmail, getUserContactLists, createContactListForUser, updateUser } from '../../services/users.services';

const ContactList = () => {
  const [contactLists, setContactLists] = useState([]);
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
        setContactLists(Object.values(lists));
      };
      fetchContactLists();
    }
  }, [userUid]);

  const handleCreateList = async () => {
    if (listName && userUid) {
      const newList = await createContactListForUser(userUid, {
        name: listName,
        contacts: []
      });
      setContactLists(prevLists => [...prevLists, newList]);
      setListName('');
    }
  };

  const handleAddUserToList = async () => {
    const user = await getUserByEmail(emailToAdd);
    if(user) {
      const selectedContactList = contactLists.find(list => list.id === selectedList);
      if(!selectedContactList.contacts.some(contact => contact.id === user.uid)) {
        selectedContactList.contacts.push({
          id: user.uid,
          name: `${user.firstName} ${user.lastName}`
        });
        await updateUser(userUid, { contactLists: { ...contactLists, [selectedList]: selectedContactList } });
        setEmailToAdd('');
      } else {
        alert("User already in the list.");
      }
    } else {
      alert("No user found with that email.");
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
      {contactLists.map(list => (
        <Box key={list.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
          <Heading size="md">{list.name}</Heading>
          <List spacing={2}>
            {(list.contacts || []).map(contact => (
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
          {contactLists.map(list => (
            <option key={list.id} value={list.id}>{list.name}</option>
          ))}
        </Select>
        <Button onClick={handleAddUserToList} colorScheme="blue">Add User</Button>
      </Stack>
    </VStack>
  );
}

export default ContactList;
