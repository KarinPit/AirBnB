import React, { useState, useRef } from "react";
import { updateCurrentOrder } from "../../store/actions/order.actions";
import {
  addMonths,
  subMonths,
  format,
  startOfDay,
  startOfWeek,
  addDays,
  isSameDay,
  isBefore,
  isWithinInterval,
  endOfDay,
  isAfter,
  isValid,
} from "date-fns";

import RightArrowIcon from "../../../public/svg/arrow-right-black.svg";
import leftArrowIcon from "../../../public/svg/arrow-left-black.svg";

export function CalendarPicker({ showCalendarPicker, onChange = (p0) => {} }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [range, setRange] = useState({ start: null, end: null });
  const [hoveredDate, setHoveredDate] = useState(null);

  const nextMonthDate = addMonths(currentDate, 1);
  let calenderPickerClass = showCalendarPicker
    ? "calender-picker-absolute"
    : "calendar-picker";

  function onDateClick(day) {
    if (!range.start || (range.start && range.end)) {
      if (isValid(day)) {
        setRange({ start: day, end: null });
        onChange({ start: day, end: null });
        // localStorage.setItem(
        //   "currentOrder",
        //   JSON.stringify({ range: { start: day, end: null } })
        // );
      }
    } else {
      const newRange = {
        start: range.start,
        end: day < range.start ? null : day,
      };

      if (isValid(newRange.end)) {
        setRange(newRange);
        onChange({ start: newRange.start, end: newRange.end });
        localStorage.setItem(
          "currentOrder",
          JSON.stringify({
            range: { start: newRange.start, end: newRange.end },
          })
        );
      }
    }
  }

  function onDateHover(day) {
    if (range.start && !range.end && isAfter(day, range.start)) {
      setHoveredDate(day);
    } else {
      setHoveredDate(null);
    }
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getStartDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function getMonthName(monthNum) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (monthNum >= 0 && monthNum < 12) {
      return monthNames[monthNum];
    } else {
      throw new Error(
        "Invalid month number. Please provide a number between 0 and 11."
      );
    }
  }

  function renderCells(monthDate) {
    const rows = [];
    let days = [];
    let day = 1;
    let date = 1;
    const firstDay = getStartDayOfMonth(
      monthDate.getFullYear(),
      monthDate.getMonth()
    );
    const monthDays = getDaysInMonth(
      monthDate.getFullYear(),
      monthDate.getMonth()
    );
    const today = startOfDay(new Date());

    for (let i = 0; i < 7; i++) {
      // loop for first week
      if (i < firstDay) {
        days.push(
          <td key={`${monthDate.getMonth()}-${i}`} className="blank-td"></td>
        );
      } else {
        const currentDateObj = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          date
        );
        const isSelectedStart = isSameDay(currentDateObj, range.start);
        const isSelectedEnd = isSameDay(currentDateObj, range.end);
        const isInRange =
          range.start &&
          range.end &&
          isWithinInterval(currentDateObj, {
            start: startOfDay(range.start),
            end: endOfDay(range.end),
          });
        const isPassed = isBefore(startOfDay(currentDateObj), today);

        days.push(
          <td
            key={date}
            className={`col cell ${
              isSelectedStart ? "selected selected-start" : ""
            } ${isSelectedEnd ? "selected selected-end" : ""} ${
              isInRange ? "in-range" : ""
            } ${isPassed ? "passed" : ""} ${
              isWithinInterval(currentDateObj, {
                start: startOfDay(range.start),
                end: endOfDay(hoveredDate),
              })
                ? "hovered-date"
                : ""
            } ${
              isSameDay(currentDateObj, hoveredDate)
                ? "hover-selected-date"
                : ""
            }`}
            onClick={() => onDateClick(currentDateObj)}
            onMouseEnter={() => onDateHover(currentDateObj)}
            onMouseLeave={() => onDateHover(null)}
          >
            {date}
          </td>
        );
        date++;
      }
    }
    rows.push(<tr key={`week-0`}>{days}</tr>);
    days = [];

    while (date <= monthDays) {
      // Loop for each week (7 days)
      for (let i = 0; i < 7; i++) {
        if (date <= monthDays) {
          const currentDateObj = new Date(
            monthDate.getFullYear(),
            monthDate.getMonth(),
            date
          );
          const isSelectedStart = isSameDay(currentDateObj, range.start);
          const isSelectedEnd = isSameDay(currentDateObj, range.end);
          const isInRange =
            range.start &&
            range.end &&
            isWithinInterval(currentDateObj, {
              start: startOfDay(range.start),
              end: endOfDay(range.end),
            });
          const isPassed = isBefore(startOfDay(currentDateObj), today);

          days.push(
            <td
              key={date}
              className={`col cell ${
                isSelectedStart ? "selected selected-start" : ""
              } ${isSelectedEnd ? "selected selected-end" : ""} ${
                isInRange ? "in-range" : ""
              } ${isPassed ? "passed" : ""} ${
                isWithinInterval(currentDateObj, {
                  start: startOfDay(range.start),
                  end: endOfDay(hoveredDate),
                })
                  ? "hovered-date"
                  : ""
              } ${
                isSameDay(currentDateObj, hoveredDate)
                  ? "hover-selected-date"
                  : ""
              }`}
              onClick={() => onDateClick(currentDateObj)}
              onMouseEnter={() => onDateHover(currentDateObj)}
              onMouseLeave={() => onDateHover(null)}
            >
              {date}
            </td>
          );

          date++;
        } else {
          // If the date exceeds the number of days in the month, add an empty cell
          days.push(<td key={Math.random()} className="blank-td"></td>);
        }
      }

      rows.push(<tr key={`week-${day}`}>{days}</tr>);
      days = [];
      day++;
    }

    return <tbody>{rows}</tbody>;
  }

  return (
    <>
      <div className={calenderPickerClass}>
        <table className="current-month">
          <thead>
            <tr className="prev-month-nav">
              <th
                onClick={() => {
                  const newDate = subMonths(currentDate, 1);
                  if (!isBefore(newDate, new Date())) {
                    setCurrentDate(subMonths(currentDate, 2));
                  }
                }}
              >
                <img src={leftArrowIcon}></img>
              </th>
              <th className="month-name">{`${getMonthName(
                currentDate.getMonth()
              )} ${currentDate.getFullYear()}`}</th>
            </tr>
            <tr className="day-names">
              <th>Su</th>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
            </tr>
          </thead>
          {renderCells(currentDate)}
        </table>

        <table className="next-month">
          <thead>
            <tr className="next-month-nav">
              <th className="month-name">{`${getMonthName(
                nextMonthDate.getMonth()
              )} ${nextMonthDate.getFullYear()}`}</th>
              <th onClick={() => setCurrentDate(addMonths(currentDate, 2))}>
                <img src={RightArrowIcon}></img>
              </th>
            </tr>
            <tr className="day-names">
              <th>Su</th>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
            </tr>
          </thead>
          {renderCells(nextMonthDate)}
        </table>
      </div>
    </>
  );
}
