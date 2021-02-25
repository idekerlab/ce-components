import React from 'react'
import { Avatar, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Popover from '@material-ui/core/Popover'

const useStyles = makeStyles({
  accountPopover: {
    padding: '1em',
    //width: '240px',
    flexShrink: 0
  },
  accountPopoverPaper: {
    padding: '1em',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
    //width: '240px'
  },
  ndexAvatar: {},
  ndexSelectedAvatar: {
    width: 80,
    height: 80
  },
  selectedProfile: {
    'align-items': 'center',
    padding: '1em'
  },
  ndexProfileAvatar: {
    'vertical-align': 'middle'
  },
  ndexProfileText: {
    'padding-left': '1em',
    'padding-right': '1em',
    'vertical-align': 'middle'
  },
  ndexProfilesFooter: {
    padding: '1em'
  },
  signInHeader: {
    display: 'flex',
    padding: '1.2em',
   
    justifyContent: 'center'
  },
  ndexAccountGreeting: {
    flexGrow: 1
  },
  largeAvatar: {
    marginRight: '1em',
    width: '6em',
    height: '6em'
  },
  item: {
    marginTop: '1em'
  }
})

const NdexUserInfoPopover = props => {
  const classes = useStyles()
  
  const { userImage, 
    userName, 
    onLogout, 
    anchorEl, 
    isOpen, 
    onClose,
    myAccountURL
   } = props

   const handleLogout = () => {
    onClose(); 
    onLogout();
   }

  return (
    <Popover
    id="account-popper"
    className={classes.accountPopover}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    anchorEl={anchorEl}
    open={isOpen}
    disableRestoreFocus={true}
    classes={{
      paper: classes.accountPopoverPaper
    }}
  >
      <Avatar className={classes.largeAvatar} src={userImage}>
        U
      </Avatar>
      <Typography variant={'subtitle1'} className={classes.item}>
        You are logged in as {userName}
      </Typography>
      { myAccountURL && 
      <Button
        variant={'outlined'} 
        className={classes.item}
        href={ myAccountURL }
        rel="noopener">Go to My Account</Button> }
      <Button
        variant={'outlined'}
        className={classes.item}
        color={'secondary'}
        onClick={handleLogout}
      >
        Sign Out
      </Button>
    </Popover>
  )
}

export default NdexUserInfoPopover
