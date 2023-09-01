import { useEffect, useState } from "react"
import { getPublicEvents } from "../../services/event.services"
import EventsList from "../EventsList/EventsList"

const PublicEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getPublicEvents().then(setEvents).catch(console.error)
  }, [])

  return <EventsList events={events} />
}

export default PublicEvents
