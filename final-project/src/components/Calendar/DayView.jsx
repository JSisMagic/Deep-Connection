import { Flex, Box, Grid, Button, IconButton, Heading, GridItem, Image } from "@chakra-ui/react"
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { getEventsForUser } from "../../services/event.services"
import EventsColumn from "./EventsColumn"
import HoursColumn from "./HoursColumn"
import { addDays, format, subDays } from "date-fns"
import { CALENDAR_HEIGHT } from "../../common/constrants"
import TodoComponent from "../Todo/ToDo"

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

  const DESKTOP_AREAS = `
  "calendar quote"
  "calendar todos"
  `
  const MOBILE_AREAS = `
  "calendar"
  "todos"
  "quote"
  `

  return (
    <Grid
      templateAreas={{ base: MOBILE_AREAS, lg: DESKTOP_AREAS }}
      gridTemplateColumns={{ lg: "2fr 1fr" }}
      gridTemplateRows={{ lg: "1fr 2fr" }}
      columnGap={3}
      rowGap={3}
    >
      <GridItem area="calendar">
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
            mx={{ base: "auto", sm: "unset" }}
          >
            Today
          </Button>

          <Flex justify="center" align="center" gap={3} mx={{ base: "auto", sm: "unset" }}>
            <IconButton size="sm" icon={<ArrowBackIcon />} onClick={handleNavigate("prev")} />
            <Heading size="md" textAlign="center" w={{ base: "200px", md: "300px" }}>
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
      </GridItem>
      <GridItem
        h={{base: "250px", lg: "100%"}}
        area="quote"
        style={{
          backgroundImage: `url(https://zenquotes.io/api/image)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></GridItem>
      <GridItem area="todos">
        <TodoComponent />
      </GridItem>
    </Grid>
  )
}

export default DayView
