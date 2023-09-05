import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Heading,
} from "@chakra-ui/react";
import EventPageCard from "../EventCard/EventCard";
import { useEffect, useState } from "react";
import DetailedEventCard from "../DetailedEventCard/DetailedEventCard";

const EventsList = ({ events = [], inUserProfile }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [detailedEventData, setDetailedEventData] = useState({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    description: "",
    location: "",
  });

  const onOpen = (eventData) => {
    setDetailedEventData({ ...eventData });
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = events
        .filter(
          (ev) =>
            ev.title?.toLowerCase().includes(searchTerm) ||
            ev.description?.toLowerCase().includes(searchTerm) ||
            ev.location?.toLowerCase().includes(searchTerm)
        )
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); 

      setFilteredEvents(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, events]);

  return (
    <Stack gap={5}>
    <InputGroup>
      <Input
        placeholder="Search for events.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>
    </InputGroup>
    <Stack height={!inUserProfile && "700px"} overflowY="auto">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventPageCard
            key={event.id}
            eventData={event}
            onOpenDetailedEvent={onOpen}
          />
        ))
      ) : (
        <Heading size="lg" textAlign="center" marginTop={10}>
          No events found
        </Heading>
      )}
    </Stack>
    <DetailedEventCard
      isOpen={isOpen}
      onClose={onClose}
      detailedEventData={detailedEventData}
      onInviteAcceptDeny={setDetailedEventData}
    />
  </Stack>
  );
};

export default EventsList;
