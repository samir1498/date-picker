import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export function getDaysOfCurrentMonth(selectedMonth: Date) {
  return eachDayOfInterval({
    start: startOfWeek(startOfMonth(selectedMonth)),
    end: endOfWeek(endOfMonth(selectedMonth)),
  });
}
