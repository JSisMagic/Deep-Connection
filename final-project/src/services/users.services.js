import { equalTo, set, get, orderByChild, query, ref, update, remove } from "firebase/database"
import { getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage"
import { db, storage } from "../config/firebase"
import { v4 } from "uuid"

export const getUser = async username => {
  const snapshot = await get(ref(db, `users/${username}`))
  return snapshot.val() ? { ...snapshot.val() } : null
}

export const createUser = async (data = {}) => {
  if (!data.uid) {
    throw new Error("Data should be a valid object!")
  }

  const userExists = await getUser(data.uid)

  if (userExists !== null) {
    throw new Error(`User with UID ${data.uid} already exists!`)
  }

  await set(ref(db, `users/${data.uid}`), {
    ...data,
    contactLists: {},
    todos: {},
  })

  return { ...data }
}

export const getUserByUid = async uid => {
  const snapshot = await get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)))
  const value = snapshot.val()
  return value ? Object.values(value)[0] : []
}

export const getUsersByUsernamePartial = async partial => {
  const allUsers = await getAllUsers();
  return allUsers.filter(user => user.username && user.username.includes(partial));
}


export const uploadImage = async img => {
  const imageRef = storageRef(storage, `images/${v4()}`)
  const result = await uploadBytes(imageRef, img)
  const url = await getDownloadURL(result.ref)

  return url
}

export const updateUser = async (uid, data) => {
  if (!uid) {
    throw new Error("UID must be provided!")
  }

  const userSnapshot = await getUserByUid(uid)

  await update(ref(db, `users/${uid}`), { ...userSnapshot, ...data })
  return { ...data }
}

export const getUserContactLists = async uid => {
  const contactListsRef = ref(db, `users/${uid}/contactLists`)
  const snapshot = await get(contactListsRef)
  const result = {}

  Object.values(snapshot.val() || {}).map(value => {
    result[value.id] = {
      ...value,
      contacts: value.contacts !== undefined ? value.contacts : {},
    }
  })

  // debugger;
  return result
}

export const getAllUsers = async () => {
  const snapshot = await get(ref(db, "users"))
  const value = snapshot.val()

  return Object.values(value)
}

export const createContactListForUser = async (uid, contactList) => {
  const id = new Date().getTime().toString()
  const list = { id, ...contactList }

  await set(ref(db, `users/${uid}/contactLists/${id}`), list)
  return { ...list }
}

export const updateContactListForUser = async (uid, listId, list) => {
  await update(ref(db, `users/${uid}/contactLists/${listId}`), list)
  return { ...list }
}

export const deleteContactListForUser = async (uid, listId) => {
  await remove(ref(db, `users/${uid}/contactLists/${listId}`))
}

export const getUserByEmail = async email => {
  const snapshot = await get(query(ref(db, "users"), orderByChild("email"), equalTo(email)))
  const value = snapshot.val()
  return value ? Object.values(value)[0] : null
}
