import { useAuthState } from "react-firebase-hooks/auth"
import { Route, Routes } from "react-router-dom"
import { auth } from "./config/firebase"
import LandingLayout from "./layout/LandingLayout"
import LandingPage from "./pages/Landing/LandingPage"
import LoginPage from "./pages/Login/LoginPage"
import RegisterPage from "./pages/Register/RegisterPage"
import Calendar from "./components/Calendar/calendar"
import CreateEvent from "./components/Events/CreateEvents"
import ApplicationLayout from "./layout/ApplicationLayout"
import ProfilePage from "./components/Profile/ProfilePage"

function App() {
  const [user, loading] = useAuthState(auth)

  return (
    <>
      {user ? (
        <ApplicationLayout>
          <Routes>
            <Route index element={<Calendar />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </ApplicationLayout>
      ) : (
        <LandingLayout>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </LandingLayout>
      )}
    </>
  );
}


export default App
