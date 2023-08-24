import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react"
import EventsColumn from "./EventsColumn"
import HoursColumn from "./HoursColumn"

const DayView = ({ date, events = [] }) => {
  const renderEventsForHour = hour => {
    return events
      .filter(event => {
        const eventStartHour = new Date(event.startDate).getHours()
        return eventStartHour === hour
      })
      .map((event, index) => (
        <Text key={index} mt={2} fontSize="sm" color="blue.600">
          {event.title} ({new Date(event.startDate).getHours()}:
          {new Date(event.startDate).getMinutes()} - {new Date(event.endDate).getHours()}:
          {new Date(event.endDate).getMinutes()})
        </Text>
      ))
  }

  return (
    <Flex>
      <HoursColumn />
      <EventsColumn />
    </Flex>
  )
}

export default DayView
