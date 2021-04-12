import React, { createContext, useContext, useReducer, useEffect } from 'react';

import ndexClient from 'ndex-client';

export const CyNDExContext = createContext({ available: false, port: 1234 });

export const CyNDExProvider = ({ port, children }) => {
  let initialState = {
    available: false,
    status: undefined,
    port: port
  };
  
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'setAvailable':
        return {
          ...state,
          available: true,
          status: action.payload
        };
      case 'setUnavailable':
          return {
            ...state,
            available: false,
            status: undefined
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
          dispatch({ type: "setAvailable", payload: response.data})
        },
        err => {
          dispatch({ type: "setUnavailable" })
        });
      setTimeout(refresh, 5000);
    }
  }

  const pollingStart = () => {
    pollCyREST = true;
    setTimeout(refresh, 1000);
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
