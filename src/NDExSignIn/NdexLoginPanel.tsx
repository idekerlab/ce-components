import React from 'react'

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
    minWidth: '30em',
  },
  leftComponent: {
    display: 'flex',
    height: '100%',
    alignItem: 'center',
    justifyContent: 'center',
  },
  rightComponent: {
    height: '100%',
    marginLeft: '0.6em',
    flexGrow: 2,
  },
})

const NdexLoginPanel = (props) => {
  const classes = useStyles()

  const {
    onLoginSuccess,
    onSuccess,
    handleNDExSignOn,
    onSuccessLogin,
    onError,
    handleError,
    error,
    ndexServer,
    googleSignIn,
    googleSSO,
    setContentMode,
  } = props

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
          handleNDExSignOn={handleNDExSignOn}
          onSuccessLogin={onSuccessLogin}
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
