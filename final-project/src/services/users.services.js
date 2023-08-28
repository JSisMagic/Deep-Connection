import { equalTo, set, get, orderByChild, query, ref, update, remove } from "firebase/database"
import { db } from "../config/firebase"

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
    memberLists: {} // Add memberLists
  });

  return { ...data }
}

export const getUserByUid = async uid => {
  const snapshot = await get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)))
  const value = snapshot.val()
  return value ? Object.values(value)[0] : null
}

export const getAllUsers = async () => {
  const snapshot = await get(ref(db, "users"));
  const value = snapshot.val();

  return Object.values(value);
}

export const updateUser = async (uid, data) => {
  if (!uid) {
    throw new Error("UID must be provided!")
  }

  const usersRef = ref(db, `users`)
  const userSnapshot = await get(query(usersRef, orderByChild("uid"), equalTo(uid)))
  const username = Object.keys(userSnapshot.val())[0]

  await update(ref(db, `users/${username}`), data)
  return { ...data }
}

export const getUserContactLists = async (uid) => {
  const contactListsRef = ref(db, `users/${uid}/contactLists`);
  const snapshot = await get(contactListsRef);
  const result = {};

  Object.values(snapshot.val() || {}).map(value => {
    result[value.id] = {
      ...value,
      contacts: value.contacts !== undefined ? value.contacts : {}
    }
  })

  return result;
}

export const createContactListForUser = async (uid, contactList) => {
  const id = new Date().getTime().toString();
  const listWithContacts = { ...contactList, contacts: contactList.contacts || [] };

  await set(ref(db, `users/${uid}/contactLists/${id}`), listWithContacts);
  return { id, ...listWithContacts };
}

export const updateContactListForUser = async (uid, listId, updatedContactList) => {
  await update(ref(db, `users/${uid}/contactLists/${listId}`), updatedContactList)
  return { ...updatedContactList }
}

export const deleteContactListForUser = async (uid, listId) => {
  await remove(ref(db, `users/${uid}/contactLists/${listId}`));
}

export const getUserMemberLists = async (uid) => {
  const memberListsRef = ref(db, `users/${uid}/memberLists`);
  const snapshot = await get(memberListsRef);
  const result = {};

  Object.values(snapshot.val() || {}).map(value => {
    result[value.id] = {
      ...value,
      members: value.members !== undefined ? value.members : {}
    }
  })

  return result;
}

export const createMemberListForUser = async (uid, memberList) => {
  const id = new Date().getTime().toString();
  const listWithMembers = { ...memberList, members: memberList.members || [] };

  await set(ref(db, `users/${uid}/memberLists/${id}`), listWithMembers);
  return { id, ...listWithMembers };
}

export const updateMemberListForUser = async (uid, listId, updatedMemberList) => {
  await update(ref(db, `users/${uid}/memberLists/${listId}`), updatedMemberList)
  return { ...updatedMemberList }
}

export const deleteMemberListForUser = async (uid, listId) => {
  await remove(ref(db, `users/${uid}/memberLists/${listId}`));
}

export const getUserByEmail = async email => {
  const snapshot = await get(query(ref(db, "users"), orderByChild("email"), equalTo(email)));
  const value = snapshot.val();
  return value ? Object.values(value)[0] : null;
}
