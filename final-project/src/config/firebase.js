import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getDatabase } from "firebase/database"
import { getAuth } from "@firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCfvYBN7RjpI7LJoLX6r7BB_SsPc0TQ3jk",
  authDomain: "final-react-project-f8e7f.firebaseapp.com",
  databaseURL: "https://final-react-project-f8e7f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "final-react-project-f8e7f",
  storageBucket: "final-react-project-f8e7f.appspot.com",
  messagingSenderId: "1023608608794",
  appId: "1:1023608608794:web:18dbc102b75d5ceccc19a3",
  measurementId: "G-E896CMK7ME",
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getDatabase(app)

export { app, analytics, auth }
