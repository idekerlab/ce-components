import React, { useContext } from 'react'
import { Avatar, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NDExAccountContext } from '../NDExAccountContext'

const useStyles = makeStyles({
  signInHeader: {
    display: 'flex',
    padding: '1.2em',
    alignItems: 'center',
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
    marginRight: '1em'
  },
  rightItem: {
    marginLeft: '1em',
    marginRight: '1em'
  }
})

const NdexUserInfoPanel = props => {
  const classes = useStyles()
  
  const {ndexServerURL, loginInfo, setLoginInfo} = useContext(NDExAccountContext);

  const { userImage, userName, onLogout, myAccountURL } = props

  return (
    <div className={classes.signInHeader}>
      <Avatar className={classes.largeAvatar} src={userImage}>
        U
      </Avatar><div className={ classes.ndexAccountGreeting }>
      <Typography variant={'subtitle1'} className={classes.item}>
        You are logged in as {userName}
      </Typography>
      { myAccountURL && 
      <Button
        variant={'outlined'} 
        href={ myAccountURL }
        rel="noopener"
        target="_blank">Go to My Account</Button> }
      </div>
      <Button
        variant={'outlined'}
        className={classes.rightItem}
        color={'secondary'}
        onClick={onLogout}
      >
        Sign Out
      </Button>
    </div>
  )
}

export default NdexUserInfoPanel
