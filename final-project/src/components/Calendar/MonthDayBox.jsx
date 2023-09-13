import { Box, Stack } from "@chakra-ui/react"
import { format, isToday } from "date-fns"
import { useEffect, useState } from "react"
import { COOL_PURPLE } from "../../common/colors"
import { getEventsForDate } from "../../services/event.services"
import EventBox from "./EventBox"

const MonthDayBox = ({ day, date, events = [], onOpenDetailedModal }) => {
  const [eventsForDay, setEventsForDay] = useState([])

  const isCurrentDay = isToday(day)
  const isOutsideCurrentMonth = day.getMonth() !== date.getMonth()

  useEffect(() => {
    if (events.length > 0) {
      setEventsForDay(getEventsForDate(day, events))
    }
  }, [day, events])


  return (
    <Box
      key={day}
      p={3}
      height="180px"
      borderBottom="1px solid"
      borderRight="1px solid"
      borderColor="gray.200"
      bgColor={isOutsideCurrentMonth ? "gray.50" : "white"}
      color={isOutsideCurrentMonth ? "gray.400" : "black"}
      fontWeight={isCurrentDay ? "bold" : "normal"}
    >
      <Box
        p={1}
        px={3}
        borderRadius="20%"
        w="max-content"
        color={isCurrentDay ? "white" : "black"}
        bg={isCurrentDay ? COOL_PURPLE : "transparent"}
        mb={2}
      >
        {format(day, "d")}
      </Box>
      <Stack>
        {eventsForDay.map(e => (
          <EventBox
            key={e.id}
            isUsedInMonth={true}
            eventData={e}
            onOpenDetailedModal={onOpenDetailedModal}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default MonthDayBox
