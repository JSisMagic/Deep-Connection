import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Textarea, VStack } from "@chakra-ui/react";
import { createEvent } from '../../services/event.services';
import bgImage from "../../assets/images/hero.png"; // Import the background image hereq

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');

  const handleCreateEvent = async () => {
    const newEvent = {
      title: eventTitle,
      location: eventLocation,
      description: eventDescription,
      startDate: eventStartDate,
      endDate: eventEndDate
    };

    try {
      const id = await createEvent(newEvent);
      console.log("New event created with ID:", id);
    } catch (error) {
      console.error("Error creating event:", error);
    }

    setEventTitle('');
    setEventLocation('');
    setEventDescription('');
    setEventStartDate('');
    setEventEndDate('');
  };

  return (
    <div style={{ backgroundImage: `url(${bgImage})`, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <VStack spacing={4} padding={5} width="30%" bgColor="rgba(255,255,255)" borderRadius="lg" boxShadow="2xl">
        <FormLabel>Title</FormLabel>
        <Input
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Title"
        />

        <FormLabel>Location</FormLabel>
        <Input
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          placeholder="Location"
        />

        <FormLabel>Description</FormLabel>
        <Textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Description"
        />

        <FormLabel>Start Date and Time</FormLabel>
        <Input
          type="datetime-local"
          value={eventStartDate}
          onChange={e => setEventStartDate(e.target.value)}
        />

        <FormLabel>End Date and Time</FormLabel>
        <Input
          type="datetime-local"
          value={eventEndDate}
          onChange={e => setEventEndDate(e.target.value)}
        />

        <Button colorScheme="blue" onClick={handleCreateEvent}>
          Create Event
        </Button>
      </VStack>
    </div>
  );
};

export default CreateEvent;
