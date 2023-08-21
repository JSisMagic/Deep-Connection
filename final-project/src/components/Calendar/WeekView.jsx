import { Grid, Box } from "@chakra-ui/react";
import { getStartOfWeek, addDaysToDate } from "../../services/calendar.services";
import DayView from "./DayView";
import format from "date-fns/format";



const WeekView = ({ date }) => {
  const startOfWeek = getStartOfWeek(date); // Use date utility to get start of week
  const days = Array.from({ length: 7 }).map((_, i) => addDaysToDate(startOfWeek, i));

  return (
    <Grid templateColumns="repeat(7, 1fr)">
      {days.map(day => (
        <Box key={day} border="1px" borderColor="gray.200" p={3}>
          {format(day, "iiii")}
          <DayView date={day} />
        </Box>
      ))}
    </Grid>
  );
};

export default WeekView; 
