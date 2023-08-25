import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton
} from "@chakra-ui/react"
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

const MonthView = ({ date, setDate }) => {
  const startOfMonth = getStartOfMonth(date)
  const endOfMonth = getEndOfMonth(date)

  const startOfCalendarView = startOfWeek(startOfMonth, { weekStartsOn: 0 })
  const endOfCalendarView = endOfWeek(endOfMonth, { weekStartsOn: 0 })

  const days = geteachDayOfInterval({ start: startOfCalendarView, end: endOfCalendarView })

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

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
    <Box height="100%">
      <Grid templateColumns="repeat(3, 1fr)" py={2}>
        <Button onClick={handleNavigate("today")} width="max-content">
          Today
        </Button>

        <Flex justify="center" align="center" gap={3}>
          <IconButton size="sm" icon={<ArrowBackIcon />} onClick={handleNavigate("prev")} />
          <Heading w="200px" size="md" textAlign="center">
            {format(date, "MMMM, y")}
          </Heading>
          <IconButton size="sm" icon={<ArrowForwardIcon />} onClick={handleNavigate("next")} />
        </Flex>
      </Grid>
      <Grid templateColumns="repeat(7, 1fr)" position="sticky" top={16}>
        {weekdays.map(weekday => (
          <Box
            key={weekday}
            p={1}
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
      <Grid
        templateColumns="repeat(7, 1fr)"
        templateRows="50px, auto"
        height="100%"
        borderTop="1px solid"
        borderLeft="1px solid"
        borderColor="gray.200"
      >
        {days.map(day => {
          const isCurrentDay = isToday(day)
          const isOutsideCurrentMonth = day.getMonth() !== date.getMonth()

          return (
            <Box
              key={day}
              p={3}
              borderBottom="1px solid"
              borderRight="1px solid"
              borderColor="gray.200"
              bgColor={isCurrentDay ? COOL_PURPLE : isOutsideCurrentMonth ? "gray.50" : "white"}
              color={isOutsideCurrentMonth ? "gray.400" : "black"}
              fontWeight={isCurrentDay ? "bold" : "normal"}
            >
              {format(day, "d")}
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

export default MonthView
