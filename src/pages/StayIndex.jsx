import React from "react";
import { Link, useParams } from "react-router-dom";

import { StayDetails } from "../cmps/Stay/StayDetails";

export default function StayIndex() {
  const { stayId } = useParams();
  return <StayDetails stayId={stayId} />;
};
