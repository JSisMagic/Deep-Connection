import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/Login/LoginPage"
import RegisterPage from "../pages/Register/RegisterPage"
import LandingLayout from "../layout/LandingLayout"
import Calendar from "../components/Calendar/Calendar"
import DayView from "../components/Calendar/DayView"
import WeekView from "../components/Calendar/WeekView"
import MonthView from "../components/Calendar/MonthView"
import WorkWeekView from "../components/Calendar/WorkWeekView"
import YearView from "../components/Calendar/YearView"

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
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/day-view",
    element: <DayView />,
  },
  {
    path: "/week-view",
    element: <WeekView />,
  },
  {
    path: "/month-view",
    element: <MonthView />,
  },
  {
    path: "/year-view",
    element: <YearView />,
  },
  {
    path: "/workweek",
    element: <WorkWeekView />,
  },
])
