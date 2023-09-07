import { useNavigate } from "react-router-dom"
import { Flex, Avatar, Heading, Text, Box } from "@chakra-ui/react"
import { useEffect } from "react"
import { getUserByUid } from "../../services/users.services"
import { useState } from "react"

const EventCreatorInfo = ({ creator }) => {
  const navigate = useNavigate()
  const [creatorData, setCreatorData] = useState({})

  useEffect(() => {
    getUserByUid(creator).then(setCreatorData).catch(console.error)
  }, [creator])

  return (
    <Box>
      <Text fontSize="5 px" color="gray.600" mb={2}>
        Creator:
      </Text>
      <Flex
        cursor="pointer"
        background="white"
        p={3}
        borderRadius="md"
        justify="space-between"
        align="center"
        boxShadow="base"
      >
        <Flex gap={3} onClick={() => navigate(`/profile/${creatorData.uid}`)}>
          <Avatar src={creatorData.profilePicture} />
          <Box>
            <Heading size="sm">
              {creatorData.firstName} {creatorData.lastName}
            </Heading>
            <Text fontWeight={600}>@{creatorData.username}</Text>
          </Box>
        </Flex>
        {/* You can add more buttons or actions related to the creator here */}
      </Flex>
    </Box>
  )
}

export default EventCreatorInfo
