import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { AdvancedFilterIcon } from "../../services/svg.service";
import ModalContainer from "../ModalContainer";
import AdvancedFilterForm from "../Forms/AdvancedFilterForm";
import { useSelector } from "react-redux";
import { stayService } from "../../services/stay.service.local";

function AdvancedFilter({ onSetFilter, filterBy }) {
  const min = useSelector((state) => state.stayModule.min);
  const max = useSelector((state) => state.stayModule.max);
  const stays = useSelector((state) => state.stayModule.stays);
  const [initialValues, setInitialValues] = useState({
    ...stayService.getDefaultFilter(),
    price_min: min,
    price_max: max,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(min, max);
    setInitialValues((currentValues) => ({
      ...currentValues,
      price_min: min,
      price_max: max,
    }));
  }, [min, max]);

  const totalStaysFiltered = useSelector(
    (state) => state.stayModule.totalFiltered
  );

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // const sanitizeFilterKeys = Object.keys(stayService.sanitizeFilter(filterBy));
  // const hasFilterBy = filterBy && sanitizeFilterKeys.length > 0;
  // let initialValues = hasFilterBy ? filterBy : initial;
  const countChangedFilters = stayService.countChangedFilters(
    filterBy,
    initialValues
  );
  const submitText =
    totalStaysFiltered === 0
      ? `No exact matches`
      : `Show ${totalStaysFiltered} places`;

  return (
    <div className="advanced-filter">
      <div className="advanced-filter--filters-button">
        <button onClick={handleOpenModal}>
          <span>
            <AdvancedFilterIcon />
            Filters
          </span>
        </button>
        <div className="advanced-filter--count-filters">
          {countChangedFilters}
        </div>
      </div>
      {isModalOpen && (
        <Formik initialValues={initialValues} onSubmit={onSetFilter}>
          {({ resetForm, handleSubmit }) => (
            <ModalContainer
              headerTitle="Filters"
              onClose={handleCloseModal}
              footerContent={
                <div className="advanced-filter-footer-content">
                  <button
                    className="advanced-filter-clear-button"
                    type="button"
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    Clear all
                  </button>

                  <button
                    type="submit"
                    onClick={() => {
                      handleSubmit();
                      handleCloseModal();
                    }}
                  >
                    {submitText}
                  </button>
                </div>
              }
            >
              <AdvancedFilterForm />
            </ModalContainer>
          )}
        </Formik>
      )}
    </div>
  );
}

export default AdvancedFilter;
