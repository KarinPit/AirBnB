import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import FilterCategories from "../cmps/FilterCategories";
import { stayService } from "../services/stay.service.local";
import { loadStays, setFilterBy } from "../store/actions/stay.actions";
import AdvancedFilter from "../cmps/AdvancedFilter";
import { StayList } from "../cmps/StayList";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

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

export function StaysIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const isLoading = useSelector(
    (storeState) => storeState.stayModule.isLoading
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setFilterBy(stayService.getFilterFromParams(searchParams));
  }, []);

  useEffectUpdate(() => {
    if (Object.keys(filterBy).length !== 0) {
      const sanitizedFilter = stayService.sanitizeFilter(filterBy);
      setSearchParams(sanitizedFilter);
      loadStays();
    }
  }, [filterBy]);

  function onSetFilter(fieldsToUpdate) {
    setFilterBy(fieldsToUpdate);
  }

  const { category_tag, ...rest } = filterBy;

  if (isLoading) return <h1>loading...</h1>;

  return (
    <section>
      <div className="stays-index-category-bar">
        <FilterCategories onSetFilter={onSetFilter} filterBy={category_tag} />

        <AdvancedFilter filterBy={rest} onSetFilter={onSetFilter} />
      </div>
      <StayList stays={stays} />
    </section>
  );
}
