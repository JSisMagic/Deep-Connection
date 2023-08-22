import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../config/firebase"
import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/Login/LoginPage"
import LandingPage from "../pages/Landing/LandingPage"
import RegisterPage from "../pages/Register/RegisterPage"
import AppLayout from "../layout/AppLayout"
import LandingLayout from "../layout/LandingLayout"

const ProtectedRouting = ({ AuthElement, UnAuthElement }) => {
  const [user, loading] = useAuthState(auth)

  // return user ? AuthElement : UnAuthElement
  return (
    <Route path="/" element={user ? <AppLayout /> : <LandingLayout />}>
      <PublicRoutes />
    </Route>
  )
}

const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </>
  )
}

// const PrivateRoutes = () => {
//   <Routes>

//   </Routes>
// }

export default ProtectedRouting
