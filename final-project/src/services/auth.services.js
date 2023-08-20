import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth"
import { auth } from "../config/firebase"
/**
 * @description register user by email and password in the database
 * @param {string} email - user email
 * @param {string} password - user password
 * @return {Promise} Promise object represents credential of the registered user
 */
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

/**
 * @description login user by email and password
 * @param {string} email - user email
 * @param {string} password - user password
 * @return {Promise} Promise object represents credential of the logged user
 */
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

/**
 * @description Logout current usser
 * @return {Promise} Promise object of void
 */
export const logoutUser = () => {
  return signOut(auth)
}

/**
 * @description Change user's password
 * @param {string} newPassword - new user password
 * @return {Promise} Promise object of void
 */
export const changePassword = newPassword => {
  const authUser = auth
  const user = authUser.currentUser

  return updatePassword(user, newPassword)
}
