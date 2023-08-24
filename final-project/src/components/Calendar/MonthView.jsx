import { Grid, Box, Stack } from "@chakra-ui/react"
import {
  getStartOfMonth,
  getEndOfMonth,
  geteachDayOfInterval,
} from "../../services/calendar.services"
import format from "date-fns/format"
import { COOL_PURPLE } from "../../common/colors"
import isToday from "date-fns/isToday"
import startOfWeek from "date-fns/startOfWeek"
import endOfWeek from "date-fns/endOfWeek"

const MonthView = ({ date }) => {
  const startOfMonth = getStartOfMonth(date)
  const endOfMonth = getEndOfMonth(date)

  const startOfCalendarView = startOfWeek(startOfMonth, { weekStartsOn: 0 })
  const endOfCalendarView = endOfWeek(endOfMonth, { weekStartsOn: 0 })

  const days = geteachDayOfInterval({ start: startOfCalendarView, end: endOfCalendarView })

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Box height="100%" >
      <Grid templateColumns="repeat(7, 1fr)" position="sticky" top={16} >
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
