import React from "react";
import { Link, useParams } from "react-router-dom";

import { StayDetails } from "../cmps/Stay/StayDetails";

const StayIndex = () => {
  const { stayId } = useParams();
  return <StayDetails stayId={stayId} />;
};
export default StayIndex;
