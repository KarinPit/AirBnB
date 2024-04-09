import React from "react";

import { CheckedIcon } from "../../services/svg.service";

const Checkbox = ({ id, label, checked, onChange, ...props }) => {
  return (
    <label htmlFor={id} className="checkbox">
      <span className="checkbox-label">{label}</span>
      <span className="checkbox-container">
        <input
          id={id}
          className="checkbox-input"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <span className="checkbox-custom">
          {checked && (
            <div className="checkbox-checked">
              <CheckedIcon />
            </div>
          )}
        </span>
      </span>
    </label>
  );
};

export default Checkbox;
