import React, {createContext, useContext, useState} from 'react';

import NDExAccountModel from './model/NDExAccountModel'
export const NDExAccountContext = createContext<Partial<NDExAccountModel>>({});

export const NDExAccountProvider = ({ndexServerURL, googleClientId, children}) =>{
  
  const [loginInfo, setLoginInfo] = useState(null);

  const defState : NDExAccountModel = {
    ndexServerURL,
    googleClientId,
    loginInfo,
    setLoginInfo
  }

  return (
  <NDExAccountContext.Provider value={defState}>
    {children}
  </NDExAccountContext.Provider>
)};
export const useNDExAccountValue = () => useContext(NDExAccountContext);