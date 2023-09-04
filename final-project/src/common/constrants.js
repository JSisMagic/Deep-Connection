import {
  BiCalendar,
  BiCalendarEvent,
  BiUserPlus,
  BiGroup,
  BiNotification
} from "react-icons/bi";

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
    title: "Notifications",
    path: "/notifications",
    icon: BiNotification,
  },
];

export const publicNavLinks = {
  events: "events",
  aboutUs: "about-us",
  home: "home",
}

export const HEADER_HEIGHT = "64px";

export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
