import { Flex } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { getEventsForUser } from "../../services/event.services"
import EventsColumn from "./EventsColumn"
import HoursColumn from "./HoursColumn"

const DayView = ({ date, onOpenDetailedModal }) => {
  const { user } = useContext(AuthContext)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (user.uid) {
      getEventsForUser(user.uid).then(setEvents).catch(console.error)
    }
  }, [date, user.uid])

  return (
    <Flex>
      <HoursColumn />
      <EventsColumn
        date={new Date(date)}
        borderLeft={true}
        events={events}
        onOpenDetailedModal={onOpenDetailedModal}
      />
    </Flex>
  )
}

export default DayView
