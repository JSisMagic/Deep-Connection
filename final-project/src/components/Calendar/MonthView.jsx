import { Grid, Box } from "@chakra-ui/react";
import { getStartOfMonth, getEndOfMonth, geteachDayOfInterval } from "../../services/calendar.services";
import format from "date-fns/format";


const MonthView = ({ date }) => {
  const startOfMonth = getStartOfMonth(date);
  const endOfMonth = getEndOfMonth(date);
  const days = geteachDayOfInterval({ start: startOfMonth, end: endOfMonth });

  return (
    <Grid templateColumns="repeat(7, 1fr)">
      {days.map(day => (
        <Box key={day} border="1px" borderColor="gray.200" p={3}>
          {format(day, "d")} 
        </Box>
      ))}
    </Grid>
  );
};

export default MonthView;
