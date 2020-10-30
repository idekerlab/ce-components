import React, { useState, useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NdexLoginDialog from './NdexLoginDialog'
import { NDExAccountContext } from '../NDExAccountContext'
import Avatar from '@material-ui/core/Avatar';
import NdexUserInfoPanel from './NdexUserInfoPanel';
import NdexUserInfoPopover from './NdexUserInfoPopover';

import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { validateLogin } from './validateCredentials'

import { getUserByEmail } from '../api/ndex'

const styles = theme => ({
  button: {
    color: '#4DA1DE',
    borderColor: '#4DA1DE',
    '&:active': {
      borderColor: '#4DA1DE'
    },
    'line-height': 0
  },
  iconSmall: {
    color: '#4DA1DE',
    height: '22px',
    width: '22px'
  },
  iconMedium: {
    color: '#4DA1DE',
    height: '24px',
    width: '24px'
  },
  iconLarge: {
    color: '#4DA1DE',
    height: '26px',
    width: '26px'
  },
  buttonIcon: {
    fontSizeSmall: '22px',
    fontSizeLarge: '26px'
  }

})

const DEFAULT_HANDLER = loginState => {
  // Default callback function for login status change
  console.warn('Default handler: NDEx login state updated', loginState)

  // Add actual handler here...
}

const LOGGED_IN_USER = 'loggedInUser'

const NDExSignInButton = props => {

  const { classes } = props;

  const { ndexServerURL, loginInfo, setLoginInfo, googleClientId } = useContext(NDExAccountContext);

  const { onLoginStateUpdated, myAccountURL } = props

  let onUpdate = DEFAULT_HANDLER
  if (onLoginStateUpdated !== null && onLoginStateUpdated !== undefined) {
    onUpdate = onLoginStateUpdated
  }

  const [isDialogOpen, setDialogOpen] = useState(false)

  const setDialogState = dialogState => {
    setDialogOpen(dialogState)
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const defaultSignInAction = () => {
    console.log("")
  };

  const defaultSignInStatus = () => {
    return false;
  };

  const {
    signInAction = defaultSignInAction,
    getSignInStatus = defaultSignInStatus,
    variant,
    size
  } = props

  const [errorMessage, setErrorMessage] = useState('')

  const [tempGoogleAuth, setTempGoogleAuth] = useState();

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
    setLoginInfo(null);
    onLoginStateUpdated(null)
    setDialogState(false);
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
    console.log('onGoogleSuccess called');

    const newNdexCredential = 
    { loaded: true,
      isLogin: true,
      isGoogle: true, 
      oauth: res 
    }

    getUserByEmail(ndexServerURL, 'v2', newNdexCredential.oauth.profileObj.email).then(()=>{
      onGoogleAgreement(res);
    }).catch((error) => {
      if (isOpen) {
        setTempGoogleAuth(res);
        setContentMode(content_mode.SIGN_TERMS_AND_CONDITIONS);
      } else {
        setLoginInfo(null);
        onLoginStateUpdated(null)
      }
    })
  }

  const onGoogleAgreement = (res) => {
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

    setLoginInfo(loginInfo);
    onLoginStateUpdated(loginInfo);
  };

  const onSuccessLogin = (loginInfo, userImage) => {
    setLoginInfo(loginInfo);
    onLoginStateUpdated(loginInfo);
    setDialogState(false);
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
 
  if (googleClientId === undefined || googleClientId === null) {
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

  const onAutoLoadFinished = (signedIn) => {

    console.log('onAutoLoadFinished(' + signedIn + ')');

    const loggedInUserString = window.localStorage.getItem('loggedInUser');

    if (loggedInUserString) {
      console.log("LoggedInUser: " + loggedInUserString);
      const loggedInUser = JSON.parse(loggedInUserString);

      validateLogin(loggedInUser.userName, loggedInUser.token, ndexServerURL).then(data => {
        console.log('auto login returned Validation:', data)

        if (data.error !== null) {
          setErrorMessage(data.error.message)
          setLoginInfo(null);
          onLoginStateUpdated(null)
        } else {
          handleCredentialsSignOn({
            id: loggedInUser.userName,
            password: loggedInUser.token,
            ndexServerURL,
            fullName: data.userData.firstName + ' ' + data.userData.lastName,
            image: data.userData.image,
            details: data.userData
          })
        }
      })
    } else {
      // Check current login status
      if (!signedIn) {
        setLoginInfo(null);
        onLoginStateUpdated(null)
      }
    }
  }

  const { signIn, loaded } = useGoogleLogin({
    clientId: googleClientId,
    scope: 'profile email',
    onSuccess: onGoogleSuccess,
    onFailure: onFailure,
    onAutoLoadFinished: onAutoLoadFinished,
    isSignedIn: true,
    fetchBasicProfile: true
  })

  const { signOut } = useGoogleLogout({
    clientId: googleClientId,
    onLogoutSuccess: onGoogleLogoutSuccess,
    onFailure: onFailure
  })


  const iconClassName = (size) => {
    switch (size) {
      case 'small': return classes.iconSmall;
      case 'large': return classes.iconLarge;
      default: return classes.iconMedium;
    }
  }

  const getNDExUsername = () => {
    return loginInfo.loginDetails.fullName;
  }

  const getGoogleUsername = () => {
    return loginInfo.loginDetails.profileObj.name;
  }

  const getNDExAvatar = ()=> {
    const userName = getNDExUsername();
    return <Avatar className={iconClassName(size)} src={ loginInfo.loginDetails.image }>{ loginInfo.loginDetails.image ? "" : userName ? userName.trim().substring(0,1) : "A"}</Avatar> 
  }

  const getGoogleAvatar = () => {
    const userName = getGoogleUsername();
    return <Avatar className={iconClassName(size)} src={ loginInfo.loginDetails.profileObj.imageUrl }>{ loginInfo.loginDetails.profileObj.imageUrl ? "" : userName ? userName.trim().substring(0,1) : "A"}</Avatar> 
  }

  const getIcon = () => {
    return loginInfo 
    ? loginInfo.isGoogle ? getGoogleAvatar() : getNDExAvatar()
    : <AccountCircleIcon className={iconClassName(size)}/>
  }

  const getTitle = () => {
    return loginInfo ? 'Signed in as ' + (loginInfo.isGoogle ? getGoogleUsername() : getNDExUsername()): 'Sign in to NDEx'
  }

  let userName = ''
  let userImage = null
  if (loginInfo !== null) {

    if (loginInfo.isGoogle) {
      userName = loginInfo.loginDetails.profileObj.name
      userImage = loginInfo.loginDetails.profileObj.imageUrl
    } else {
      userName = loginInfo.loginDetails.fullName
      userImage = loginInfo.loginDetails.image
    }
  }

  return (
    <React.Fragment>
      <Tooltip
        disableFocusListener
        title={getTitle()}
        placement="bottom"
      >
        <Button
          className={classes.button}
          variant={variant}
          onClick={(event) => {
              if (loginInfo) {
                setAnchorEl(event.currentTarget);
              } else {
                setDialogState(true)
              }
            }
          }
          size={size}
        >
          { getIcon()
          }
        </Button>
      </Tooltip>
      <NdexLoginDialog
        setDialogState={setDialogState}
        isOpen={isDialogOpen}
        ndexServer={ndexServerURL}
        onLoginStateUpdated={onUpdate}
        myAccountURL = {myAccountURL}
        onLoginSuccess = {onLoginSuccess}
        onLogout = {onLogout}
        handleCredentialsSignOn = {handleCredentialsSignOn}
        onGoogleSuccess = {onGoogleSuccess}
        onError = {onError}
        handleError = {handleError}
        errorMessage = { errorMessage }
        signIn = {signIn}
        googleSSO = {googleSSO}
        onGoogleAgreement = {onGoogleAgreement}
      />
      <NdexUserInfoPopover
        userName={userName}
        userImage={userImage}
        isOpen={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        myAccountURL = {myAccountURL}
        ndexServer={ndexServerURL}
        onLogout={onLogout}
      />
    </React.Fragment>
  )
}

export default withStyles(styles)(NDExSignInButton)
