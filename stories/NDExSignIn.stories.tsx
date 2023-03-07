import React from 'react'
import NDExSignInButton from '../src/NDExSignIn'
import { NDExAccountProvider } from '../src/NDExAccountContext'
import { withKnobs } from '@storybook/addon-knobs'
import { KeycloakConfig } from 'keycloak-js'

export default {
  title: 'NDEx Sign In',
  component: NDExSignInButton,
  decorators: [withKnobs],
}

const ndexServerURL: string = 'https://dev.ndexbio.org'

export const Default = () => {
  const loginStateUpdated = (loginState) => {
    console.log('Update in login state: ' + JSON.stringify(loginState))
  }

  const keycloakConfig: KeycloakConfig = {
    url: ndexServerURL + '/auth2',
    realm: 'ndex',
    clientId: 'localtestclient',
  }

  return (
    <NDExAccountProvider
      ndexServerURL={ndexServerURL}
      keycloakConfig={keycloakConfig}
    >
      <NDExSignInButton
        variant="outlined"
        size="small"
        onLoginStateUpdated={loginStateUpdated}
      />
    </NDExAccountProvider>
  )
}
