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
  item: {
    marginRight: '1em'
  }
})

const NdexSignUpPanel = props => {
  const classes = useStyles()
  
  const {ndexServerURL } = useContext(NDExAccountContext);

  
  return (
    <div className={classes.signInHeader}>
     
      <Typography variant={'subtitle1'} className={classes.item}>
        Step right up!
      </Typography>
     
    </div>
  )
}

export default NdexSignUpPanel
