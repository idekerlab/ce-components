import React, { useContext, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NDExAccountContext } from '../contexts/NDExAccountContext'
import { useResetPassword } from '../api/ndex'

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


const ForgotPasswordPanel = () => {
  const classes = useStyles()

  const { ndexServerURL } = useContext(NDExAccountContext);

  const [email, setEmail] = useState('');

  const {
    isLoading,
    error,
    data,
    execute
  } = useResetPassword(ndexServerURL);

  
  const handleEmailChange = (evt) => {
    const email: string = evt.target.value
    setEmail(email)
  }

  const handleResetPassword = () => {
    execute(email)
  }

  return (
    <div className={classes.signInHeader}>
      <TextField
        error={email.trim().length < 0}
        helperText={error ? error : data ? 'Sent a new password to e-mail of record': undefined }
        name="id"
        type="text"
        placeholder=""
        required
        label='Account Name or E-Mail'
        autoComplete="username"
        value={email}
        onChange={handleEmailChange}
      />
      <Button
        variant={'contained'}
        disabled={email.trim().length < 1 || isLoading}
        onClick={handleResetPassword} >Reset Password</Button>
    </div>
  )
}

export default ForgotPasswordPanel
