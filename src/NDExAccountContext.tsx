import React, {createContext, useContext, useState} from 'react';

import NDExAccountModel from './model/NDExAccountModel'
export const NDExAccountContext = createContext<Partial<NDExAccountModel>>({});

export const NDExAccountProvider = ({ndexServerURL, children}) =>{
  
  const [loginInfo, setLoginInfo] = useState(undefined);

  const defState : NDExAccountModel = {
    ndexServerURL,

    loginInfo,
    setLoginInfo
  }

  return (
  <NDExAccountContext.Provider value={defState}>
    {children}
  </NDExAccountContext.Provider>
)};
export const useNDExAccountValue = () => useContext(NDExAccountContext);