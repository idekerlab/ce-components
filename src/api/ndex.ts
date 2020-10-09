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

export async function callApi<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request)

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

export async function resetPassword(ndexServer, api, emailAddress) {

  var emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRE.test(String(emailAddress).toLowerCase())) {
    // Server API: Get User By Email
    // GET /user?email={emailAddress}

    var path = '/' + api + '/user?email=' + emailAddress;
    var apiCall = ndexServer + path;
    return callApi(apiCall);
  } else {
    throw('Not a valid e-mail')
  }
}
