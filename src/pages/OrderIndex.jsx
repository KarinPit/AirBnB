import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import OrderPreview from '../cmps/Stay/OrderPreview';

const OrderIndex = () => {
  const { stayId } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <OrderPreview stayId={stayId} />;
};

export default OrderIndex;