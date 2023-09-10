import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  Avatar,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  WrapItem,
  Select
} from "@chakra-ui/react";
import {  getUserByUid, getUsersByUsernamePartial, getUserContactLists } from "../../services/users.services";


const Attendees = ({ initialData = [], onChange, currentUserId }) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [contactLists, setContactLists] = useState([]);

  useEffect(() => {
    let prevInitialData = JSON.stringify(initialData);
  
    const fetchInitialData = async () => {
      try {
        const usersData = await Promise.all(initialData.map(uid => getUserByUid(uid)));
        setData(usersData);
      } catch (error) {
        console.error('Failed to fetch initial data', error);
      }
    };
  
    if (prevInitialData !== JSON.stringify(initialData)) {
      fetchInitialData();
      prevInitialData = JSON.stringify(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchContactLists = async () => {
      try {
        const lists = await getUserContactLists(currentUserId);
        setContactLists(lists);
      } catch (error) {
        console.error('Failed to fetch contact lists', error);
      }
    };
    fetchContactLists();
  }, [currentUserId]);

  const addParticipantsFromContactList = async (contactListId) => {
    try {
      const contactList = contactLists[contactListId];
      if (contactList && contactList.contacts) {
        const usersData = await Promise.all(
          Object.keys(contactList.contacts).map(uid => getUserByUid(uid))
        );
        setData(prevData => [...prevData, ...usersData.filter(user => user && !exists(user.uid))]);
      }
    } catch (error) {
      console.error('Failed to add participants from contact list', error);
    }
  };

  const searchUsers = async (usernamePartial) => {
    if (usernamePartial.length >= 3) {
      const results = await getUsersByUsernamePartial(usernamePartial);
      // debugger;
      setSearchResults(results);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    onChange(data);
  }, [data, onChange])

  const exists = (uid) => data.some(user => user.uid === uid);

  const addParticipant = async (user) => {
    if (exists(user.uid)) {
      alert("Attendee already added");
      return;
    }
    setData([...data, user]);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    searchUsers(e.target.value);
  };

  const handleSelectUser = (user) => {
    addParticipant(user);
    setIsDropdownOpen(false);
    setValue("");
  };

  const handleCloseClick = (uid) => {
    const index = data.findIndex((user) => user.uid === uid);
    if (index !== -1) {
      const newUsers = [...data];
      newUsers.splice(index, 1);
      setData(newUsers);
    }
  };

  const Chip = ({ user, onCloseClick }) => (
    <WrapItem>
      <Tag size="lg" borderRadius="full" variant="solid" bg="gray.300">
        <Avatar 
          size="xs" 
          name={`${user.firstName || ''} ${user.lastName || ''}`} 
          src={user.profilePicture} 
          mr={2} 
        />
        <TagLabel>{`${user.firstName || ''} ${user.lastName || ''}`}</TagLabel>
        <TagCloseButton onClick={() => onCloseClick(user.uid)} />
      </Tag>
    </WrapItem>
  );

  const ChipList = ({ data = [], onCloseClick }) => (
    <Wrap spacing={1} mb={3}>
      {data.map((user) => (
        <Chip user={user} key={user.uid} onCloseClick={handleCloseClick} />
      ))}
    </Wrap>
  );
  
  return (
    <>
    <ChipList data={data} onCloseClick={handleCloseClick} />
    <Box position="relative">
      <Input 
        type="text" 
        placeholder="Search by username"
        onChange={handleChange} 
        value={value} 
      />
      {isDropdownOpen && (
        <Box 
          position="absolute"
          mt={2}
          w="100%"
          zIndex="dropdown"
          borderRadius="md"
          boxShadow="md"
          bg="gray.50"
          overflowY="auto"
          maxHeight="300px"  
        >
          <SimpleGrid columns={1} spacing={3} marginTop={3}>
            {searchResults.map(user => (
              <Flex
                key={user.uid}
                background="white"
                p={3}
                borderRadius="md"
                justify="space-between"
                align="center"
                boxShadow="base"
                onClick={() => handleSelectUser(user)}
                cursor="pointer"
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
          </SimpleGrid>
        </Box>
      )}
      <Box>
        <Select placeholder="Select groups" onChange={e => addParticipantsFromContactList(e.target.value)}>
          {Object.keys(contactLists).map(listId => (
            <option key={listId} value={listId}>
              {contactLists[listId].name}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  </>
  )
}

export default Attendees;
