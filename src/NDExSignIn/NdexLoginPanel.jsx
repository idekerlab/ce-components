import React, { useState } from 'react'

import { Paper, Divider } from '@material-ui/core'


import { makeStyles } from '@material-ui/styles'
import NdexGoogleLoginPanel from './NdexGoogleLoginPanel'
import NdexCredentialsLoginPanel from './NdexCredentialsLoginPanel'


const useStyles = makeStyles({
  root: {
    height: '19em',
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
    height: '100%',
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
    onError,
    handleError,
    error,
    ndexServer,
    googleSignIn,
    googleSSO,
    setContentMode
  } = props
  
  const [isGoogle, setIsGoogle] = useState(true)

  return (
    <div className={classes.root}>
      <Paper className={classes.leftComponent}>
        <NdexGoogleLoginPanel
          onError={onError}
          onLoginSuccess={onLoginSuccess}
          onSuccess={onSuccess}
          ndexServer={ndexServer}
          googleSignIn={googleSignIn}
          googleSSO={googleSSO}
        />
      </Paper>
      <Divider orientation="vertical" flexItem />
      <Paper className={classes.rightComponent}>
        <NdexCredentialsLoginPanel
          onLoginSuccess={onLoginSuccess}
          handleCredentialsSignOn={handleCredentialsSignOn}
          handleError={handleError}
          error={error}
          ndexServer={ndexServer}
          setContentMode={setContentMode}
        />
      </Paper>
    </div>
  )
}

export default NdexLoginPanel
