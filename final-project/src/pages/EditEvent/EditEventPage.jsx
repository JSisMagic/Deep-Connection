import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import EventForm from "../../components/Events/EventForm"
import { getEventData } from "../../services/event.services"

const EditEventPage = () => {
  const { eventId } = useParams()
  const [eventData, setEventData] = useState({})

  useEffect(() => {
    getEventData(eventId).then(setEventData).catch(console.error)
  }, [eventId])

  if (!eventData.title) {
    return
  }

  return <EventForm editMode eventData={eventData} />
}

export default EditEventPage
