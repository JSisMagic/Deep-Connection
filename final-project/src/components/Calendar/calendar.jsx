import React, { useState } from "react"
import { Box, Button, ButtonGroup } from "@chakra-ui/react"
import DayView from "./DayView"
import WeekView from "./WeekView"
import MonthView from "./MonthView"
import YearView from "./YearView"
import WorkWeekView from "./WorkWeekView"
import { COOL_BLACK, COOL_BLUE, COOL_BLUE_GREEN, COOL_GREEN, COOL_PURPLE } from "../../common/colors"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState("month")

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
    <Box className="calendar-container" p={5} paddingTop={16} height="100%">
      <ButtonGroup variant="outline" width="100%" justifyContent="center" marginBottom={6}>
        <Button background={COOL_PURPLE} color="white" onClick={handleChangeView("day")}>
          Day
        </Button>
        <Button background={COOL_GREEN} color="white"  onClick={handleChangeView("week")}>Week</Button>
        <Button background={COOL_BLUE} color="white" onClick={handleChangeView("month")}>Month</Button>
        {/* <Button  onClick={handleChangeView("year")}>Year</Button> */}
        <Button background={COOL_BLUE_GREEN} color="white" onClick={handleChangeView("workWeek")}>Work Week</Button>
      </ButtonGroup>
      {renderView()}
    </Box>
  )
}

export default Calendar
