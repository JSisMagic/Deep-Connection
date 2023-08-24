import { db } from "../config/firebase";
import { ref, set, push } from "firebase/database";


export const createNotification = async (notification) => {
  const ref = push(ref(db, 'notifications')); 
  await set(ref, notification);
};

