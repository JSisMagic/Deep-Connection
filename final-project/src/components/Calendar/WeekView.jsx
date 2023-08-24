/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Grid, Box, Center, GridItem } from "@chakra-ui/react";
import {
  getStartOfWeek,
  addDaysToDate,
} from "../../services/calendar.services";
import DayView from "./DayView";
import format from "date-fns/format";
import { fetchEventsForInterval } from "../../services/event.services";
import HoursColumn from "./HoursColumn";

const WeekView = ({ date }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (date) {
      const startOfWeek = getStartOfWeek(date);
      const endOfWeek = addDaysToDate(startOfWeek, 6);

      fetchEvents(startOfWeek, endOfWeek);
    }
  }, [date]);

  const fetchEvents = async (startOfWeek, endOfWeek) => {
    const fetchedEvents = await fetchEventsForInterval(startOfWeek, endOfWeek);
    setEvents(fetchedEvents);
  };

  // const filterEventsForDay = (day) => {
  //   return events.filter((event) => new Date(event.startDate).toDateString() === day.toDateString());
  // };

  const days = Array.from({ length: 7 }).map((_, i) =>
    addDaysToDate(getStartOfWeek(date), i)
  );

  return (
    <Grid templateCols="50px, 1fr" templateRows="30px, 1fr">
      <GridItem colSpan={1} rowSpan={1} />
      <GridItem rowStart={2}>
        <HoursColumn />
      </GridItem>
      <GridItem colStart={2} rowStart={2}>
        <Grid templateColumns="repeat(7, 1fr)">
          {days.map((day) => (
            <Box key={day} border="1px" borderColor="gray.200">
              <Center p={1} position="sticky" top={16} bg="gray.100">
                {format(day, "EEEE, MMMM d")}{" "}
              </Center>
              <DayView
                date={day}
                events={events.filter((event) => {
                  const eventDate = new Date(event.startDate).toDateString();
                  return day.toDateString() === eventDate;
                })}
              />
              {/* <EventsColumn
                isUsedInWeek={true}
                events={events.filter((event) => {
                  const eventDate = new Date(event.startDate).toDateString();
                  return day.toDateString() === eventDate;
                })}
              /> */}
            </Box>
          ))}
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default WeekView;
