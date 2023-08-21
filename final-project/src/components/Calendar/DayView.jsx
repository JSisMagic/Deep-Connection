import { Box } from "@chakra-ui/react";


const DayView = ({ date }) => {
  const hours = Array.from({ length: 24 }).map((_, i) => i);

  return (
    <Box>
      {hours.map(hour => (
        <Box key={hour} border="1px" borderColor="gray.200" height="60px">
          {hour}:00
        </Box>
      ))}
    </Box>
  );
};

export default DayView;
