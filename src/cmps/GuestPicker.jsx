// GuestPickerOption.js
const GuestPickerOption = ({ label, count, onDecrease, onIncrease, disableDecrease }) => {
  return (
    <div className="guest-picker-option">
      <label>{label}</label>
      <button onClick={onDecrease} disabled={disableDecrease}>-</button>
      {count}
      <button onClick={onIncrease}>+</button>
    </div>
  );
};

export default GuestPickerOption;
