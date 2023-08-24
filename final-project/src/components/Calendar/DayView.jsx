import React from "react";
import { Box, Text } from "@chakra-ui/react";

const DayView = ({ events = [] }) => {
  const hours = Array.from({ length: 24 }).map((_, i) => i);

  const renderEventsForHour = (hour) => {
    return events
      .filter((event) => {
        const eventStartHour = new Date(event.startDate).getHours();
        return eventStartHour === hour;
      })
      .map((event, index) => (
        <Text key={index} mt={2} fontSize="sm" color="blue.600">
          {event.title} ({new Date(event.startDate).getHours()}:
          {new Date(event.startDate).getMinutes()} -{" "}
          {new Date(event.endDate).getHours()}:
          {new Date(event.endDate).getMinutes()})
        </Text>
      ));
  };

  return (
    <Box>
      {hours.map((hour) => (
        <Box
          key={hour}
          border="1px"
          borderColor="gray.200"
          height="60px"
          padding={2}
        >
          <Text>{hour}:00</Text>
          {renderEventsForHour(hour)}
        </Box>
      ))}
    </Box>
  );
};

export default DayView;
