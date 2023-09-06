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
  Text
} from "@chakra-ui/react";
import { getUserByEmail, getUsersByUsernamePartial } from "../../services/users.services";

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email) => EMAIL_REGEXP.test(email);

const Attendees = ({ initialData = [], onChange }) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(initialData);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const exists = (email) => data.includes(email);

  const addEmail = async (email) => {
    email.trim();

    if (!isValidEmail(email)) {
      alert("Please input a valid email");
      return;
    }

    if (exists(email)) {
      alert("Attendee already added");
      return;
    }

    const user = await getUserByEmail(email);

    if (user === null) {
      alert ("Cannot find such user");
      return;
    }

    setData([...data, email]);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    searchUsers(e.target.value);
  };

  const handleSelectUser = (user) => {
    addEmail(user.email);
    setIsDropdownOpen(false);
    setValue("");
  };

  const handleCloseClick = (email) => {
    const index = data.findIndex((e) => e === email);
    if (index !== -1) {
      const newEmails = [...data];
      newEmails.splice(index, 1);
      setData(newEmails);
    }
  };

  const Chip = ({ email, onCloseClick }) => (
    <Tag key={email} borderRadius="full" variant="solid" colorScheme="green">
      <TagLabel>{email}</TagLabel>
      <TagCloseButton
        onClick={() => {
          onCloseClick(email);
        }}
      />
    </Tag>
  );

  const ChipList = ({ data = [], onCloseClick }) => (
    <Wrap spacing={1} mb={3}>
      {data.map((email) => (
        <Chip email={email} key={email} onCloseClick={onCloseClick} />
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
          maxHeight="300px"  // Optional: you can set your own height
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
    </Box>
  </>
  )
}

export default Attendees;
