import React, { useContext, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NDExAccountContext } from '../NDExAccountContext'
import { resetPassword } from '../api/ndex'

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

const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ForgotPasswordPanel = () => {
  const classes = useStyles()

  const { ndexServerURL } = useContext(NDExAccountContext);

  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValid] = useState<boolean>(false);

  const handleEmailChange = (evt) => {
    const email: string = evt.target.value
    setEmail(email)
    if (emailRE.test(String(email).toLowerCase())) {
      setEmailValid(true)
    } else {
      setEmailValid(false)
    }
  }

  const handleResetPassword = () => {
    resetPassword(ndexServerURL, 'v2', email)
  }

  return (
    <div className={classes.signInHeader}>
      <TextField
        error={!isEmailValid && email.trim().length > 0}
        helperText={'Account Name or E-Mail'}
        name="id"
        type="text"
        placeholder=""
        required
        title=""
        autoComplete="username"
        value={email}
        onChange={handleEmailChange}
      />
      <Button
        variant={'contained'}
        disabled={!isEmailValid && email.trim().length > 0}
        onClick={handleResetPassword} >Reset Password</Button>
    </div>
  )
}

export default ForgotPasswordPanel
