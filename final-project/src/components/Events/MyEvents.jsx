import { useContext, useEffect, useState } from "react"
import EventsList from "../EventsList/EventsList"
import { getEventsForUser } from "../../services/event.services"
import { AuthContext } from "../../context/AuthContext"

const MyEvents = () => {
  const { user } = useContext(AuthContext)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (user?.uid) {
      getEventsForUser(user.uid).then(setEvents).catch(console.error)
    }
  }, [user?.uid])

  return <EventsList events={events} />
}

export default MyEvents
