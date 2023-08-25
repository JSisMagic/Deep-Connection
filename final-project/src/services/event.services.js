import { endAt, onValue, orderByChild, push, query, ref, set, startAt } from "firebase/database"
import { db } from "../config/firebase"

export const createEvent = async event => {
  const newEventRef = push(ref(db, "events"))
  await set(newEventRef, event)
}

export const fetchEventsForInterval = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const eventsRef = ref(db, "events")
    const eventsQuery = query(
      eventsRef,
      orderByChild("startDate"),
      startAt(startDate.toISOString().slice(0, -8)),
      endAt(endDate.toISOString().slice(0, -8))
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
          resolve(eventsArray)
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

// export const getEvents = () => {
//   const eventsRef = ref(db, 'events');
//   onValue(eventsRef, (snapshot) => {
//       const data = snapshot.val();
//   });
// };
