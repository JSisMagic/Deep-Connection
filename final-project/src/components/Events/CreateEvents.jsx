import React, { useState } from 'react';
import { Button, Input, Textarea, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { createEvent } from '../../services/event.services';

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
    <VStack spacing={4} padding={5}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input 
          value={eventTitle} 
          onChange={(e) => setEventTitle(e.target.value)} 
          placeholder="Title"
        />
      </FormControl>
      
      <FormControl>
        <FormLabel>Location</FormLabel>
        <Input 
          value={eventLocation} 
          onChange={(e) => setEventLocation(e.target.value)} 
          placeholder="Location"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea 
          value={eventDescription} 
          onChange={(e) => setEventDescription(e.target.value)} 
          placeholder="Description"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Start Date and Time</FormLabel>
        <Input 
          type="datetime-local"
          value={eventStartDate}
          onChange={e => setEventStartDate(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>End Date and Time</FormLabel>
        <Input 
          type="datetime-local"
          value={eventEndDate}
          onChange={e => setEventEndDate(e.target.value)}
        />
      </FormControl>
      
      <Button colorScheme="blue" onClick={handleCreateEvent}>Create Event</Button>
    </VStack>
  );
};

export default CreateEvent;
