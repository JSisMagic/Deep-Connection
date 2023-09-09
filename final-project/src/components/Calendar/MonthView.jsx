import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Grid, Heading, IconButton, GridItem } from "@chakra-ui/react"
import { addMonths, subMonths } from "date-fns"
import endOfWeek from "date-fns/endOfWeek"
import format from "date-fns/format"
import isToday from "date-fns/isToday"
import startOfWeek from "date-fns/startOfWeek"
import { COOL_PURPLE } from "../../common/colors"
import {
  getEndOfMonth,
  getStartOfMonth,
  geteachDayOfInterval,
} from "../../services/calendar.services"
import { useState, useEffect, useContext } from "react"
import MonthDayBox from "./MonthDayBox"
import { getEventsForUser } from "../../services/event.services"
import { AuthContext } from "../../context/AuthContext"
import { CALENDAR_HEIGHT } from "../../common/constrants"

const MonthView = ({ date, setDate, onOpenDetailedModal }) => {
  const [events, setEvents] = useState()
  const { user } = useContext(AuthContext)

  const startOfMonth = getStartOfMonth(date)
  const endOfMonth = getEndOfMonth(date)

  const startOfCalendarView = startOfWeek(startOfMonth, { weekStartsOn: 0 })
  const endOfCalendarView = endOfWeek(endOfMonth, { weekStartsOn: 0 })

  const days = geteachDayOfInterval({ start: startOfCalendarView, end: endOfCalendarView })

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  useEffect(() => {
    if (user?.uid) {
      getEventsForUser(user.uid).then(setEvents)
    }
  }, [user?.uid])

  const handleNavigate = action => {
    return () => {
      switch (action) {
        case "today":
          setDate(new Date())
          break
        case "prev":
          setDate(prev => subMonths(prev, 1))
          break
        case "next":
          setDate(prev => addMonths(prev, 1))
      }
    }
  }

  return (
    <>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(3, 1fr)" }} py={2}>
        <Button onClick={handleNavigate("today")} width="max-content">
          Today
        </Button>

        <Flex justify="center" align="center" gap={3}>
          <IconButton size="sm" icon={<ArrowBackIcon />} onClick={handleNavigate("prev")} />
          <Heading w={{ base: "150px", sm: "200px" }} size="md" textAlign="center">
            {format(date, "MMMM, y")}
          </Heading>
          <IconButton size="sm" icon={<ArrowForwardIcon />} onClick={handleNavigate("next")} />
        </Flex>
      </Grid>
      <Box
        height={CALENDAR_HEIGHT}
        overflowY="auto"
        borderTop="1px solid"
        borderLeft="1px solid"
        borderColor="gray.200"
      >
        <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(7, 1fr)" }}>
          {weekdays.map(weekday => (
            <Box
              key={weekday}
              p={{ base: 0.5, sm: 1 }}
              borderBottom="1px solid"
              borderRight="1px solid"
              borderColor="gray.200"
              fontWeight="bold"
              bgColor="gray.100"
              textAlign="center"
            >
              {weekday}
            </Box>
          ))}
        </Grid>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(7, 1fr)" }} templateRows="auto">
          {days.map(day => {
            return (
              <GridItem key={day}>
                <MonthDayBox
                  day={day}
                  date={date}
                  events={events}
                  onOpenDetailedModal={onOpenDetailedModal}
                />
              </GridItem>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}

export default MonthView
