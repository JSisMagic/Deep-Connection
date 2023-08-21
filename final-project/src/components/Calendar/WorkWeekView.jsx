import { Grid, Box } from "@chakra-ui/react";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import { eachDayOfInterval } from 'date-fns';

const WorkWeekView = ({ date }) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });  // Monday as start of the week
  const end = addDays(start, 4); // Friday
  
  const workWeekDays = eachDayOfInterval({ start, end });

  return (
    <Grid templateColumns="repeat(5, 1fr)">
      {workWeekDays.map(day => (
        <Box key={day} border="1px" borderColor="gray.200" p={3}>
          {format(day, "EEEE, MMMM d")} 
        </Box>
      ))}
    </Grid>
  );
};

export default WorkWeekView;
