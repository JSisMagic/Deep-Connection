import { Avatar, Box, Button, ButtonGroup, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"
import { getAllUsers } from "../../services/users.services"

const MembersList = ({ searchTerm }) => {
  const [allMembers, setAllMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])

  useEffect(() => {
    getAllUsers().then(setAllMembers).catch(console.error)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = allMembers.filter(
        user => user.username.toLowerCase().includes(searchTerm) || user.phone.includes(searchTerm)
      )

      setFilteredMembers(filtered)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm, allMembers])

  return (
    <Stack marginTop={5}>
      {filteredMembers.length ? (
        filteredMembers.map(user => (
          <Flex
            key={user.uid}
            background="gray.100"
            p={3}
            borderRadius="md"
            justify="space-between"
            align="center"
          >
            <Flex gap={3}>
              <Avatar />
              <Box>
                <Heading size="sm">
                  {user.firstName} {user.lastName}
                </Heading>
                <Text fontWeight={600}>@{user.username}</Text>
              </Box>
            </Flex>
            <ButtonGroup size="sm" flexDir="column">
              <Button>Add to contacts</Button>
              <Button>Block user</Button>
            </ButtonGroup>
          </Flex>
        ))
      ) : (
        <Heading textAlign="center" marginTop={5}>
          No users found
        </Heading>
      )}
    </Stack>
  )
}

export default MembersList
