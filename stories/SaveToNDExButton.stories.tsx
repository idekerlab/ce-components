import React from 'react'
import SaveToNDExButton from '../src/SaveToNDExButton';
import NDExSignInButton from '../src/NDExSignIn';
import { NDExAccountProvider } from '../src/NDExAccountContext';
import { withKnobs, object } from '@storybook/addon-knobs';

export default {
  title: 'Save to NDEx Button',
  component: SaveToNDExButton,
  decorators: [withKnobs],
}

const sampleNDExData = {
  ndexServer: 'http://public.ndexbio.org/',
  uuid: 'b1e9a489-bbe7-11ea-aaef-0ac135e8bacf',
  username: 'ismbdemo',
  password: 'ismbdemo2020'
}

export const Default = () => {

  const onSuccess = (data) => {
    console.log("SUCCESS: " + JSON.stringify(data));
  }

  const onFailure = (error) => {
    console.log("FAILURE: " + error);
  }

  const fetchCX = () => {
    return fetch('http://dev.ndexbio.org/v2/network/67e9e577-9a04-11ea-96e4-525400c25d22')
      .then(function (response) {
        return response.json();
      }).catch(error => { console.log(error) })
  }

  const loginStateUpdated = loginState => {
    console.log("Update in login state: " + JSON.stringify(loginState));
  }

  return <NDExAccountProvider ndexServerURL='http://public.ndexbio.org' >
    <NDExSignInButton variant="outlined" size="small" onLoginStateUpdated={loginStateUpdated} /> &#8592; Login to a valid NDEx account to enable save<br/>
    <SaveToNDExButton variant="outlined" size="small" fetchCX={fetchCX} onSuccess={onSuccess} onFailure={onFailure} /> &#8592; Click to save a test network to your NDEx account<br/>
  </NDExAccountProvider >
}