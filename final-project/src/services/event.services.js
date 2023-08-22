import { db } from "../config/firebase";
import { ref, set, onValue, push } from "firebase/database";


export const createEvent = async (event) => {
  const newEventRef = push(ref(db, 'events')); 
  await set(newEventRef, event);
};

export const getEvents = () => {
  const eventsRef = ref(db, 'events');
  onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
  });
};