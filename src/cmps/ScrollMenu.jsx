import React, { useState, useEffect, useRef } from "react";

export default function ScrollMenu({ children }) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    checkScrollPosition();
  }, [children]);

  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (el) {
      const isStart = el.scrollLeft <= 0;
      const isEnd = Math.ceil(el.scrollLeft + el.offsetWidth) >= el.scrollWidth;
      setIsAtStart(isStart);
      setIsAtEnd(isEnd);
    }
  };

  return (
    <div className="scroll-menu-wrapper">
      {!isAtStart && (
        <div className="scroll-button-container left">
          <button
            className="scroll-button"
            onClick={() =>
              scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
            }
          >
            <img src="/assets/svg/left-arrow.svg" alt="Left Icon" />
          </button>
        </div>
      )}
      <div
        className="scroll-menu-children"
        ref={scrollRef}
        onScroll={checkScrollPosition}
      >
        {children}
      </div>
      {!isAtEnd && (
        <div className="scroll-button-container right">
          <button
            className="scroll-button"
            onClick={() =>
              scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
            }
          >
            <img src="/assets/svg/right-arrow.svg" alt="Right Icon" />
          </button>
        </div>
      )}
    </div>
  );
}
