import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { getPrivateEvents } from "../../services/event.services" // You might need to create this service function
import EventsList from "../EventsList/EventsList"

const PrivateEvents = () => {
  const { user } = useContext(AuthContext)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (user?.uid) {
      getPrivateEvents(user.uid).then(setEvents).catch(console.error)
    }
  }, [user?.uid])

  return <EventsList events={events} />
}

export default PrivateEvents
