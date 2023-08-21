import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/Login/LoginPage"
import RegisterPage from "../pages/Register/RegisterPage"
import LandingLayout from "../layout/LandingLayout"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
])
