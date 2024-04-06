import React, { useEffect } from "react";
import FilterAdvanced from "../cmps/FilterAdvanced";
import FilterCategories from "../cmps/FilterCategories";
import { useSelector } from "react-redux";
import { stayService } from "../services/stay.service.local";
import { useSearchParams } from "react-router-dom";
import { loadStays, setFilterBy } from "../store/actions/stay.actions";
import { store } from "../store/store";

/*
TO DO:
// Homepage: TOP categories: Best Rate / Houses / Kitchen  - show all - link to Explore
// Renders a <StayList> with <StayPreview> with Link to <StayDetails>   url: /stay/123
// See More => /explore?topRate=true
// See More => /explore?type=House
// See More => /explore?amenities=Kitchen
// Explore page:
// stayService.query({type: 'House'})
*/

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const isLoading = useSelector(
    (storeState) => storeState.stayModule.isLoading
  );

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setFilterBy(stayService.getFilterFromParams(searchParams));
  }, []);

  useEffect(() => {
    if (Object.keys(filterBy).length !== 0) {
      const sanitizedFilter = stayService.sanitizeFilter(filterBy);
      setSearchParams(sanitizedFilter);
      loadStays();
    }
  }, [filterBy]);

  function onSetFilter(fieldsToUpdate) {
    setFilterBy(fieldsToUpdate);
  }

  const { category_tag } = filterBy;

  if (isLoading) return <h1>loading...</h1>;

  return (
    <section>
      <h1> HomePageClient</h1>
      <div className="stays-index-category-bar">
        <FilterCategories
          onSetFilter={onSetFilter}
          filterBy={{ category_tag }}
        />
        <FilterAdvanced />
      </div>
    </section>
  );
}