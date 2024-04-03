import React from "react";
import FilterCategories from "../cmps/FilterCategories";
import FilterAdvanced from "../cmps/FilterAdvanced";

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

export function TravelerIndex() {
  return (
    <section>
      <h1> HomePageClient</h1>
      <div className="traveler-category-bar">
        <FilterCategories />
        <FilterAdvanced />
      </div>
    </section>
  );
}
