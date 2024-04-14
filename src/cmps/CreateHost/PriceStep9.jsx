import { useFormikContext } from "formik";
import React, { useEffect, useRef } from "react";

export default function PriceStep9() {
  const { values, setFieldValue } = useFormikContext();
  const priceRef = useRef(null);

  const adjustFontSize = (price) => {
    const length = price.toString().length;
    const newSize = Math.max(64, 120 - length * 5);
    return newSize;
  };

  const handleContentEditableChange = (event) => {
    const text = event.currentTarget.textContent.replace(/[^0-9]/g, "");
    const newPrice = parseInt(text, 10) || 0;
    setFieldValue("price", newPrice);
    const fontSize = adjustFontSize(text);
    priceRef.current.style.fontSize = `${fontSize}px`;
    formatContentEditable(newPrice);
  };

  const formatContentEditable = (price) => {
    const formattedPrice = new Intl.NumberFormat().format(price);
    if (priceRef.current && priceRef.current.textContent !== formattedPrice) {
      priceRef.current.textContent = formattedPrice;
    }
  };

  useEffect(() => {
    if (priceRef.current) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(priceRef.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    priceRef.current.style.fontSize = `${adjustFontSize(values.price)}px`;
  }, [values.price]);

  return (
    <section className="price-step-9">
      <div>
        <div className="head">
          <h1>Now, set your price</h1>
          <span>You can change it anytime.</span>
        </div>
        <div className="price">
          <div className="custom-price">
            <span style={{ fontSize: `${adjustFontSize(values.price)}px` }}>
              ₪
            </span>
            <span
              ref={priceRef}
              contentEditable="true"
              onInput={handleContentEditableChange}
              suppressContentEditableWarning={true}
              style={{ fontSize: `${adjustFontSize(values.price)}px` }}
            >
              {new Intl.NumberFormat().format(values.price)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
