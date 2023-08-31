import {
  BiCalendar,
  BiCalendarEvent,
  BiUserPlus,
  BiGroup,
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
];

export const HEADER_HEIGHT = "64px";

export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
