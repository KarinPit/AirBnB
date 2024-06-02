import React from 'react';
import { useParams } from 'react-router';
import OrderPreview from '../cmps/Stay/OrderPreview';

const OrderIndex = () => {
  const { stayId } = useParams();
  return <OrderPreview stayId={stayId} />;
};

export default OrderIndex;
