import { Flex, Box, Grid, Button, IconButton, Heading } from "@chakra-ui/react"
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { getEventsForUser } from "../../services/event.services"
import EventsColumn from "./EventsColumn"
import HoursColumn from "./HoursColumn"
import { addDays, format, subDays } from "date-fns"
import { CALENDAR_HEIGHT } from "../../common/constrants"

const DayView = ({ date, setDate, onOpenDetailedModal }) => {
  const { user } = useContext(AuthContext)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (user.uid) {
      getEventsForUser(user.uid).then(setEvents).catch(console.error)
    }
  }, [date, user.uid])

  const handleNavigate = action => {
    return () => {
      switch (action) {
        case "today":
          setDate(new Date())
          break
        case "prev":
          setDate(prev => subDays(prev, 1))
          break
        case "next":
          setDate(prev => addDays(prev, 1))
      }
    }
  }

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" py={2} borderBottom="1px solid" borderColor="gray.200">
        <Button onClick={handleNavigate("today")} width="max-content">
          Today
        </Button>

        <Flex justify="center" align="center" gap={3}>
          <IconButton size="sm" icon={<ArrowBackIcon />} onClick={handleNavigate("prev")} />
          <Heading w="300px" size="md" textAlign="center">
            {/* {format(date, `${days[0].getDate()}-${days[6].getDate()}, MMMM`)} */}
            {format(date, "PPPP")}
          </Heading>
          <IconButton size="sm" icon={<ArrowForwardIcon />} onClick={handleNavigate("next")} />
        </Flex>
      </Grid>
      <Box height={CALENDAR_HEIGHT} overflowY="scroll">
        <Flex>
          <HoursColumn />
          <EventsColumn
            date={new Date(date)}
            borderLeft={true}
            events={events}
            onOpenDetailedModal={onOpenDetailedModal}
          />
        </Flex>
      </Box>
    </>
  )
}

export default DayView
