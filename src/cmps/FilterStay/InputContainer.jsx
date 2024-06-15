import React from "react";
export function InputContainer({ label, description, value, isSearch }) {
  return (
    <div
      style={{
        padding: "7px 24px",
        zIndex: 5,
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <label htmlFor="location-search" className="input-label">
        {label}
      </label>
      {isSearch ? (
        <input
          id="location-search"
          type="text"
          name={value}
          placeholder={description}
          value={value}
          readOnly
          style={{
            fontSize: "0.875rem",
            color: "#6A6A6A",
          }}
        />
      ) : (
        <div
          style={{
            fontSize: "0.875rem",
            textOverflow: "ellipsis",
            width: 100,
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "#6A6A6A",
          }}
        >
          {value || description}
        </div>
      )}
    </div>
  );
}
