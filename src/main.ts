// main.ts

// Import styles
import "./styles.css";

// Import date-fns functions
import { addMonths, format, isSameMonth } from "date-fns";

// Import utility function
import { getDaysOfCurrentMonth } from "./utils/utils";

// DOM Element Constants
const togglePickerButton: HTMLButtonElement | null =
  document.querySelector(".BUTTON");
const picker = document.querySelector(".PICKER") as HTMLDivElement;
const datePickerGrid = document.querySelector(".GRID-DATES") as HTMLDivElement;
const nextMonthBtn = document.querySelector(".NEXT-MONTH ");
const prevMonthBtn = document.querySelector(".PREV-MONTH ");
const currentMonthHeader: HTMLSpanElement | null =
  document.querySelector(".CURRENT-MONTH");
const daysOfWeek = document.querySelector(".DAYS-OF-WEEK");

// State
let currentDate = new Date();
let selectedDate = currentDate;
let selectedMonth = currentDate;

// Days of week array
const daysOfWeekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Event listeners
if (togglePickerButton) {
  togglePickerButton.innerText = format(selectedDate, "MMMM, do yyyy");
  togglePickerButton.addEventListener("click", () => togglePickerVisibility());
}

nextMonthBtn?.addEventListener("click", () => updateMonth(1));
prevMonthBtn?.addEventListener("click", () => updateMonth(-1));

// Initial render
render();

// Functional Programming Functions

function togglePickerVisibility() {
  picker?.classList.toggle("invisible");
}

function updateMonth(amount: number) {
  selectedMonth = addMonths(selectedMonth, amount);
  render();
}

function render() {
  renderHeader();
  renderDaysOfWeek();
  renderDaysOfMonth();
}

function renderHeader() {
  if (currentMonthHeader) {
    currentMonthHeader.innerText = format(selectedMonth, "MMMM - yyyy");
  }
}

function renderDaysOfWeek() {
  if (daysOfWeek) {
    daysOfWeek.innerHTML = "";
    daysOfWeekArray.forEach(renderDayOfWeek);
  }
}

function renderDayOfWeek(day: string) {
  const dayDiv = document.createElement("div");
  dayDiv.innerText = day;
  dayDiv.classList.add(
    "text-center",
    "w-4",
    "h-4",
    "p-4",
    "flex",
    "justify-center",
    "items-center",
  );
  daysOfWeek?.appendChild(dayDiv);
}

function renderDaysOfMonth() {
  if (datePickerGrid) {
    datePickerGrid.innerHTML = "";
    const daysOfCurrentMonth = getDaysOfCurrentMonth(selectedMonth);
    daysOfCurrentMonth.forEach(renderDayOfMonth);
  }
}

function renderDayOfMonth(day: Date) {
  const style = [
    "flex",
    "justify-center",
    "items-center",
    "h-4",
    "w-4",
    "p-4",
    "rounded",
    "hover:bg-gray-300",
  ];
  const btn = document.createElement("button");

  btn.innerText = format(day, "dd");
  btn.classList.add(...style);

  if (format(day, "dd MM") === format(selectedDate, "dd MM")) {
    btn.classList.add("bg-gray-900", "text-white");
  }
  if (!isSameMonth(day, selectedMonth)) {
    btn.classList.add("text-gray-300");
  }

  btn.addEventListener("click", () => handleDateClick(day));
  datePickerGrid?.appendChild(btn);
}

function handleDateClick(day: Date) {
  selectedDate = day;
  if (togglePickerButton) {
    togglePickerButton.innerText = format(selectedDate, "MMMM do, yyyy");
    togglePickerButton.click();
  }

  renderDaysOfMonth();
}
