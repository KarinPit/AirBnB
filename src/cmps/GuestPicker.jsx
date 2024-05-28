// GuestPickerOption.js
const GuestPicker = ({ label, count, onDecrease, onIncrease, disableDecrease }) => {
  return (
    <div className="guest-picker-option">
      <label>{label}</label>
      <button type="button" onClick={onDecrease} disabled={disableDecrease}>-</button>
      <span>{count}</span>
      <button type="button" onClick={onIncrease}>+</button>
    </div>
  );
};

export default GuestPicker;