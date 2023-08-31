import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getPublicEvents } from "../../services/event.services"
import EventCard from "../EventCard/EventCard"

const PublicEvents = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getPublicEvents().then(setEvents).catch(console.error)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = events.filter(
        ev =>
          ev.title.toLowerCase().includes(searchTerm) ||
          ev.description.toLowerCase().includes(searchTerm) ||
          ev.location.toLowerCase().includes(searchTerm)
      )

      setFilteredEvents(filtered)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, events])

  return (
    <Stack gap={5}>
      <InputGroup>
        <Input
          placeholder="search for public events.."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value.toLowerCase())}
        />
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
      </InputGroup>
      <Stack height="700px" overflowY="auto">
        {filteredEvents.map(event => (
          <EventCard key={event.id} eventData={event} />
        ))}
      </Stack>
    </Stack>
  )
}

export default PublicEvents
