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
import MembersPage from "./pages/Members/Members"
import EventsPage from "./pages/Events/EventsPage"

const GOOGLE_MAPS_API_KEY = "AIzaSyCs89FEdCghqxYJoWMICN59cqhVOYyRLgs";

function App() {
  const [user, loading] = useAuthState(auth)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  return (
    <>
      {user ? (
        <ApplicationLayout>
          <Routes>
            <Route index element={<Calendar />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contacts" element={<ContactList />} />
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
