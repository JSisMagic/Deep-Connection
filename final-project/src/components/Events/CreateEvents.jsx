import React, { useState, useEffect } from "react";
import {
  Button,
  Switch,
  Text,
  Stack,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { createEvent } from "../../services/event.services";
import { auth, storage } from "../../config/firebase";
import bgImage from "../../assets/images/hero.png"; // Import the background image hereq
import PlacesAutocomplete from "../Location/PlacesAutocomplete";
import { BiTag } from "react-icons/bi";
import {
  COOL_BLUE,
  COOL_GREEN,
  COOL_PURPLE,
  categoryColors,
} from "../../common/colors";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SUPPORTED_FORMATS } from "../../common/constrants";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventColor, setEventColor] = useState("blue");
  const [isPrivate, setIsPrivate] = useState(true);
  const [image, setImage] = useState("");

  const [desc, setDesc] = useState("");

  const handleImageUpload = (e) => {
    if (!SUPPORTED_FORMATS.includes(e.target.files[0].type)) {
      console.log("Unsupported file format!");
    }
    setImage(e.target.files[0]);
  };

  const handleCreateEvent = async () => {
    if (!user) {
      console.error("No user authenticated. Event not created.");
      return;
    }

    const imageRef = ref(storage, `images/${v4()}`);
    let url = image;
    if (typeof image !== "string") {
      const result = await uploadBytes(imageRef, image);
      url = await getDownloadURL(result.ref);
    }

    const newEvent = {
      title: eventTitle,
      location: eventLocation,
      description: eventDescription,
      startDate: eventStartDate,
      endDate: eventEndDate,
      creatorId: user.uid,
      color: eventColor,
      isPrivate: isPrivate,
      image: url,
    };

    try {
      const id = await createEvent(newEvent);
      console.log("New event created with ID:", id);
      navigate("/calendar");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleChangeEventColor = (value) => {
    setEventColor(value);
  };

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
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Title"
        />

        <FormLabel>Location</FormLabel>
        <PlacesAutocomplete
          selected={eventLocation}
          setSelected={setEventLocation}
        />

        <FormLabel>Description</FormLabel>
        <ReactQuill
          placeholder="Add event description"
          style={{
            minHeight: "140px",
            maxHeight: "140px",
            borderColor: "gray",
            borderRadius: "10px",
          }}
          className="w-full mb-10 md:m"
          theme="snow"
          value={desc}
          onChange={setDesc}
        />

        <Stack direction="row" alignItems="center" spacing={4}>
          <Text>Private</Text>
          <Switch
            isChecked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            colorScheme="blue"
          />
          <Text>Public</Text>
        </Stack>

        <FormLabel>Start Date and Time</FormLabel>
        <Input
          type="datetime-local"
          value={eventStartDate}
          onChange={(e) => setEventStartDate(e.target.value)}
        />

        <FormLabel>End Date and Time</FormLabel>
        <Input
          type="datetime-local"
          value={eventEndDate}
          onChange={(e) => setEventEndDate(e.target.value)}
        />

        <div>
          <div className="w-8">{/* here is the icon for upload */}</div>
          <input type="file" onChange={(e) => handleImageUpload(e)} />
          <p>(Optional)</p>
        </div>

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
            <MenuOptionGroup
              type="radio"
              defaultValue="blue"
              onChange={handleChangeEventColor}
            >
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
  );
};

export default CreateEvent;
