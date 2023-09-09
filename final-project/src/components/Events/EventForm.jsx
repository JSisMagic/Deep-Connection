import {
  Button,
  ButtonGroup,
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
  VStack,
} from "@chakra-ui/react"
import { addMinutes, isSameDay, isToday, roundToNearestMinutes, setHours } from "date-fns"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useContext, useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { BiLockAlt, BiLockOpenAlt, BiRepeat, BiTag } from "react-icons/bi"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useNavigate } from "react-router-dom"
import { v4 } from "uuid"
import { categoryColors } from "../../common/colors"
import { SUPPORTED_FORMATS, eventRepetitions } from "../../common/constrants"
import { validateDates, validateDescription, validateTitle } from "../../common/helpers"
import validation from "../../common/validation-enums"
import { storage } from "../../config/firebase"
import { AuthContext } from "../../context/AuthContext"
import { createEvent, updateEvent } from "../../services/event.services"
import { createNotificationByUserID } from "../../services/notification.services"
import PlacesAutocomplete from "../Location/PlacesAutocomplete"
import Attendees from "./Attendees"

const EventForm = ({ editMode = false, eventData = {} }) => {
  const navigate = useNavigate()
  const { user, userData } = useContext(AuthContext)
  const [eventTitle, setEventTitle] = useState(eventData?.title || "")
  const [eventLocation, setEventLocation] = useState(eventData?.location || "")
  const [eventDescription, setEventDescription] = useState(eventData?.description || "")
  const [eventStartDate, setEventStartDate] = useState(
    eventData?.startDate || roundToNearestMinutes(new Date(), { nearestTo: 30 })
  )
  const [eventEndDate, setEventEndDate] = useState(
    eventData?.endDate || addMinutes(roundToNearestMinutes(new Date(), { nearestTo: 30 }), 30)
  )
  const [eventColor, setEventColor] = useState(eventData?.color || "blue")
  const [eventAttendees, setEventAttendees] = useState(eventData?.attendees?.length || [])
  const [eventRepeat, setEventRepeat] = useState(eventData?.repeat || "never")
  const [isPrivate, setIsPrivate] = useState(eventData.id ? eventData?.isPrivate : true)
  const [image, setImage] = useState(eventData?.image || "")
  const [errors, setErrors] = useState({
    title: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
  })
  console.log(userData)
  const handleImageUpload = e => {
    if (!SUPPORTED_FORMATS.includes(e.target.files[0].type)) {
      console.log("Unsupported file format!")
    }
    setImage(e.target.files[0])
  }

  const validateForm = () => {
    if (!validateTitle(eventTitle)) {
      return setErrors(prev => ({
        ...prev,
        title: `Length should be between ${validation.MIN_TITLE_LENGTH} and ${validation.MAX_TITLE_LENGTH} characters.`,
      }))
    }

    const { isDateValid, key, message } = validateDates(eventStartDate, eventEndDate)
    if (!isDateValid) {
      return setErrors(prev => ({
        ...prev,
        [key]: message,
      }))
    }

    if (!validateDescription(eventDescription)) {
      return setErrors(prev => ({
        ...prev,
        description: `Length should be between ${validation.MIN_ADDITIONAL_INFO_LENGTH} and ${validation.MAX_ADDITIONAL_INFO_LENGTH} characters.`,
      }))
    }

    return true
  }

  const handleSubmit = async () => {
    if (!user) {
      console.error("No user authenticated. Event not created.")
      return
    }

    if (!validateForm()) {
      return
    }

    let url = image
    if (image !== eventData?.image) {
      const imageRef = ref(storage, `images/${v4()}`)
      if (typeof image !== "string") {
        const result = await uploadBytes(imageRef, image)
        url = await getDownloadURL(result.ref)
      }
    }

    const newEvent = {
      title: eventTitle,
      location: eventLocation,
      description: eventDescription,
      attendees: { pending: eventAttendees },
      startDate: eventStartDate.toISOString(),
      endDate: eventEndDate.toISOString(),
      creatorId: user.uid,
      color: eventColor,
      isPrivate: isPrivate,
      repeat: eventRepeat,
      image: url,
    }

    try {
      let id = eventData?.id

      if (editMode) {
        await updateEvent(id, newEvent)
      } else {
        id = await createEvent(newEvent)
      }

      await eventAttendees.map(att => notify(id, newEvent, att.uid))
      navigate(-1)
    } catch (error) {
      console.error("Error creating event:", error)
    }
  }

  const notify = async (id, event, uid) => {
    const notification = {
      title: "New Event Invitation",
      location: event.location,
      date: new Date().getTime(),
      read: false,
      meta: {
        eventId: id,
      },
    }

    try {
      await createNotificationByUserID(uid, notification)
    } catch (error) {
      console.error("Error sending notification", error)
    }
  }

  const clearError = key => {
    return setErrors(prev => ({ ...prev, [key]: "" }))
  }

  const handleChangeTitle = e => {
    const value = e.target.value

    if (validateTitle(value) && errors.title) {
      clearError("title")
    }

    setEventTitle(value)
  }

  const handleChangeStartDate = date => {
    const { isDateValid } = validateDates(date, eventEndDate)
    if (isDateValid && errors.startDate) {
      clearError("startDate")
    }

    setEventStartDate(date)
  }

  const handleChangeEndDate = date => {
    const { isDateValid } = validateDates(eventStartDate, date)
    if (isDateValid && errors.endDate) {
      clearError("endDate")
    }
    setEventEndDate(date)
  }

  const handleChangeDescription = value => {
    if (validateDescription(value) && errors.description) {
      clearError("description")
    }

    setEventDescription(value)
  }

  const handleChangeEventColor = value => {
    setEventColor(value)
  }

  const handleChangeRepetitions = value => {
    setEventRepeat(value)
  }

  return (
    <Flex
      height="100%"
      justify="center"
      align="center"
      py={2}
      overflowY="auto"
      flexDirection={{ base: "column", md: "row" }}
    >
      <VStack
        spacing={[2, 4, 6]}
        padding={[3, 5]}
        width={{ base: "100%", md: "50%" }}
        bgColor="rgba(255,255,255)"
        borderRadius="lg"
        boxShadow="2xl"
      >
        <FormControl isRequired isInvalid={errors.title}>
          <FormLabel fontSize={["sm", "md", "lg"]}>Title</FormLabel>
          <Input value={eventTitle} onChange={handleChangeTitle} placeholder="Title" size="lg" width={{ base: "100%", md: "50%" }} />
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Location</FormLabel>
          <PlacesAutocomplete selected={eventLocation} setSelected={setEventLocation} />
        </FormControl>

        <FormControl isRequired isInvalid={errors.description}>
          <FormLabel>Description</FormLabel>
          <ReactQuill
            placeholder="Add event description"
            style={{
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

        <FormControl isRequired isInvalid={errors.attendees}>
          <FormLabel>Attendees</FormLabel>
          <Attendees
            onChange={setEventAttendees}
            eventDetails={{
              title: eventTitle,
              description: eventDescription,
              startDate: eventStartDate,
              endDate: eventEndDate,
              location: eventLocation,
            }}
          />
          <FormErrorMessage>{errors.attendees}</FormErrorMessage>
        </FormControl>

        <input
          type="file"
          onChange={e => handleImageUpload(e)}
          style={{ display: "none" }}
          id="upload-image"
        />
        <label
          htmlFor="upload-image"
          style={{
          
            maxWidth: "100%",
            width: ["100%", "50%"],
            backgroundColor: `rgb(${categoryColors.blue})`,
            color: "white",
            borderRadius: "5px",
            padding: "10px",
            cursor: "pointer",
            textAlign: "center", // Center text
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Upload Image
        </label>

        <FormControl>
          <FormLabel>Start Date and Time</FormLabel>
          <ReactDatePicker
            selected={eventStartDate}
            onChange={handleChangeStartDate}
            showTimeSelect
            showIcon
            customInput={<Input />}
            dateFormat="Pp"
            minDate={new Date()}
            minTime={isToday(eventStartDate) ? new Date() : setHours(new Date(eventStartDate), 23)}
            maxTime={setHours(new Date(), 23)}
            disabledKeyboardNavigation
          />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.endDate}>
          <FormLabel>End Date and Time</FormLabel>
          <ReactDatePicker
            selected={eventEndDate}
            onChange={handleChangeEndDate}
            showTimeSelect
            showIcon
            customInput={<Input />}
            dateFormat="Pp"
            minDate={eventStartDate || new Date()}
            minTime={
              isSameDay(eventStartDate, eventEndDate)
                ? addMinutes(eventStartDate, 30)
                : setHours(new Date(), 23)
            }
            maxTime={addMinutes(setHours(new Date(), 23), 30)}
          />
          <FormErrorMessage>{errors.endDate}</FormErrorMessage>
        </FormControl>

        <Stack alignItems="center" spacing={{ base: 2, md: 4 }} width="100%" direction={{ base: "column", sm: "row" }} >
          <Button
            onClick={() => setIsPrivate(prev => !prev)}
            w="110px"
            rightIcon={isPrivate ? <BiLockAlt /> : <BiLockOpenAlt />}
          >
            {isPrivate ? "Private" : "Public"}
          </Button>
          <Menu width="50%">
            <MenuButton as={Button} rightIcon={<BiRepeat />}>
              {eventRepetitions[eventRepeat]}
            </MenuButton>
            <MenuList width="100%" maxH="300px">
              <MenuOptionGroup
                type="radio"
                defaultValue={eventRepeat}
                onChange={handleChangeRepetitions}
                fontWeight={600}
              >
                {Object.entries(eventRepetitions).map(([key, value]) => (
                  <MenuItemOption key={key} value={key}>
                    {value}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
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
                defaultValue={eventColor}
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
        <ButtonGroup width="100%" height="50px" fontSize="xl" flexDirection={{ base: "column", md: "row" }}>
          <Button width="full" onClick={() => navigate("..")}>
            Cancel
          </Button>
          <Button width="full" colorScheme="blue" onClick={handleSubmit}>
            {editMode ? "Save Changes" : "Create Event"}
          </Button>
        </ButtonGroup>
      </VStack>
    </Flex>
  )
}

export default EventForm
