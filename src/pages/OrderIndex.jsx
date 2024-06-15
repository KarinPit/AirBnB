import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { store } from '../store/store'

import { loadUser } from '../store/actions/user.actions'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH, SOCKET_EMIT_USER_UNWATCH } from '../services/other/socket.service.js'
import OrderPreview from '../cmps/Order/OrderPreview';

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

  const loggedUser = useSelector(storeState => storeState.userModule.user)

  useEffect(() => {
    if (loggedUser) {
      loadUser(loggedUser._id)
      socketService.emit(SOCKET_EMIT_USER_WATCH, loggedUser._id)
      socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
      return () => {
        socketService.emit(SOCKET_EMIT_USER_UNWATCH, loggedUser._id)
        socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
      }
    }

  }, [])

  function onUserUpdate(user) {
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return <OrderPreview stayId={stayId} />;
};

export default OrderIndex;