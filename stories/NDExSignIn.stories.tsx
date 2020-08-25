import React from 'react'
import NDExSignInButton from '../src/NDExSignIn';
import { NDExAccountProvider } from '../src/NDExAccountContext';
import { withKnobs, object, text } from '@storybook/addon-knobs';

export default {
  title: 'NDEx Sign In',
  component: NDExSignInButton,
  decorators: [withKnobs],
}

export const Default = () => {

  const loginStateUpdated = loginState => {
    console.log("Update in login state: " + JSON.stringify(loginState));
  }

  return <NDExAccountProvider ndexServerURL='http://public.ndexbio.org' >
    <NDExSignInButton variant="outlined" size="small" onLoginStateUpdated={loginStateUpdated} />
  </NDExAccountProvider>
}
