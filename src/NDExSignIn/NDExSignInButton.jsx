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


const NDExSignInButton = props => {

  const { classes } = props;

  const { ndexServerURL, loginInfo, setLoginInfo } = useContext(NDExAccountContext);

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
 
      />
      <NdexUserInfoPopover
        userName={userName}
        userImage={userImage}
        isOpen={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        myAccountURL = {myAccountURL}
        ndexServer={ndexServerURL}
      />
    </React.Fragment>
  )
}

export default withStyles(styles)(NDExSignInButton)
