// export async function fetchNetwork(uuid: string) {
//   console.info('fetch net::', uuid)

//   let { data } = await fetch(`${PUBLIC_URL}${uuid}/summary`)

//   await new Promise((r) => setTimeout(r, 5000))
//   return cx
// }

// export async function fetchProject(key, { id }) {
//   console.info('fetch project id', id)
//   let { data } = await axios.get(`https://api.github.com/repos/tannerlinsley/${id}`)
//   await new Promise((r) => setTimeout(r, 1000))
//   return data
// }

import HttpResponse from './HttpResponse'

import {
  useState,
  useCallback
} from 'react';

export async function callApi<T>(request: RequestInfo, settings): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request, settings)

  try {
    response.parsedBody = await response.json()
  } catch (ex) {
    console.error('API Call error:', ex)
  }

  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response
}

export function signUp(ndexServer, api) {
  console.log("Sign Up!", ndexServer + api)
}

export const getUserByEmail = async (ndexServer, api, emailAddress) => {
  const path = '/' + api + '/user?email=' + emailAddress;
  const apiCall = ndexServer + path;
  return callApi(apiCall, undefined);
}

export const getUserByUserName = async (ndexServer, api, userName) => {
  const path = '/' + api + '/user?username=' + userName;
  const apiCall = ndexServer + path;
  return callApi(apiCall, undefined);
}

export const emailNewPassword = async (ndexServer, api, userId) => {
  var path = '/' + api + '/user/' + userId + '/password?forgot=true';
  var apiCall = ndexServer + path;
  
  const putConfig = {
    method: 'PUT',
  }

  return callApi(apiCall, putConfig);
}

export const getUserBySearch = async (ndexServer, api, emailAddress) => {

  const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let response;

  if (emailRE.test(String(emailAddress).toLowerCase())) {
    try {
      response = await getUserByEmail(ndexServer, api, emailAddress)
    } catch (error) {
      response = await getUserByUserName(ndexServer, api, emailAddress)
    }
  } else {
    response = await getUserByUserName(ndexServer, api, emailAddress)
  }
  return response.parsedBody.externalId
}

export const resetPassword = async (ndexServer, api, searchString) => {
  const user = await getUserBySearch(ndexServer,
    api,
    searchString)
  const result = await emailNewPassword(ndexServer, api, user);
  console.log('Result of resetPassword: ' + result);
  return user
}

export const useResetPassword = (ndexServer) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<string>();

  const execute = async (user) => {
    try {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);
      const newData = await resetPassword(ndexServer, 'v2', user);
      setData(newData)
      return newData;
    } catch (e) {
      setError('Cannot find user.');
      setIsLoading(false);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    data,
    execute: useCallback(execute, []), // to avoid infinite calls when inside a `useEffect`
  };
}


