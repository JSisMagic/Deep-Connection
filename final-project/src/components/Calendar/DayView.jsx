import { Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import EventsColumn from "./EventsColumn"
import HoursColumn from "./HoursColumn"
import { fetchEventsForInterval } from "../../services/event.services"
import { addDays } from "date-fns"

const DayView = ({ date }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEventsForInterval(new Date(date), addDays(date, 1)).then(setEvents)
  }, [date])

  return (
    <Flex>
      <HoursColumn />
      <EventsColumn date={new Date(date)} borderLeft={true} events={events} />
    </Flex>
  )
}

export default DayView
