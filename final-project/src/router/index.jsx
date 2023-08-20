import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/Home/HomePage"
import LoginPage from "../pages/Login/LoginPage"
import RegisterPage from "../pages/Register/RegisterPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
