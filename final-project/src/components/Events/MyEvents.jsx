import { useEffect, useState } from "react"
import { getEventsForUser } from "../../services/event.services"
import EventsList from "../EventsList/EventsList"

const MyEvents = ({ inUserProfile = false, uid = null }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (uid) {
      getEventsForUser(uid).then(setEvents).catch(console.error)
    }
  }, [uid])

  return <EventsList inUserProfile={inUserProfile} events={events} />
}

export default MyEvents
