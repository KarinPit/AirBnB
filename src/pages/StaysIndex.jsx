import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import FilterCategories from "../cmps/Filters/FilterCategories";
import { stayService } from "../services/stay.service.local";
import { loadStays, setFilterBy } from "../store/actions/stay.actions";
import AdvancedFilter from "../cmps/Filters/AdvancedFilter";
import { StayList } from "../cmps/Stay/StayList";
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

const StaysIndex = () => {
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const isLoading = useSelector(
    (storeState) => storeState.stayModule.isLoading
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setFilterBy(stayService.getFilterFromParams(searchParams));
  }, []);


  // Inside your component that renders the category bar
useEffect(() => {
  const categoryBar = document.querySelector('.stays-index-category-bar');
  const headerHeight = document.querySelector('.app-header').offsetHeight;

  const handleScroll = () => {
    if (window.scrollY > headerHeight) {
      categoryBar.style.position = 'sticky';
      categoryBar.style.top = `${headerHeight}px`;
    } else {
      categoryBar.style.position = 'static'; 
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
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

  if (isLoading) return '';

  return (
    <section>
      <div className="stays-index-category-bar">
        <FilterCategories onSetFilter={onSetFilter} filterBy={category_tag} />

        <AdvancedFilter filterBy={rest} onSetFilter={onSetFilter} />
      </div>
      <StayList stays={stays} />
    </section>
  );
};
export default StaysIndex;
