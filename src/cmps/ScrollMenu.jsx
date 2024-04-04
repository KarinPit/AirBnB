import React, { useState, useEffect } from "react";

export default function ScrollMenu({
  children,
  LeftIcon,
  RightIcon,
  scrollRef,
}) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollRef.current) {
        const el = scrollRef.current;
        const isStart = el.scrollLeft <= 0;
        const isEnd =
          Math.ceil(el.scrollLeft + el.offsetWidth) >= el.scrollWidth;
        setIsAtStart(isStart);
        setIsAtEnd(isEnd);
      }
    };

    checkScrollPosition();
    const el = scrollRef.current;
    el.addEventListener("scroll", checkScrollPosition);

    return () => el.removeEventListener("scroll", checkScrollPosition);
  }, [children, scrollRef]);

  return (
    <div className="scroll-menu-wrapper">
      {!isAtStart && (
        <div className="scroll-menu-arrows left">
          <button
            className="scroll-menu-arrow"
            onClick={() =>
              scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
            }
            aria-label="Scroll Left"
          >
            <LeftIcon />
          </button>
        </div>
      )}
      <div className="scroll-menu-childrens" ref={scrollRef}>
        {children}
      </div>
      {!isAtEnd && (
        <div className="scroll-menu-arrows right">
          <button
            className="scroll-menu-arrow"
            onClick={() =>
              scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
            }
            aria-label="Scroll Right"
          >
            <RightIcon />
          </button>
        </div>
      )}
    </div>
  );
}
