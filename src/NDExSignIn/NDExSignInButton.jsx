import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NdexLoginDialog from './NdexLoginDialog'
import { useNDExAccountValue } from '../NDExAccountContext'
import Avatar from '@material-ui/core/Avatar';

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
    height: '22px',
    width: '22px'
  },
  iconMedium: {
    height: '24px',
    width: '24px'
  },
  iconLarge: {
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

  const [{ ndexServerURL, loginInfo }, dispatch] = useNDExAccountValue();

  const { onLoginStateUpdated } = props

  let onUpdate = DEFAULT_HANDLER
  if (onLoginStateUpdated !== null && onLoginStateUpdated !== undefined) {
    onUpdate = onLoginStateUpdated
  }

  const [isOpen, setOpen] = useState(false)

  const setDialogState = dialogState => {
    setOpen(dialogState)
  }
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

  const getNDExAvatar = ()=> {
    return <Avatar className={iconClassName(size)} src={ loginInfo.loginDetails.image }></Avatar> 
  }

  const getGoogleAvatar = () => {
    return <Avatar className={iconClassName(size)} src={ loginInfo.loginDetails.profileObj.imageUrl }></Avatar> 
  }

  const getIcon = () => {
    return loginInfo 
    ? loginInfo.isGoogle ? getGoogleAvatar() : getNDExAvatar()
    : <AccountCircleIcon className={iconClassName(size)}/>
  }

  return (
    <React.Fragment>
      <Tooltip
        disableFocusListener
        title="Sign In to NDEx"
        placement="bottom"
      >
        <Button
          className={classes.button}
          variant={variant}
          onClick={() => setDialogState(true)}
          size={size}
        >
          { getIcon()
          }
        </Button>
      </Tooltip>
      <NdexLoginDialog
        setDialogState={setDialogState}
        isOpen={isOpen}
        ndexServer={ndexServerURL}
        onLoginStateUpdated={onUpdate}
      />
    </React.Fragment>
  )
}

export default withStyles(styles)(NDExSignInButton)
