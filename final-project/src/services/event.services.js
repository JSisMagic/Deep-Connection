import { db } from "../config/firebase";
import { ref, set, onValue, push, query, orderByChild, startAt, endAt } from "firebase/database";


export const createEvent = async (event) => {
  const newEventRef = push(ref(db, 'events')); 
  await set(newEventRef, event);
};

export const fetchEventsForInterval = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
      const eventsRef = ref(db, 'events');
      const eventsQuery = query(
          eventsRef,
          orderByChild('startDate'),
          startAt(startDate.toISOString().slice(0, -8)),
          endAt(endDate.toISOString().slice(0, -8))
      );

      onValue(eventsQuery, (snapshot) => {
          const data = snapshot.val();
          if (data) {
              const eventsArray = Object.keys(data).map(key => ({ ...data[key], id: key }));
              resolve(eventsArray);
          } else {
              resolve([]);
          }
      }, (error) => {
          console.error("Error fetching events:", error);
          reject([]);
      });
  });
};


// export const getEvents = () => {
//   const eventsRef = ref(db, 'events');
//   onValue(eventsRef, (snapshot) => {
//       const data = snapshot.val();
//   });
// };