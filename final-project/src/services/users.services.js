import { equalTo, set, get, orderByChild, query, ref, update, remove } from "firebase/database"
import { getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage"
import { db, storage } from "../config/firebase"
import { v4 } from "uuid"
import { userRole } from "../common/member-role"

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
    role: userRole.BASIC,
  })

  return { ...data }
}

export const getUserByUid = async uid => {
  const snapshot = await get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)))
  const value = snapshot.val()
  return value ? Object.values(value)[0] : null
}

export const getUsersByUsernamePartial = async partial => {
  const allUsers = await getAllUsers()
  return allUsers.filter(user => user.username && user.username.includes(partial))
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

export const toggleBlockUser = async (uid, isBlocked) => {
  console.log(isBlocked)
  return update(ref(db), {
    [`users/${uid}/isBlocked`]: isBlocked || null,
  })
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

export const updateContactListForUser = async (uid, listId, contacts) => {
  await update(ref(db, `users/${uid}/contactLists/${listId}`), { contacts });
  return { contacts };
};

export const deleteContactListForUser = async (uid, listId) => {
  await remove(ref(db, `users/${uid}/contactLists/${listId}`))
}

export const addContact = async (uid, contactName, contactUserId) => {
  if (!uid || !contactName || !contactUserId) {
    throw new Error("UID, contact name, and contact user ID must be provided!");
  }

  const contactId = v4();

  await set(ref(db, `users/${uid}/myContacts/${contactId}`), { 
    name: contactName, 
    contactUserId 
  });

  return { id: contactId, name: contactName, userId: contactUserId };
};

export const getContact = async (uid, contactId) => {
  if (!uid || !contactId) {
    throw new Error("Both UID and contact ID must be provided!");
  }

  const snapshot = await get(ref(db, `users/${uid}/myContacts/${contactId}`));
  
  if(!snapshot.val()) {
    return null;
  }

  return { id: contactId, ...snapshot.val() };
};

export const getContacts = async (uid) => {
  if (!uid) {
    throw new Error("UID must be provided!");
  }

  const snapshot = await get(ref(db, `users/${uid}/myContacts`));
  
  if(!snapshot.val()) {
    return [];
  }

  return Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }));
};

export const removeContact = async (uid, contactId) => {
  if (!uid || !contactId) {
    throw new Error("Both UID and contact ID must be provided!");
  }

  await remove(ref(db, `users/${uid}/myContacts/${contactId}`));
};


export const getUserByEmail = async email => {
  const snapshot = await get(query(ref(db, "users"), orderByChild("email"), equalTo(email)))
  const value = snapshot.val()
  return value ? Object.values(value)[0] : null
}
