import { useLoadScript } from "@react-google-maps/api"
import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Route, Routes } from "react-router-dom"
import Calendar from "./components/Calendar/calendar"
import ContactList from "./components/ContactList/ContactList"
import Notifications from "./components/Notifications/Notifications"
import ProfilePage from "./components/Profile/ProfilePage"
import TodoComponent from "./components/Todo/ToDo"
import { auth } from "./config/firebase"
import ApplicationLayout from "./layout/ApplicationLayout"
import LandingLayout from "./layout/LandingLayout"
import BlockedUserPage from "./pages/BlockedUser/BlockedUserPage"
import CreateEventPage from "./pages/CreateEvent/CreateEventPage"
import EditEventPage from "./pages/EditEvent/EditEventPage"
import EventsPage from "./pages/Events/EventsPage"
import LandingPage from "./pages/Landing/LandingPage"
import LoginPage from "./pages/Login/LoginPage"
import MembersPage from "./pages/Members/Members"
import NotFoundPage from "./pages/NotFound/NotFoundPage"
import RegisterPage from "./pages/Register/RegisterPage"
import { getNotifications } from "./services/notification.services"

const GOOGLE_MAPS_API_KEY = "AIzaSyCs89FEdCghqxYJoWMICN59cqhVOYyRLgs"
const LIBRARIES = ["places"]
function App() {
  const [user, loading] = useAuthState(auth)
  const [notifications, setNotifications] = useState([])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  })
  
  useEffect(() => {
    const fetchNotifications = async () => {
      await getNotifications(user?.uid, setNotifications)
    }

    fetchNotifications()
  }, [user])

  const handleNotificationRead = n => {
    const updatedNotifications = [...notifications]
    const notification = updatedNotifications.find(x => x.id === n.id)
    notification.read = true

    setNotifications(updatedNotifications)
  }

  return (
    <>
      {user ? (
        <ApplicationLayout notificationCount={notifications.filter(n => !n.read).length}>
          <Routes>
            <Route index element={<Calendar />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/edit-event/:eventId" element={<EditEventPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/profile/:uid" element={<ProfilePage />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/todo" element={<TodoComponent />} />
            <Route
              path="/notifications"
              element={
                <Notifications
                  data={notifications || []}
                  onNotificationRead={handleNotificationRead}
                />
              }
            />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </ApplicationLayout>
      ) : (
        <LandingLayout>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/blocked" element={<BlockedUserPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </LandingLayout>
      )}
    </>
  )
}

export default App
