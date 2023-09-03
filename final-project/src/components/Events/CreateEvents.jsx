import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { BiTag } from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { categoryColors } from "../../common/colors";
import { SUPPORTED_FORMATS } from "../../common/constrants";
import { validateDescription, validateTitle } from "../../common/helpers";
import validation from "../../common/validation-enums";
import { storage } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { createEvent } from "../../services/event.services";
import PlacesAutocomplete from "../Location/PlacesAutocomplete";

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
  const [errors, setErrors] = useState({
    title: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleImageUpload = (e) => {
    if (!SUPPORTED_FORMATS.includes(e.target.files[0].type)) {
      console.log("Unsupported file format!");
    }
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    if (!validateTitle(eventTitle)) {
      return setErrors((prev) => ({
        ...prev,
        title: `Length should be between ${validation.MIN_TITLE_LENGTH} and ${validation.MAX_TITLE_LENGTH} characters.`,
      }));
    }

    if (!validateDescription(eventDescription)) {
      return setErrors((prev) => ({
        ...prev,
        description: `Length should be between ${validation.MIN_ADDITIONAL_INFO_LENGTH} and ${validation.MAX_ADDITIONAL_INFO_LENGTH} characters.`,
      }));
    }

    return true;
  };

  const handleCreateEvent = async () => {
    if (!user) {
      console.error("No user authenticated. Event not created.");
      return;
    }

    if (!validateForm()) {
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

  const handleChangeTitle = (e) => {
    const value = e.target.value;

    if (validateTitle(value) && errors.title) {
      setErrors((prev) => ({ ...prev, title: "" }));
    }

    setEventTitle(value);
  };

  const handleChangeDescription = (value) => {
    if (validateDescription(value) && errors.description) {
      setErrors((prev) => ({ ...prev, description: "" }));
    }

    setEventDescription(value);
  };

  const handleChangeEventColor = (value) => {
    setEventColor(value);
  };

  return (
    <Flex
      height="100%"
      justify="center"
      align="center"
      padding={5}
      overflowY="auto"
      flexDirection={{ base: "column", md: "row" }}
    >
      <VStack
        spacing={4}
        padding={5}
        width={{ base: "100%", md: "50%" }}
        bgColor="rgba(255,255,255)"
        borderRadius="lg"
        boxShadow="2xl"
      >
        <FormControl isRequired isInvalid={errors.title}>
          <FormLabel>Title</FormLabel>
          <Input
            value={eventTitle}
            onChange={handleChangeTitle}
            placeholder="Title"
            size="lg"
          />
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>

        <FormLabel>Location</FormLabel>
        <PlacesAutocomplete
          selected={eventLocation}
          setSelected={setEventLocation}
        />

        <FormControl isRequired isInvalid={errors.description}>
          <FormLabel>Description</FormLabel>
          <ReactQuill
            placeholder="Add event description"
            style={{
              minHeight: "180px",
              borderColor: "gray",
              borderRadius: "10px",
            }}
            className="w-full mb-10 md:m"
            theme="snow"
            value={eventDescription}
            onChange={handleChangeDescription}
          />
          <FormErrorMessage>{errors.description}</FormErrorMessage>
        </FormControl>

        <input
          type="file"
          onChange={(e) => handleImageUpload(e)}
          style={{ display: "none" }}
          id="upload-image"
        />
        <label
          htmlFor="upload-image"
          style={{
            backgroundColor: `rgb(${categoryColors[eventColor]})`,
            color: "white",
            borderRadius: "5px",
            padding: "10px",
            cursor: "pointer",
            width: "100%", // Set width to 100%
            textAlign: "center", // Center text
          }}
        >
          Upload Image
        </label>

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

        <Stack direction="row" alignItems="center" spacing={4} width="100%">
          <Menu closeOnSelect={false} width="50%">
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
            <MenuList width="100%" maxH="300px">
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
        </Stack>

        <Button
          colorScheme="blue"
          width="100%"
          height="50px"
          fontSize="xl"
          onClick={handleCreateEvent}
        >
          Create Event
        </Button>
      </VStack>
    </Flex>
  );
};

export default CreateEvent;
