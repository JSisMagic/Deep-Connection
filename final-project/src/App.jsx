import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { Route, Routes } from "react-router-dom"
import { auth } from "./config/firebase"
import LandingLayout from "./layout/LandingLayout"
import LandingPage from "./pages/Landing/LandingPage"
import LoginPage from "./pages/Login/LoginPage"
import RegisterPage from "./pages/Register/RegisterPage"
import Calendar from "./components/Calendar/calendar"
import ApplicationLayout from "./layout/ApplicationLayout"
import ProfilePage from "./components/Profile/ProfilePage"
import CreateEvent from "./components/Events/CreateEvents"
import { useLoadScript } from "@react-google-maps/api";
import ContactList from "./components/ContactList/ContactList"
import Notifications from "./components/Notifications/Notifications"
import MembersPage from "./pages/Members/Members"
import EventsPage from "./pages/Events/EventsPage"
import { useInterval } from "./components/Notifications/Notifications"
import { getNotifications } from "./services/notification.services"

const GOOGLE_MAPS_API_KEY = "AIzaSyCs89FEdCghqxYJoWMICN59cqhVOYyRLgs";
const LIBRARIES = ["places"];
function App() {
  const [user, loading] = useAuthState(auth)
  const [notifications, setNotifications] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES
  });

  useInterval(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications = await getNotifications(user.uid);
      setNotifications(fetchedNotifications);
    };
  
    fetchNotifications();
  }, 3000);

  const handleNotificationRead = (n) => {
    const updatedNotifications = [...notifications];
    const notification = updatedNotifications.find(x => x.id === n.id);
    notification.read = true;

    setNotifications(updatedNotifications);
  }

  return (
    <>
      {user ? (
        <ApplicationLayout notificationCount={notifications.filter(n => !n.read).length}>
          <Routes>
            <Route index element={<Calendar />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/notifications" element={<Notifications data={notifications || []} onNotificationRead={handleNotificationRead} />} />
          </Routes>
        </ApplicationLayout>
      ) : (
        <LandingLayout>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </LandingLayout>
      )}
    </>
  );
}


export default App
