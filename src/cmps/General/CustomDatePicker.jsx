import React, { useState } from 'react';
import { format, addMonths, subMonths, eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import '../assets/styles/main.scss';

const CustomDatePicker = ({ selectedDate, onChange, placeholderText, onFocus, onBlur }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  const onDateClick = day => {
    onChange(day);
    setShowDatePicker(false);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map(day => (
      <div
        key={day}
        className={`day ${isSameDay(day, new Date()) ? 'today' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
        onClick={() => onDateClick(day)}
      >
        {format(day, 'd')}
      </div>
    ));
  };

  return (
    <div className="date-picker-container">
      <div className="date-picker-input" onClick={toggleDatePicker} onFocus={onFocus} onBlur={onBlur}>
        {selectedDate ? format(selectedDate, 'PPP') : placeholderText}
      </div>
      {showDatePicker && (
        <div className="date-picker-dropdown">
          <div className="calendar-header">
            <button onClick={prevMonth}>←</button>
            <span>{format(currentMonth, 'MMMM yyyy')}</span>
            <button onClick={nextMonth}>→</button>
          </div>
          <div className="calendar-body">{renderDays()}</div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
