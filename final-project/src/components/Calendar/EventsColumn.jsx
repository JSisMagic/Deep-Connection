/* eslint-disable react/prop-types */
import { Grid, GridItem } from "@chakra-ui/react"
import { isSameDay } from "date-fns"
import { useEffect, useState } from "react"
import { getEventsForDate } from "../../services/event.services"
import EventBox from "./EventBox"

const EventsColumn = ({ events = [], date, isUsedInWeek, borderLeft = false }) => {
  const [eventsForDate, setEventsForDate] = useState([])
  console.log("events", eventsForDate)

  useEffect(() => {
    setEventsForDate(getEventsForDate(date, events))
  }, [events, date])

  return (
    <Grid
      backgroundImage={`repeating-linear-gradient(180deg, #CBD5E0, #CBD5E0 1px, #FFF 1px, #FFFDFA 30px)`}
      templateRows="repeat(48, 30px)"
      flexGrow={1}
      templateColumns={`repeat(auto-fit, minmax(${isUsedInWeek ? "30px" : "50px"}, 1fr))`}
      borderLeft={borderLeft && "1px solid"}
      borderColor="gray.300"
    >
      {eventsForDate?.map(event => (
        <GridItem
          key={event.id}
          rowStart={
            isSameDay(event.startDate, event.endDate)
              ? event.startHour * 2 + (event.startAtHalf ? 2 : 1)
              : isSameDay(event.startDate, date)
              ? event.startHour * 2 + (event.startAtHalf ? 2 : 1)
              : 1
          }
          rowEnd={
            isSameDay(event.endDate, date) ? event.endHour * 2 + (event.endAtHalf ? 2 : 1) : 49
          }
        >
          <EventBox
            isUsedInWeek={isUsedInWeek}
            title={event.title}
            color={event.color}
            startDate={event.startDate}
          />
        </GridItem>
      ))}
    </Grid>
  )
}

export default EventsColumn
