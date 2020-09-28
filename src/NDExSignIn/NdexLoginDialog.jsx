import React, { useState, useEffect } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Avatar
} from '@material-ui/core'

import config from './assets/config'
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';

import NdexUserInfoPanel from './NdexUserInfoPanel'
import NdexLoginPanel from './NdexLoginPanel'
import { makeStyles } from '@material-ui/styles'

import NdexLogo from './assets/images/ndex-logo.svg'

import { useNDExAccountValue } from '../NDExAccountContext'

import { validateLogin } from './validateCredentials'


const DEFAULT_TITLE = 'Sign in to your NDEx Account'
const SUBTITLE = 'Choose one of the following sign in methods:'
const LOGGED_IN_USER = 'loggedInUser'

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0
  },
  content: {
    padding: 0,
    margin: 0
  },
  title: {
    color: '#444444',
    padding: '0.8em'
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  ndexLogo: {
    height: '3em',
    marginRight: '1em'
  },
  actionPanel: {
    margin: 0,
    padding: '0.3em'
  },
  userIcon: {
    height: '1.5em',
    width: '1.5em'
  }
})

const NdexLoginDialog = props => {
  const classes = useStyles()

  const [{ ndexServerURL, loginInfo }, dispatch] = useNDExAccountValue();

  const [errorMessage, setErrorMessage] = useState('')

  // Open/Close state is always passed from parent component
  const {
    isOpen,
    setDialogState,
    onLoginStateUpdated,
    ndexServer
  } = props

  useEffect(() => {
    checkBasicLogin();
  }, []);

  const checkBasicLogin = () => {
    const loggedInUserString = window.localStorage.getItem('loggedInUser');

    if (loggedInUserString) {
      console.log("LoggedInUser: " + loggedInUserString);
      const loggedInUser = JSON.parse(loggedInUserString);

      validateLogin(loggedInUser.userName, loggedInUser.token, ndexServer).then(data => {
        console.log('auto login returned Validation:', data)

        setTimeout(() => {
          //setLoading(false)

          if (data.error !== null) {
            setErrorMessage(data.error.message)
          } else {
            handleCredentialsSignOn({
              id: loggedInUser.userName,
              password: loggedInUser.token,
              ndexServer,
              fullName: data.userData.firstName + ' ' + data.userData.lastName,
              image: data.userData.image,
              details: data.userData
            })
          }
        }, 500)
      })
    }
  }

  const onLoginSuccess = event => {
    console.log('Login success:', event)
  }

  const onGoogleLogoutSuccess = () => {
    console.log("Google logged out");
  }



  const onLogout = () => {
    console.log('Logout:' + loginInfo.isGoogle);
    if (loginInfo.isGoogle) {
      signOut();
    }
    else {
      window.localStorage.removeItem(LOGGED_IN_USER);
    }
    dispatch({
      type: 'setLoginInfo',
      loginInfo: null
    })
    onLoginStateUpdated(null)
  }

  const handleCredentialsSignOn = userInfo => {
    const loginInfo = { isGoogle: false, loginDetails: userInfo }
    const userImage = userInfo.image

    const loggedInUser = {
      externalId: userInfo.details.externalId,
      firstName: userInfo.details.firstName,
      lastName: userInfo.details.lastName,
      token: userInfo.password,
      userName: userInfo.id
    }

    window.localStorage.setItem(LOGGED_IN_USER, JSON.stringify(loggedInUser));

    onSuccessLogin(loginInfo, userImage)
  }

  const onGoogleSuccess = res => {
    if (loginInfo && !loginInfo.isGoogle) {
      console.log("Found loginInfo: ", loginInfo);
      //Don't overwrite existing NDEx logins
      return
    }
    const newLoginInfo = { isGoogle: true, loginDetails: res }
    const userImage = res.profileObj.imageUrl
    refreshTokenSetup(res);
    onSuccessLogin(newLoginInfo, userImage)
  }

  const refreshTokenSetup = (res) => {

    let refreshTiming = (res.expires_in || 3600 - 5 * 60) * 1000;
    console.log('Will refresh auth token in ' + refreshTiming);

    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log('newAuthRes: ', newAuthRes);
      console.log('Will refresh auth token in ' + refreshTiming);
      onTokenRefresh(res, newAuthRes);
      setTimeout(refreshToken, refreshTiming);
    }

    setTimeout(refreshToken, refreshTiming);
  }

  const onTokenRefresh = (res, authResponse) => {
    const loginDetails = res;
    console.log("Login Details", loginDetails);

    let refreshedLoginDetails = Object.assign({}, loginDetails);

    refreshedLoginDetails['id_token'] = authResponse.id_token;

    console.log("Refreshed Login Details", refreshedLoginDetails);

    const loginInfo = { isGoogle: true, loginDetails: refreshedLoginDetails };

    dispatch({
      type: 'setLoginInfo',
      loginInfo: loginInfo
    })
    onLoginStateUpdated(loginInfo);
  };

  const onSuccessLogin = (loginInfo, userImage) => {
    dispatch({
      type: 'setLoginInfo',
      loginInfo: loginInfo
    })
    onLoginStateUpdated(loginInfo)
  }

  const handleError = error => {
    console.log('Error:', error)
    setErrorMessage(error)
  }

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
    onSuccess: onGoogleSuccess,
    onFailure: onFailure,
    isSignedIn: true
  })

  const { signOut } = useGoogleLogout({
    clientId: clientId,
    onLogoutSuccess: onGoogleLogoutSuccess,
    onFailure: onFailure
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

  const getContent = () => {
    if (loginInfo !== null) {

      let userName = ''
      let userImage = null
      if (loginInfo.isGoogle) {
        userName = loginInfo.loginDetails.profileObj.name
        userImage = loginInfo.loginDetails.profileObj.imageUrl
      } else {
        userName = loginInfo.loginDetails.fullName
        userImage = loginInfo.loginDetails.image
      }

      return (
        <NdexUserInfoPanel
          userName={userName}
          userImage={userImage}
          onLogout={onLogout}
          ndexServer={ndexServer}
        />
      )
    }

    return (
      <NdexLoginPanel
        setDialogState={setDialogState}
        onLoginSuccess={onLoginSuccess}
        onLogout={onLogout}
        handleCredentialsSignOn={handleCredentialsSignOn}
        onSuccess={onGoogleSuccess}
        onError={onError}
        handleError={handleError}
        error={errorMessage}
        ndexServer={ndexServer}
        googleSignIn={signIn}
        googleSSO={googleSSO}
      />
    )
  }

  return (
    <Dialog className={classes.root} open={isOpen}>
      {loginInfo !== null ? (
        <div />
      ) : (
          <DialogTitle disableTypography={true} className={classes.title}>
            <div className={classes.titleWrapper}>
              <img
                src={NdexLogo}
                alt={'NDEx Logo'}
                className={classes.ndexLogo}
              />
              <div>
                <Typography variant={'subtitle1'}>{DEFAULT_TITLE}</Typography>
                <Typography variant={'subtitle2'}>{SUBTITLE}</Typography>
              </div>
            </div>
          </DialogTitle>
        )}
      <DialogContent className={classes.content}>{getContent()}</DialogContent>
      <Divider />
      <DialogActions className={classes.actionPanel}>
        <Button
          variant={'outlined'}
          onClick={() => setDialogState(false)}
          color={'default'}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NdexLoginDialog
