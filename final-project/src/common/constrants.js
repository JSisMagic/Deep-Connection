import { BiCalendar, BiCalendarEvent, BiUserPlus, BiGroup, BiNotification } from "react-icons/bi"
import { FaTasks } from "react-icons/fa"

export const navLinks = [
  {
    title: "Calendar",
    path: "/calendar",
    icon: BiCalendar,
  },
  {
    title: "Events",
    path: "/events",
    icon: BiCalendarEvent,
  },
  {
    title: "Contacts",
    path: "/contacts",
    icon: BiUserPlus,
  },
  {
    title: "Members",
    path: "/members",
    icon: BiGroup,
  },
  {
    title: "Tasks",
    path: "/todo",
    icon: FaTasks,
  },
]

export const publicNavLinks = {
  events: "events",
  aboutUs: "about-us",
  home: "home",
}

export const eventRepetitions = {
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
  never: "Never",
}

export const dayCount = {
  Weekly: 7,
  Monthly: 30,
  Yearly: 365,
}

export const HEADER_HEIGHT = "64px"
export const CALENDAR_HEIGHT = "65vh"
export const MEMBERS_LIST_HEIGHT = "70vh"

export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]
