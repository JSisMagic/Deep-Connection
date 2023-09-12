import { Flex, Heading, Stack } from "@chakra-ui/react"
import { forwardRef, useEffect, useState } from "react"
import { getPublicEvents } from "../../services/event.services"
import EventPageCard from "../EventCard/EventCard"

const TrendingEvents = forwardRef(function TrendingEvents(props, ref) {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getPublicEvents().then(data => {
      const sortedByMostParticipants = data.sort(
        (a, b) => (b.attendees?.accepted?.length || 0) - (a.attendees?.accepted?.length || 0)
      )

      setEvents(sortedByMostParticipants.slice(0, 3))
    })
  }, [])

  return (
    <Stack height={{ lg: "100vh" }} gap={6} py={12} px={{base: 6, md: 16}}>
      <Heading size="2xl" my={8}>Trending events</Heading>
      <Flex ref={ref} gap={5} justify="center" direction={{ base: "column", lg: "row" }}>
        {events.map(e => (
          <EventPageCard key={e.id} eventData={e} isUsedLanding={true} />
        ))}
      </Flex>
    </Stack>
  )
})

export default TrendingEvents
