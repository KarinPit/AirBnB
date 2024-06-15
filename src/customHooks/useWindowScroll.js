import { useState, useEffect } from "react";

function useWindowScroll() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let timer;
    function handleScroll() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setScrollPosition(window.scrollY);
      }, 20); 
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    scrollY: scrollPosition,
  };
}

export default useWindowScroll;
