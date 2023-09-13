import { db } from "../config/firebase";
import { ref, onValue, query, orderByChild, set } from "firebase/database";
import { createNotification } from "./notification.services";

let reminders = {};

const saveReminders = async (data) => {
  await set(ref(db, `reminders/events`), data);
};

const fetchReminders = async (callback) => {
  const remindersRef = ref(db, `reminders/events`);
  const remindersQuery = query(remindersRef);

  onValue(
    remindersQuery,
    snapshot => callback(snapshot.val() || {}),
    error => {
      console.error("Error fetching notifications:", error)
      callback([])
    }
  )
};

const fetchEvents = (callback) => {
  const eventsRef = ref(db, `events`);
  const eventsQuery = query(eventsRef, orderByChild("date"));

  onValue(
    eventsQuery,
    snapshot => callback(snapshot.val()),
    error => {
      console.error("Error fetching events:", error);
      callback([]);
    }
  )
}

const notify = (id, event, uid) => {
  if (reminders[id] !== undefined) {
    return;
  }

  const notification = {
    title: "Event is about to start",
    location: event.location,
    date: new Date().getTime(),
    reminder: true,
    read: false,
    meta: {
      eventId: id,
    },
  }

  createNotification(uid, notification);
}

const checkEvents = (events) => {
  Object.keys(events).map(id => {
    const event = events[id];
    const attendees = event.attendees || {}; 
    const accepted = attendees.accepted || [];
    const currentDate = new Date().getTime();
    const startDate = new Date(event.startDate).getTime() - (5 * 60000);
    const diff = (startDate - currentDate) / 60000;

    if ((diff > 0 && diff <= 5) && reminders[id] === undefined) {
      accepted.map(attendee => notify(id, event, attendee.uid))

      reminders[id] = true;
      saveReminders(reminders);
    }
  })
}

export default (() => {
  let events = [];
  fetchReminders((data) => reminders = data);
  fetchEvents((data) => events = data);

  setInterval(() => {
    checkEvents(events);
  }, 60000)
})()


