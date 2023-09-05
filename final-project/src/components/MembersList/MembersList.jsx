import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaUserPlus, FaBan, FaSearch } from "react-icons/fa";
import { getAllUsers } from "../../services/users.services";
import { useNavigate } from "react-router-dom";

const MembersList = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [allMembers, setAllMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setAllMembers).catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = allMembers.filter(
        (user) =>
          user?.username?.toLowerCase().includes(searchTerm) ||
          user?.phone?.includes(searchTerm)
      );

      setFilteredMembers(filtered);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, allMembers]);

  return (
    <Stack
      marginTop={5}
      p={4}
      bg="gray.50"
      borderRadius="md"
      overflowY="auto"
      maxHeight="100vh"
    >
      <SimpleGrid columns={1} spacing={3} marginTop={3}>
        {filteredMembers.length ? (
          filteredMembers.map((user) => (
            <Flex
              onClick={() => navigate(`/profile/${user.uid}`)}
              cursor="pointer"
              key={user.uid}
              background="white"
              p={3}
              borderRadius="md"
              justify="space-between"
              align="center"
              boxShadow="base"
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
              <Stack spacing={2}>
                <Button
                  bgColor="#E9D8FD"
                  fontWeight={600}
                  size="sm"
                  leftIcon={<FaUserPlus />}
                >
                  Add
                </Button>
                <Button
                  bgColor="#E9D8FD"
                  fontWeight={600}
                  size="sm"
                  leftIcon={<FaBan />}
                >
                  Block
                </Button>
              </Stack>
            </Flex>
          ))
        ) : (
          <Heading textAlign="center" marginTop={5}>
            No users found
          </Heading>
        )}
      </SimpleGrid>
    </Stack>
  );
};

export default MembersList;
