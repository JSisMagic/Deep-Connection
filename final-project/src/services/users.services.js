import { equalTo, get, orderByChild, query, ref, update } from "firebase/database"; 
import { db } from "../config/firebase"

export const getUser = async username => {
  const snapshot = await get(ref(db, `users/${username}`))
  return snapshot.val() ? { ...snapshot.val() } : null
}

export const createUser = async (data = {}) => {
  if (!data.uid) {
    throw new Error("Data should be a valid object!")
  }

  const userExists = await getUser(data.username)

  if (userExists !== null) {
    throw new Error(`User with username ${data.username} already exists!`)
  }

  await set(ref(db, `users/${data.username}`), data)

  return { ...data }
}

export const getUserByUid = async uid => {
  const snapshot = await get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)))
  const value = snapshot.val()
  return value ? Object.values(value)[0] : null
}

export const updateUser = async (uid, data) => {
  if (!uid) {
    throw new Error("UID must be provided!");
  }

  const usersRef = ref(db, `users`);
  const userSnapshot = await get(query(usersRef, orderByChild("uid"), equalTo(uid)));
  const username = Object.keys(userSnapshot.val())[0]; 

  await update(ref(db, `users/${username}`), data); 
  return { ...data };
};
