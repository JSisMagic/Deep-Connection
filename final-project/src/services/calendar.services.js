import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  startOfWeek,
  addDays 
} from 'date-fns';

export function getStartOfMonth(date) {
  return startOfMonth(date);
}

export function getEndOfMonth(date) {
  return endOfMonth(date);
}

export function geteachDayOfInterval({ start, end }) {
  return eachDayOfInterval({ start, end });
}

export function getStartOfWeek(date) {
  return startOfWeek(date);
}

export function addDaysToDate(date, daysToAdd) {
  return addDays(date, daysToAdd);
}

export function getFullYear(date) {
  return date.getFullYear();
}