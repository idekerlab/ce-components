import React, { useState } from 'react'
import config from './assets/config'
import { Paper } from '@material-ui/core'

import { useGoogleLogin } from 'react-google-login';

import { makeStyles } from '@material-ui/styles'
import NdexGoogleLoginPanel from './NdexGoogleLoginPanel'
import NdexCredentialsLoginPanel from './NdexCredentialsLoginPanel'


const useStyles = makeStyles({
  root: {
    height: '14.5em',
    margin: 0,
    padding: '0.6em',
    display: 'flex',
    minWidth: '30em'
  },
  leftComponent: {
    display: 'flex',
    height: '100%',
    alignItem: 'center',
    justifyContent: 'center'
  },
  rightComponent: {
    marginLeft: '0.6em',
    flexGrow: 2
  }
})

const NdexLoginPanel = props => {
  const classes = useStyles()

  const {
    onLoginSuccess,
    onSuccess,
    handleCredentialsSignOn,
    handleError,
    error,
    ndexServer
  } = props
  const [isGoogle, setIsGoogle] = useState(true)

  const onError = (error, googleSSO) => {
    props.handleError(error)
    setIsGoogle({ googleSSO })
  }

  // Unique ID for each NDEx server
  let googleSSO = true
  const serverUrl = props.ndexServer.split('//')[1]
  const clientId = config.G_CLIENT_ID[serverUrl]
  if (clientId === undefined || clientId === null) {
    googleSSO = false
  }
 
   const onFailure = err => {
     const message =
       (err.details &&
         err.details.startsWith(
           'Not a valid origin for the client: http://localhost:'
         )) ||
       (err.error && err['error']) ||
       JSON.stringify(err)
     props.onError(message, false)
   }
 
   const { signIn, loaded } = useGoogleLogin({
     clientId: clientId,
     scope: 'profile email',
     onSuccess: onSuccess,
     onFailure: onFailure,
     isSignedIn : true
   })
 /*
   if (loaded) {
     // Check current login status
     const g = window['gapi'];
     const user = g.auth2.getAuthInstance().currentUser.get();
     const id_token = user.getAuthResponse().id_token;
 
     onSuccess(user);
   }
 */

  return (
    <div className={classes.root}>
      <Paper className={classes.leftComponent}>
        <NdexGoogleLoginPanel
          onError={onError}
          onLoginSuccess={onLoginSuccess}
          onSuccess={onSuccess}
          ndexServer={ndexServer}
          googleSignIn={signIn}
          googleSSO={googleSSO}
        />
      </Paper>
      <Paper className={classes.rightComponent}>
        <NdexCredentialsLoginPanel
          onLoginSuccess={onLoginSuccess}
          handleCredentialsSignOn={handleCredentialsSignOn}
          handleError={handleError}
          error={error}
          ndexServer={ndexServer}
        />
      </Paper>
    </div>
  )
}

export default NdexLoginPanel
