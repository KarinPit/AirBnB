import React from "react";
import { Link, useParams } from "react-router-dom";

import { StayDetails } from "../cmps/Stay/StayDetails";
/*
TO DO:
  // StayEdit - make it super easy to add Stay for development
  // StayList, StayPreview
  // Order, confirm Order
  // Lastly: StayExplore, Filtering
*/

const StayIndex = () => {
  const { stayId } = useParams();
  return <StayDetails stayId={stayId} />;
};
export default StayIndex;
