import React, { useState, useEffect } from "react"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { createEvent } from "../../services/event.services"
import { auth } from "../../config/firebase"
import bgImage from "../../assets/images/hero.png" // Import the background image hereq
import PlacesAutocomplete from "../Location/PlacesAutocomplete"
import { BiTag } from "react-icons/bi"
import { COOL_BLUE, COOL_GREEN, COOL_PURPLE, categoryColors } from "../../common/colors"
import { useNavigate } from "react-router-dom"

const CreateEvent = () => {
  const navigate = useNavigate()
  const [eventTitle, setEventTitle] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventStartDate, setEventStartDate] = useState("")
  const [eventEndDate, setEventEndDate] = useState("")
  const [eventColor, setEventColor] = useState("blue")
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser.uid)
    }
  }, [])

  const handleCreateEvent = async () => {
    if (!user) {
      console.error("No user authenticated. Event not created.")
      return
    }

    const newEvent = {
      title: eventTitle,
      location: eventLocation,
      description: eventDescription,
      startDate: eventStartDate,
      endDate: eventEndDate,
      createdBy: user,
      color: eventColor,
    }

    try {
      const id = await createEvent(newEvent)
      console.log("New event created with ID:", id)
      navigate("/calendar")
    } catch (error) {
      console.error("Error creating event:", error)
    }
  }

  const handleChangeEventColor = value => {
    setEventColor(value)
  }

  return (
    <div
      style={{
        // backgroundImage: `url(${bgImage})`,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <VStack
        spacing={4}
        padding={5}
        width="30%"
        bgColor="rgba(255,255,255)"
        borderRadius="lg"
        boxShadow="2xl"
      >
        <FormLabel>Title</FormLabel>
        <Input
          value={eventTitle}
          onChange={e => setEventTitle(e.target.value)}
          placeholder="Title"
        />

        <FormLabel>Location</FormLabel>
        <PlacesAutocomplete selected={eventLocation} setSelected={setEventLocation} />

        <FormLabel>Description</FormLabel>
        <Textarea
          value={eventDescription}
          onChange={e => setEventDescription(e.target.value)}
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

        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            rightIcon={<BiTag />}
            color={`rgb(${categoryColors[eventColor]})`}
            bg={`rgba(${categoryColors[eventColor]}, .3)`}
            _hover={{ bgColor: `rgba(${categoryColors[eventColor]}, .4)` }}
            _focus={{ bgColor: `rgba(${categoryColors[eventColor]}, .4)` }}
            _active={{ bgColor: `rgba(${categoryColors[eventColor]}, .4)` }}
          >
            Categorize
          </MenuButton>
          <MenuList>
            <MenuOptionGroup type="radio" defaultValue="blue" onChange={handleChangeEventColor}>
              <MenuItemOption
                value="pink"
                _hover={{ bgColor: `rgba(${categoryColors.pink}, .3)` }}
                color={`rgb(${categoryColors.pink})`}
                fontWeight={600}
              >
                Pink
              </MenuItemOption>
              <MenuItemOption
                value="purple"
                _hover={{ bgColor: `rgba(${categoryColors.purple}, .3)` }}
                color={`rgb(${categoryColors.purple})`}
                fontWeight={600}
              >
                Purple
              </MenuItemOption>
              <MenuItemOption
                value="blue"
                _hover={{ bgColor: `rgba(${categoryColors.blue}, .3)` }}
                color={`rgb(${categoryColors.blue})`}
                fontWeight={600}
              >
                Blue
              </MenuItemOption>
              <MenuItemOption
                value="green"
                _hover={{ bgColor: `rgba(${categoryColors.green}, .3)` }}
                color={`rgb(${categoryColors.green})`}
                fontWeight={600}
              >
                Green
              </MenuItemOption>
              <MenuItemOption
                value="yellow"
                _hover={{ bgColor: `rgba(${categoryColors.yellow}, .3)` }}
                color={`rgb(${categoryColors.yellow})`}
                fontWeight={600}
              >
                Yellow
              </MenuItemOption>
              <MenuItemOption
                value="orange"
                _hover={{ bgColor: `rgba(${categoryColors.orange}, .3)` }}
                color={`rgb(${categoryColors.orange})`}
                fontWeight={600}
              >
                Orange
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        <Button colorScheme="blue" onClick={handleCreateEvent}>
          Create Event
        </Button>
      </VStack>
    </div>
  )
}

export default CreateEvent
