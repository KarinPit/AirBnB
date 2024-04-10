import React from "react";
import { Link, useParams } from "react-router-dom";

import { StayDetails } from "../cmps/StayDetails";
/*
TO DO:
  // StayEdit - make it super easy to add Stay for development
  // StayList, StayPreview
  // Order, confirm Order
  // Lastly: StayExplore, Filtering
*/

const StayIndex = () => {
  const { stayId } = useParams();

  return (
    <div>
      <StayDetails stayId={stayId} />
    </div>
  );
};
export default StayIndex;
