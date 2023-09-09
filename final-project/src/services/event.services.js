import {
  endAt,
  equalTo,
  get,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  set,
  startAt,
  update,
} from "firebase/database"
import { db } from "../config/firebase"
import { dateISOTimezoneAdjust } from "../common/helpers"
import { eventActions } from "../common/event-enums"

export const createEvent = async event => {
  const { key } = await push(ref(db, "events"), event)

  update(ref(db), {
    [`users/${event.creatorId}/events/${key}`]: true,
  })

  return key
}

export const fetchEventsForInterval = (startDate, endDate, userUid) => {
  const adjustedStartDate = dateISOTimezoneAdjust(startDate)
  const adjustedEndDate = dateISOTimezoneAdjust(endDate)

  return new Promise((resolve, reject) => {
    const eventsRef = ref(db, `events`)
    const eventsQuery = query(
      eventsRef,
      orderByChild("startDate"),
      startAt(adjustedStartDate),
      endAt(adjustedEndDate)
    )

    onValue(
      eventsQuery,
      snapshot => {
        const data = snapshot.val()
        if (data) {
          const eventsArray = Object.keys(data).map(key => ({
            ...data[key],
            id: key,
            startDate: new Date(data[key].startDate),
            endDate: new Date(data[key].endDate),
          }))
          resolve(
            eventsArray.filter(
              element => element.createdBy === userUid && element.isPrivate === true
            )
          )
        } else {
          resolve([])
        }
      },
      error => {
        console.error("Error fetching events:", error)
        reject([])
      }
    )
  })
}

export const getEventData = async eventId => {
  const snapshot = await get(ref(db, `events/${eventId}`))
  const eventData = snapshot.val()

  return eventData
    ? {
        ...eventData,
        id: eventId,
        startDate: new Date(eventData.startDate),
        endDate: new Date(eventData.endDate),
      }
    : {}
}

export const getEventsForUser = async uid => {
  const snapshot = await get(ref(db, `users/${uid}/events`))
  const eventIds = Object.keys(snapshot.val() || {})

  const eventData = await Promise.all(eventIds.map(id => getEventData(id)))

  return eventData
}

export const getEventsForDate = (date, events) => {
  return events
    .filter(event => {
      const startDate = new Date(event.startDate)
      const endDate = new Date(event.endDate)

      const currentDate = date
      currentDate.setHours(0, 0, 0, 0)
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(0, 0, 0, 0)

      if (startDate <= currentDate && currentDate <= endDate) {
        return true
      }

      return false
    })
    .map(event => {
      const startHour = event.startDate.getHours()
      const startAtHalf = event.startDate.getMinutes() === 30
      const endHour = event.endDate.getHours()
      const endAtHalf = event.endDate.getMinutes() === 30

      return { ...event, startHour, endHour, startAtHalf, endAtHalf }
    })
}

export const getPublicEvents = async () => {
  const snapshot = await get(query(ref(db, "events"), orderByChild("isPrivate"), equalTo(false)))
  const value = snapshot.val()

  return value
    ? Object.keys(value).map(key => ({
        ...value[key],
        id: key,
        startDate: new Date(value[key].startDate),
        endDate: new Date(value[key].endDate),
      }))
    : []
}

export const getPrivateEvents = async creatorId => {
  const eventsForUser = await getEventsForUser(creatorId)
  const privateEvents = eventsForUser.filter(ev => ev.isPrivate)

  return privateEvents
}

export const acceptInvite = async (email, eventId) => {
  const event = await getEventData(eventId)
  const attendees = {
    ...event.attendees,
    accepted: event.attendees.accepted || [],
  }
  const attendee = attendees.pending.find(e => e.email === email)

  if (attendee === undefined) {
    alert("Cannot accept invite, user has no invitation")
    return
  }

  attendees.accepted.push(attendee)
  attendees.pending = attendees.pending.filter(e => e.email !== email)

  await update(ref(db, `events/${eventId}/attendees`), { ...attendees })
  await update(ref(db), { [`users/${attendee.uid}/events/${eventId}`]: true })
  return await getEventData(eventId)
}

export const denyInvite = async (email, eventId) => {
  const event = await getEventData(eventId)
  const attendees = {
    ...event.attendees,
    denied: event.attendees.denied || [],
  }

  const attendee = attendees.pending.find(e => e.email === email)

  if (attendee === undefined) {
    alert("Cannot deny invite, user has no invitation")
    return
  }

  attendees.denied.push(attendee)
  attendees.pending = attendees.pending.filter(e => e.email !== email)

  await update(ref(db, `events/${eventId}/attendees`), { ...attendees })
  return await getEventData(eventId)
}

export const joinOrLeaveEvent = async (userData, eventId, action) => {
  const event = await getEventData(eventId)
  let accepted = event.attendees?.accepted || []

  if (action === eventActions.join) {
    accepted.push(userData)
  } else {
    accepted = accepted.filter(u => u.uid !== userData.uid)
  }

  return update(ref(db), {
    [`events/${eventId}/attendees/accepted/`]: accepted,
    [`users/${userData.uid}/events/${eventId}`]: action === eventActions.join ? true : null,
  })
}

export const updateEvent = async (eventId, data) => {
  return update(ref(db), {
    [`events/${eventId}`]: data,
  })
}

export const deleteSingleEvent = async (eventId, creatorId) => {
  return update(ref(db), {
    [`events/${eventId}`]: null,
    [`users/${creatorId}/events/${eventId}`]: null,
  })
}
