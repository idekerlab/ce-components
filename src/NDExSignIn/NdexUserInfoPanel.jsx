import React from 'react'
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
  item: {
    marginRight: '1em'
  },
  avatar: {}
})

const NdexUserInfoPanel = props => {
  const classes = useStyles()
  
  const {ndexServerURL, loginInfo, setLoginInfo} = useContext(NDExAccountContext);

  const { userImage, userName, onLogout } = props

  return (
    <div className={classes.signInHeader}>
      <Avatar className={classes.item} src={userImage}>
        U
      </Avatar>
      <Typography variant={'subtitle1'} className={classes.item}>
        You are logged in as {userName}
      </Typography>
      
      <Button
        variant={'outlined'}
        className={classes.item}
        color={'secondary'}
        onClick={onLogout}
      >
        Sign Out
      </Button>
    </div>
  )
}

export default NdexUserInfoPanel
