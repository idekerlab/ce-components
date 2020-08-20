import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';

import ndexClient from 'ndex-client';

export const CyNDExContext = createContext({ available: false, port: 1234 });

export const CyNDExProvider = ({ port, children }) => {
  let initialState = {
    available: false,
    port: port
  };
  
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'setAvailable':
        return {
          ...state,
          available: true
        };
      case 'setUnavailable':
          return {
            ...state,
            available: false
          };
      default:
        throw new Error();
    };
  }, initialState);

  let pollCyREST = false;

  function refresh() {
    const cyndex = new ndexClient.CyNDEx(port);
    if (pollCyREST) {
      cyndex.getCyNDExStatus().then(
        response => {
          dispatch({ type: "setAvailable"})
        },
        err => {
          dispatch({ type: "setUnavailable" })
        });
      setTimeout(refresh, 5000);
    }
  }

  const pollingStart = () => {
    pollCyREST = true;
    setTimeout(refresh, 5000);
  };

  const pollingStop = () => {
    pollCyREST = false;
  };

  useEffect(() => {
      pollingStart();
    return () => {
       pollingStop();
    }
  }, [])

  return (
  <CyNDExContext.Provider value={{state, dispatch}} >
    {children}
  </CyNDExContext.Provider>)
}

export const useCyNDExValue = () => useContext(CyNDExContext);
