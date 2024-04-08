import React from 'react';
import { useSelector } from "react-redux"

import { StayList } from '../cmps/StayList';


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
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    return (
        <StayList stays={stays} />
    );
}
