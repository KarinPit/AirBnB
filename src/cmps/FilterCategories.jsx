import React, { useEffect, useState } from "react";
import ScrollMenu from "./ScrollMenu";

export default function FilterCategories() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/assets/img/filter-category/filter.json")
      .then((response) => response.json())
      .then(setImages)
      .catch(console.error);
  }, []);

  return (
    <ScrollMenu>
      {images.map((image, index) => (
        <label key={index} className="filter-category-lable">
          <img
            src={`/assets/img/filter-category/${image.src}`}
            alt={image.alt}
            key={index}
            className="filter-category-image"
          />
          <span>Off-the-grid</span>
        </label>
      ))}
    </ScrollMenu>
  );
}
