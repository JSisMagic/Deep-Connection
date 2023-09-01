import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { COOL_BLUE, COOL_BLUE_GREEN, COOL_GREEN, COOL_PURPLE } from "../../common/colors"
import DetailedEventCard from "../DetailedEventCard/DetailedEventCard"
import DayView from "./DayView"
import MonthView from "./MonthView"
import WeekView from "./WeekView"
import YearView from "./YearView"

const Calendar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [detailedEventData, setDetailedEventData] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    description: "",
    location: "",
  })
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState("month")
  const navigate = useNavigate()

  const handleChangeView = view => {
    return () => setCurrentView(view)
  }

  const renderView = () => {
    switch (currentView) {
      case "day":
        return (
          <DayView
            date={currentDate.setHours(0, 0, 0, 0)}
            setDate={setCurrentDate}
            onOpenDetailedModal={onOpen}
          />
        )
      case "week":
        return <WeekView date={currentDate} setDate={setCurrentDate} onOpenDetailedModal={onOpen} />
      case "month":
        return (
          <MonthView date={currentDate} setDate={setCurrentDate} onOpenDetailedModal={onOpen} />
        )
      case "year":
        return <YearView date={currentDate} />
      case "workWeek":
        return (
          <WeekView
            date={currentDate}
            setDate={setCurrentDate}
            isWorkWeek={true}
            onOpenDetailedModal={onOpen}
          />
        )
      default:
        return (
          <MonthView date={currentDate} setDate={setCurrentDate} onOpenDetailedModal={onOpen} />
        )
    }
  }
  const onOpen = eventData => {
    setDetailedEventData({ ...eventData })
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <Box className="calendar-container" paddingInline={5} height="100%">
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
          </ButtonGroup>
        </GridItem>
      </Grid>

      {renderView()}

      <DetailedEventCard isOpen={isOpen} onClose={onClose} detailedEventData={detailedEventData} />
    </Box>
  )
}

export default Calendar
