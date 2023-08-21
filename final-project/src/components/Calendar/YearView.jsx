import { Grid, Box } from "@chakra-ui/react";
import format from "date-fns/format";

const YearView = ({ date }) => {
  const months = Array.from({ length: 12 }).map((_, i) => new Date(date.getFullYear(), i));

  return (
    <Grid templateColumns="repeat(4, 1fr)">
      {months.map(month => (
        <Box key={month} border="1px" borderColor="gray.200" p={3}>
          {format(month, "MMMM")} 
        </Box>
      ))}
    </Grid>
  );
};

export default YearView;
