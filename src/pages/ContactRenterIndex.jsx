import React, { useState } from "react";

export function ContactRenterIndex() {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
  };

  return (
    <div>
      <h1>Contact Renter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message:</label>
        <textarea id="message" value={message} onChange={handleMessageChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
