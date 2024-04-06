import React from "react";
import { CloseIcon } from "../services/svg.service";

export default function ModalContainer({
  children,
  headerTitle = "Filters",
  onClose,
  footerContent,
  slideFromBottom = false,
}) {
  const slideClass = slideFromBottom ? "slide-from-bottom" : "";

  return (
    <div className={`modal-container ${slideClass}`}>
      <div className="modal-container-inner">
        <header>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
          <span>{headerTitle}</span>
          <div /> {/* Placeholder for potential future content */}
        </header>
        <div className="modal-content">{children}</div>
        {footerContent && <footer>{footerContent}</footer>}
      </div>
    </div>
  );
}
