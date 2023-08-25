/* eslint-disable react/prop-types */
import { Box, Button, Center, Flex, Grid, GridItem, Heading, IconButton } from "@chakra-ui/react"
import format from "date-fns/format"
import { useEffect, useState } from "react"
import { addDaysToDate, getStartOfWeek } from "../../services/calendar.services"
import { fetchEventsForInterval } from "../../services/event.services"
import EventsColumn from "./EventsColumn"
import HoursColumn from "./HoursColumn"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { addWeeks, subWeeks } from "date-fns"

const WeekView = ({ date, setDate, isWorkWeek = false }) => {
  const [events, setEvents] = useState([])
  useEffect(() => {
    if (date) {
      const startOfWeek = getStartOfWeek(date)
      const endOfWeek = addDaysToDate(startOfWeek, 6)

      fetchEvents(startOfWeek, endOfWeek)
    }
  }, [date])

  const fetchEvents = async (startOfWeek, endOfWeek) => {
    const fetchedEvents = await fetchEventsForInterval(startOfWeek, endOfWeek)
    setEvents(fetchedEvents)
  }

  // TODO conditional rendering if isWorkWeek === true to render 5 days (monday - friday)
  const days = Array.from({ length: 7 }).map((_, i) => addDaysToDate(getStartOfWeek(date), i))

  const handleNavigate = action => {
    return () => {
      switch (action) {
        case "today":
          setDate(new Date())
          break
        case "prev":
          setDate(prev => subWeeks(prev, 1))
          break
        case "next":
          setDate(prev => addWeeks(prev, 1))
      }
    }
  }
  console.log(days)
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" py={2}>
        <Button onClick={handleNavigate("today")} width="max-content">
          Today
        </Button>

        <Flex justify="center" align="center" gap={3}>
          <IconButton size="sm" icon={<ArrowBackIcon />} onClick={handleNavigate("prev")} />
          <Heading w="300px" size="md" textAlign="center">
            {/* {format(date, `${days[0].getDate()}-${days[6].getDate()}, MMMM`)} */}
            {format(days[0], "PP")} - {format(days[6], "PP")}
          </Heading>
          <IconButton size="sm" icon={<ArrowForwardIcon />} onClick={handleNavigate("next")} />
        </Flex>
      </Grid>
      <Grid
        templateRows="40px 1fr"
        templateColumns="50px repeat(7, 1fr)"
        borderLeft="1px solid"
        borderRight="1px solid"
        borderColor="gray.300"
      >
        <GridItem rowStart={2} colEnd={2}>
          <HoursColumn />
        </GridItem>
        {days.map((day, i) => (
          <GridItem key={day} colStart={i + 2}>
            <Grid templateRows="40px 1fr" borderLeft="1px solid" borderColor="gray.300">
              <GridItem rowEnd={2} bgColor="gray.50">
                <Center>{format(day, "EEEE, MMMM d")}</Center>
              </GridItem>
              <GridItem rowStart={2}>
                <EventsColumn date={day} events={events} isUsedInWeek={true} />
              </GridItem>
            </Grid>
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default WeekView
