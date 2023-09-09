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
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} 
        py={2} 
        borderBottom="1px solid" 
        borderColor="gray.200"
        gap={{ base: 2, md: 3 }}
      >
        <Button 
          onClick={handleNavigate("today")} 
          width="max-content" 
          mx={{ base: 'auto', sm: 'unset' }}>
          Today
        </Button>

        <Flex 
          justify="center" 
          align="center" 
          gap={3} 
          mx={{ base: 'auto', sm: 'unset' }}
        >
          <IconButton size="sm" icon={<ArrowBackIcon />} onClick={handleNavigate("prev")} />
          <Heading  size="md" textAlign="center"  w={{ base: "200px", md: "300px" }} >
            {/* {format(date, `${days[0].getDate()}-${days[6].getDate()}, MMMM`)} */}
            {format(date, "PPPP")}
          </Heading>
          <IconButton size="sm" icon={<ArrowForwardIcon />} onClick={handleNavigate("next")} />
        </Flex>
      </Grid>
      <Box overflowY="scroll" height={{ base: "300px", md: CALENDAR_HEIGHT }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "flex-start" }}
        >
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
