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


const ForgotPasswordPanel = () => {
  const classes = useStyles()

  const { ndexServerURL } = useContext(NDExAccountContext);

  const [email, setEmail] = useState('');
  
  //const [resetError, setResetError] = useState(null);

  const handleEmailChange = (evt) => {
    const email: string = evt.target.value
    setEmail(email)
  }

  const handleResetPassword = () => {
    resetPassword(ndexServerURL, 'v2', email).then((result) => {
      console.log("success reset: " + result)
    }).catch((error) => {
      console.log("failed reset: " + error);
    })
  }

  return (
    <div className={classes.signInHeader}>
      <TextField
        error={email.trim().length < 0}
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
        disabled={email.trim().length < 1}
        onClick={handleResetPassword} >Reset Password</Button>
    </div>
  )
}

export default ForgotPasswordPanel
