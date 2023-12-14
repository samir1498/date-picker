import "./styles.css";

import { addMonths, format, isSameMonth, subMonths } from "date-fns";
import { getDaysOfCurrentMonth } from "./utils/utils";

let currentDate = new Date();
let selectedDate = currentDate;
let selectedMonth = currentDate;
let daysOfCurrentMonth: Date[] = getDaysOfCurrentMonth(selectedMonth);

// Picker Button
const togglePickerButton: HTMLButtonElement | null =
  document.querySelector(".BUTTON");

if (togglePickerButton) {
  togglePickerButton.innerText = format(selectedDate, "MMMM, do yyyy");
  togglePickerButton.addEventListener("click", () => {
    picker?.classList.toggle("invisible");
  });
}

const picker = document.querySelector(".PICKER") as HTMLDivElement;
const datePickerGrid = document.querySelector(".GRID-DATES") as HTMLDivElement;

// Date picker header
const nextMonthBtn = document.querySelector(".NEXT-MONTH ");
const prevMonthBtn = document.querySelector(".PREV-MONTH ");

const currentMonthHeader = document.querySelector(
  ".CURRENT-MONTH",
) as HTMLSpanElement;

const daysOfWeek: HTMLDivElement | null =
  document.querySelector(".DAYS-OF-WEEK");

if (currentMonthHeader) {
  currentMonthHeader.innerText = format(selectedMonth, "MMMM - yyyy");
  console.log("setting");
}

nextMonthBtn?.addEventListener("click", () => {
  if (currentMonthHeader) {
    selectedMonth = addMonths(selectedMonth, 1);

    currentMonthHeader.innerText = format(selectedMonth, "MMMM - yyyy");
    renderDaysOfMonth(datePickerGrid, selectedDate, selectedMonth);
  }
});

prevMonthBtn?.addEventListener("click", () => {
  if (currentMonthHeader) {
    selectedMonth = subMonths(selectedMonth, 1);

    currentMonthHeader.innerText = format(selectedMonth, "MMMM - yyyy");
    renderDaysOfMonth(datePickerGrid, selectedDate, selectedMonth);
  }
});

const daysOfWeekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

if (daysOfWeek) {
  daysOfWeek.innerHTML = "";
  daysOfWeekArray.forEach((day) => {
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
  });
}

renderDaysOfMonth(datePickerGrid, selectedDate, selectedMonth);

function renderDaysOfMonth(
  datePickerGrid: HTMLDivElement | null,
  selectedDate: Date,
  selectedMonth: Date,
) {
  if (datePickerGrid) {
    datePickerGrid.innerHTML = "";
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

    daysOfCurrentMonth = getDaysOfCurrentMonth(selectedMonth);

    daysOfCurrentMonth.forEach((day) => {
      const btn = document.createElement("button");

      btn.innerText = format(day, "dd");
      btn.classList.add(...style);

      btn.classList.add("date");

      if (format(day, "dd MM") === format(selectedDate, "dd MM")) {
        btn.classList.add("bg-gray-900", "text-white");
      }
      if (!isSameMonth(day, selectedMonth)) {
        btn.classList.add("text-gray-300");
      }

      btn.addEventListener("click", () => {
        btn.classList.add("selected");
        selectedDate = day;
        if (togglePickerButton) {
          togglePickerButton.innerText = format(selectedDate, "MMMM do,  yyyy");
        }

        renderDaysOfMonth(datePickerGrid, selectedDate, selectedMonth);
      });
      datePickerGrid.appendChild(btn);
    });
  }
}
