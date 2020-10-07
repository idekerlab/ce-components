import React, { useContext } from 'react'
import { Avatar, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NDExAccountContext } from '../NDExAccountContext'
import { getUserByEmail } from '../api/ndex'

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

  const signUpAction = () => {
    getUserByEmail(ndexServerURL, 'v2',  'dotasek.dev@gmail.com').then((response)=> {
      console.log('Response body: ', response.parsedBody)
    });
  }

  return (
    <div className={classes.signInHeader}>
     
      <Typography variant={'subtitle1'} className={classes.item}>
        Step right up!
      </Typography>
      <Button onClick={ signUpAction }>Sign Up</Button>
    </div>
  )
}

export default NdexSignUpPanel
