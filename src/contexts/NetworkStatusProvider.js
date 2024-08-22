import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

const NetworkStatusContext = createContext();

export const NetworkStatusProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const { isConnected, isInternetReachable } = state;
      setIsConnected(isConnected && isInternetReachable !== false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkStatusContext.Provider value={isConnected}>
      {children}
    </NetworkStatusContext.Provider>
  );
};

export const useNetworkStatus = () => useContext(NetworkStatusContext);
