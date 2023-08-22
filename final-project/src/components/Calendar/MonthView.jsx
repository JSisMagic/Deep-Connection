import { Grid, Box } from "@chakra-ui/react"
import {
  getStartOfMonth,
  getEndOfMonth,
  geteachDayOfInterval,
} from "../../services/calendar.services"
import format from "date-fns/format"
import { COOL_PURPLE } from "../../common/colors"

const MonthView = ({ date }) => {
  const startOfMonth = getStartOfMonth(date)
  const endOfMonth = getEndOfMonth(date)
  const days = geteachDayOfInterval({ start: startOfMonth, end: endOfMonth })

  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      height="100%"
      borderTop="1px solid"
      borderLeft="1px solid"
      borderColor="gray.200"
    >
      {days.map(day => (
        <Box
          key={day}
          p={3}
          borderBottom="1px solid"
          borderRight="1px solid"
          borderColor="gray.200"
          bgColor="white"
        >
          {format(day, "d")}
        </Box>
      ))}
    </Grid>
  )
}

export default MonthView
