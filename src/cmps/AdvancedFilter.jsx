import React, { useState } from "react";
import { AdvancedFilterIcon } from "../services/svg.service";
import ModalContainer from "./ModalContainer";
import AdvancedFilterForm from "./Forms/AdvancedFilterForm";

export default function AdvancedFilter() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  function openFilterModal() {
    setIsOpenModal((prevIsOpen) => !prevIsOpen);
  }
  return (
    <>
      <button onClick={openFilterModal} className="filter-advanced-button">
        <span className="filter-advanced-span">
          <AdvancedFilterIcon />
          Filters
        </span>
      </button>
      {isOpenModal && (
        <ModalContainer
          headerTitle="Filters"
          onClose={() => console.log("Closing modal")}
          footerContent={
            <>
              <button>Clear all</button>
              <button className="btn">Show 1,000+ places</button>
            </>
          }
        >
          <AdvancedFilterForm />
        </ModalContainer>
      )}
    </>
  );
}
