import React, { useState, useContext } from 'react'

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

import { makeStyles } from '@material-ui/styles'

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
    'padding-top': '0.8em',
    'padding-bottom': '0em'
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

const LargeNetworkDialog = props => {
  const classes = useStyles()

  const {
    isOpen,
    setIsOpen,
    importNetworkFunction
  } = props

  return (
    <Dialog className={classes.root} open={isOpen}>
      <DialogTitle disableTypography={true} className={classes.title}>
        <Typography variant={'subtitle1'}>Open Large Network in Cytoscape</Typography>
      </DialogTitle>

      <DialogContent className={classes.content}>
        Preamble and choices.

      </DialogContent>
      <Divider />
      <DialogActions className={classes.actionPanel}>
        <Button
          variant={'contained'}
          disabled={true}
          onClick={() => {
            setDialogState(false);
            importNetworkFunction();
          }}
          color={'default'}
        >
          Import
        </Button>
        <Button
          variant={'contained'}
          onClick={() => {
            setIsOpen(false);
          }}
          color={'default'}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LargeNetworkDialog
