import { Box, Flex, Icon, Text, Heading, Stack, Image } from "@chakra-ui/react"
import { format } from "date-fns"
import { FaLocationDot } from "react-icons/fa6"

const DetailedEventCard = ({ detailedEventData }) => {
  return (
    <Stack gap={3} py={5}>
      <Heading size="lg">{detailedEventData.title}</Heading>
      <Flex p={5} bg="gray.100" borderRadius="lg" gap={3} justifyContent="space-between" align="center">
        <Box flexGrow={1} minWidth="60%">
          <Heading size="md" mb={1}>
            {format(detailedEventData.startDate, "MMMM d")}
          </Heading>
          <Text fontWeight={700}>
            @{format(detailedEventData.startDate, "HH:mm")} -{" "}
            {format(detailedEventData.endDate, "HH:mm O")}
          </Text>
        </Box>
        {detailedEventData?.location && (
          <Flex gap={1}>
            <Icon as={FaLocationDot} boxSize={6} color="red.700"/>
            <Text fontSize={14} fontWeight={600}>
              {detailedEventData.location}
            </Text>
          </Flex>
        )}
      </Flex>
      <Image src={detailedEventData.image} borderRadius="lg" />
      <Box dangerouslySetInnerHTML={{ __html: detailedEventData.description }} />
    </Stack>
  )
}

export default DetailedEventCard
