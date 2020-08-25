import React, {createContext, useContext, useReducer} from 'react';
export const NDExAccountContext = createContext();
export const NDExAccountProvider = ({ndexServerURL, children}) =>{
  
  const initialState = {
    ndexServerURL: ndexServerURL,
    loginInfo: null
  }

  const reducer = (state, action) => {
    switch(action.type) {
      case 'setLoginInfo':
        return {
          ...state,
          loginInfo: action.loginInfo
        };
      default:
        throw new Error();
    };
  }
  return (
  <NDExAccountContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </NDExAccountContext.Provider>
)};
export const useNDExAccountValue = () => useContext(NDExAccountContext);