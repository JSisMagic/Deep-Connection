import { db } from "../config/firebase";
import { set, get, ref, update, remove, push } from "firebase/database";
import { getUserByEmail } from "./users.services";


export const getNotifications = async (uid) => {
  const snapshot = await get(ref(db, `notifications/${uid}`));
  const value = snapshot.val();
  const data = value ? Object.entries(value).map(([id, notification]) => ({ ...notification, id })) : [];
  return data.sort((a, b) => b.date - a.date)
};

export const createNotification = async (userId, notification) => {
  const newNotificationRef = push(ref(db, `notifications/${userId}`));
  await set(newNotificationRef, notification);
  return { ...notification, id: newNotificationRef.key };
};

export const createNotificationByEmail = async (email, notification) => {
  const user = await getUserByEmail(email);

  if (user === null) {
    throw new Error("Cannot find user with email " + email);
  }

  return await createNotification(user.uid, notification);
};


export const updateNotification = async (userId, notificationId, notification) => {
  await update(ref(db, `notifications/${userId}/${notificationId}`), notification);
  return { ...notification, id: notificationId };
};

export const deleteNotification = async (userId, notificationId) => {
  await remove(ref(db, `notifications/${userId}/${notificationId}`));
};
