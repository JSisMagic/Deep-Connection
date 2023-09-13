/* eslint-disable react/prop-types */
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Flex, Grid, GridItem, Heading, IconButton } from "@chakra-ui/react"
import { addWeeks, subWeeks } from "date-fns"
import format from "date-fns/format"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { addDaysToDate, getStartOfWeek } from "../../services/calendar.services"
import { getEventsForUser } from "../../services/event.services"
import EventsColumn from "./EventsColumn"
import HoursColumn from "./HoursColumn"
import { CALENDAR_HEIGHT, HEADER_HEIGHT } from "../../common/constrants"

const WeekView = ({ date, setDate, isWorkWeek = false, onOpenDetailedModal }) => {
  const { userData } = useContext(AuthContext)
  const [events, setEvents] = useState([])

  const startDay = isWorkWeek ? 1 : 0 // 1 for Monday, 0 for Sunday
  const endDay = isWorkWeek ? 5 : 6
  const daysCount = endDay - startDay + 1

  useEffect(() => {
    if (date && userData?.uid) {
      getEventsForUser(userData?.uid).then(setEvents)
    }
  }, [date, userData])

  // TODO conditional rendering if isWorkWeek === true to render 5 days (monday - friday)
  const days = Array.from({ length: daysCount }).map((_, i) =>
    addDaysToDate(getStartOfWeek(date), startDay + i)
  )

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

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" py={2}>
        <Button onClick={handleNavigate("today")} width="max-content">
          Today
        </Button>

        <Flex justify="center" align="center" gap={3}>
          <IconButton size="sm" icon={<ArrowBackIcon />} onClick={handleNavigate("prev")} />
          <Heading w="300px" size="md" textAlign="center">
            {format(days[0], "PP")} - {format(days[days.length - 1], "PP")}
          </Heading>
          <IconButton size="sm" icon={<ArrowForwardIcon />} onClick={handleNavigate("next")} />
        </Flex>
      </Grid>
      <Grid
        maxH={{ base: "100%", md: `calc(82vh - ${HEADER_HEIGHT})` }}
        overflowY="auto"
        templateRows="40px 1fr"
        templateColumns={`50px repeat(${daysCount}, 1fr)`}
        borderLeft="1px solid"
        borderRight="1px solid"
        borderTop="1px solid"
        borderColor="gray.300"
      >
        <GridItem rowStart={2} colEnd={2}>
          <HoursColumn />
        </GridItem>
        {days.map((day, i) => (
          <GridItem key={day} colStart={i + 2}>
            <Grid templateRows="40px 1fr" borderLeft="1px solid" borderColor="gray.300">
              <GridItem rowEnd={2} bgColor="gray.50">
                <Center>{format(day, "E, do")}</Center>
              </GridItem>
              <GridItem rowStart={2}>
                <EventsColumn
                  date={day}
                  events={events}
                  isUsedInWeek={true}
                  onOpenDetailedModal={onOpenDetailedModal}
                />
              </GridItem>
            </Grid>
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default WeekView
