import React, { useState, useEffect } from "react";
import { Grid, Box } from "@chakra-ui/react";
import { getStartOfWeek, addDaysToDate } from "../../services/calendar.services";
import DayView from "./DayView";
import format from "date-fns/format";
import { fetchEventsForInterval } from "../../services/event.services";



const WeekView = ({ date }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const startOfWeek = getStartOfWeek(date);
    const endOfWeek = addDaysToDate(startOfWeek, 6); 

    const fetchEvents = async () => {
      const fetchedEvents = await fetchEventsForInterval(startOfWeek, endOfWeek);
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, [date]);

  const filterEventsForDay = (day) => {
    return events.filter(
      (event) =>
        new Date(event.startDate).toDateString() === day.toDateString()
    );
  };

  const days = Array.from({ length: 7 }).map((_, i) => addDaysToDate(getStartOfWeek(date), i));

  return (
    <Grid templateColumns="repeat(7, 1fr)">
      {days.map(day => (
        <Box key={day} border="1px" borderColor="gray.200" p={3}>
          {format(day, "EEEE, MMMM d")} 
          <DayView date={day} events={events.filter(event => {
            const eventDate = new Date(event.startDate).toDateString();
            return day.toDateString() === eventDate;
          })} />
        </Box>
      ))}
    </Grid>
  );
};

export default WeekView; 
