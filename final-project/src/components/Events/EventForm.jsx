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
import { addMinutes, roundToNearestMinutes } from "date-fns"
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
import "./Datepicker.css"
import { eventCategories } from "../../common/event-enums"

const EventForm = ({ editMode = false, eventData = {} }) => {
  const navigate = useNavigate()
  const { user, userData } = useContext(AuthContext)
  const currentUserId = user?.uid
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
  const [eventRepeat, setEventRepeat] = useState(eventData?.repeat || eventRepetitions.never)
  const [isPrivate, setIsPrivate] = useState(eventData.id ? eventData?.isPrivate : true)
  const [image, setImage] = useState(eventData?.image || "")
  const [errors, setErrors] = useState({
    title: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
  })

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
    const newAttendees = eventData?.attendees
      ? { ...eventData?.attendees, pending: eventAttendees }
      : { pending: eventAttendees }

    const newEvent = {
      title: eventTitle,
      location: eventLocation,
      description: eventDescription,
      attendees: newAttendees,
      startDate: eventStartDate.toISOString(),
      endDate: eventEndDate.toISOString(),
      creatorId: eventData?.creatorId || user.uid,
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

  const filterPassedTime = (time, field) => {
    const currentDate = new Date()
    const selectedDate = new Date(time)

    if (field === "end") {
      return eventStartDate.getTime() < selectedDate.getTime()
    }

    return currentDate.getTime() < selectedDate.getTime()
  }

  return (
    <Flex
      justify="center"
      align="center"
      py={2}
      overflowY="auto"
      flexDirection={{ base: "column", md: "row" }}
    >
      <VStack
        spacing={[2, 4, 6]}
        padding={[3, 5]}
        width={{ base: "100%", md: "75%", lg: "50%" }}
        bgColor="rgba(255,255,255)"
        borderRadius="lg"
        boxShadow="2xl"
      >
        <FormControl isRequired isInvalid={errors.title}>
          <FormLabel>Title</FormLabel>
          <Input value={eventTitle} onChange={handleChangeTitle} placeholder="Title" />
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>
        <Flex gap={3} w="100%" direction={{ base: "column", md: "row" }}>
          <FormControl>
            <FormLabel>Start Date and Time</FormLabel>
            <ReactDatePicker
              wrapperClassName="date-picker"
              selected={eventStartDate}
              onChange={handleChangeStartDate}
              showTimeSelect
              customInput={<Input style={{ width: "100%" }} />}
              dateFormat="Pp"
              minDate={new Date()}
              filterTime={time => filterPassedTime(time, "start")}
              disabledKeyboardNavigation
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.endDate}>
            <FormLabel>End Date and Time</FormLabel>
            <ReactDatePicker
              wrapperClassName="date-picker"
              selected={eventEndDate}
              onChange={handleChangeEndDate}
              showTimeSelect
              customInput={<Input />}
              dateFormat="Pp"
              minDate={eventStartDate || new Date()}
              filterTime={time => filterPassedTime(time, "end")}
            />
            <FormErrorMessage>{errors.endDate}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Stack
          alignItems="center"
          justify="center"
          spacing={{ base: 2, md: 4 }}
          width={{ base: "100%", md: "75%" }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            onClick={() => setIsPrivate(prev => !prev)}
            w="100%"
            rightIcon={isPrivate ? <BiLockAlt /> : <BiLockOpenAlt />}
          >
            {isPrivate ? "Private" : "Public"}
          </Button>
          <Menu>
            <MenuButton w="100%" as={Button} rightIcon={<BiRepeat />}>
              {eventRepeat}
            </MenuButton>
            <MenuList width="100%" maxH="300px">
              <MenuOptionGroup
                type="radio"
                defaultValue={eventRepeat}
                onChange={handleChangeRepetitions}
                fontWeight={600}
              >
                {Object.entries(eventRepetitions).map(([key, value]) => (
                  <MenuItemOption key={key} value={value}>
                    {value}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton
              w="100%"
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
                {Object.entries(eventCategories).map(([key, value]) => (
                  <MenuItemOption
                    key={key}
                    value={key}
                    _hover={{ bgColor: `rgba(${categoryColors[key]}, .3)` }}
                    color={`rgb(${categoryColors[key]})`}
                    fontWeight={600}
                  >
                    {value}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Stack>
        <Stack direction={{ base: "column", lg: "row" }} align="center" w="100%">
          <FormControl flexGrow={1}>
            <FormLabel>Location</FormLabel>
            <PlacesAutocomplete selected={eventLocation} setSelected={setEventLocation} />
          </FormControl>
          <FormControl alignSelf="end" width={{ base: "100%", lg: 230 }}>
            <FormLabel
              htmlFor="upload-image"
              mb={0}
              style={{
                backgroundColor: `rgb(${categoryColors.blue})`,
                color: "white",
                borderRadius: "5px",
                padding: "8px",
                cursor: "pointer",
                textAlign: "center", // Center text
                fontWeight: "600",
              }}
            >
              Upload Image
            </FormLabel>
            <Input
              type="file"
              onChange={e => handleImageUpload(e)}
              style={{ display: "none" }}
              id="upload-image"
            />
          </FormControl>
        </Stack>
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
            currentUserId={currentUserId}
          />
          <FormErrorMessage>{errors.attendees}</FormErrorMessage>
        </FormControl>

        <Flex
          marginTop={6}
          width="100%"
          fontSize="xl"
          align="center"
          justifyContent="center"
          gap={2}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Button width="full" onClick={() => navigate("..")}>
            Cancel
          </Button>
          <Button width="full" colorScheme="blue" onClick={handleSubmit}>
            {editMode ? "Save Changes" : "Create Event"}
          </Button>
        </Flex>
      </VStack>
    </Flex>
  )
}

export default EventForm
