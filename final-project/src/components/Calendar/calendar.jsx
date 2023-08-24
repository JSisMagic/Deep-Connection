import React, { useState } from "react"
import { Box, Button, ButtonGroup, Grid, GridItem } from "@chakra-ui/react"
import DayView from "./DayView"
import WeekView from "./WeekView"
import MonthView from "./MonthView"
import YearView from "./YearView"
import WorkWeekView from "./WorkWeekView"
import {
  COOL_BLACK,
  COOL_BLUE,
  COOL_BLUE_GREEN,
  COOL_GREEN,
  COOL_PURPLE,
} from "../../common/colors"
import { useNavigate } from "react-router-dom"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState("month")
  const navigate = useNavigate()

  const handleChangeView = view => {
    return () => setCurrentView(view)
  }

  const renderView = () => {
    switch (currentView) {
      case "day":
        return <DayView date={currentDate} />
      case "week":
        return <WeekView date={currentDate} />
      case "month":
        return <MonthView date={currentDate} />
      case "year":
        return <YearView date={currentDate} />
      case "workWeek":
        return <WorkWeekView date={currentDate} />
      default:
        return <MonthView date={currentDate} />
    }
  }

  return (
    <Box className="calendar-container" paddingInline={5} height="100%" overflowY="scroll">
      <Grid
      zIndex={10}
        templateColumns="repeat(3, 1fr)"
        position="sticky"
        top={0}
        background="white"
        borderBottom="2px solid"
        borderColor="gray.100"
      >
        <GridItem>
          <Button colorScheme="blue" onClick={() => navigate("/create-event")}>
            Create Event
          </Button>
        </GridItem>
        <GridItem>
          <ButtonGroup variant="outline" width="100%" justifyContent="center" paddingBottom={6}>
            <Button background={COOL_PURPLE} color="white" onClick={handleChangeView("day")}>
              Day
            </Button>
            <Button background={COOL_GREEN} color="white" onClick={handleChangeView("week")}>
              Week
            </Button>
            <Button background={COOL_BLUE} color="white" onClick={handleChangeView("workWeek")}>
              Work Week
            </Button>
            <Button background={COOL_BLUE_GREEN} color="white" onClick={handleChangeView("month")}>
              Month
            </Button>
            {/* <Button  onClick={handleChangeView("year")}>Year</Button> */}
          </ButtonGroup>
        </GridItem>
      </Grid>

      {renderView()}
    </Box>
  )
}

export default Calendar
