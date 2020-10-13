import React, { useState, useContext } from 'react'
import { Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NDExAccountContext } from '../NDExAccountContext'
import { signUp } from '../api/ndex'

const useStyles = makeStyles({
  signUpHeader: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.2em',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    marginRight: '1em'
  }
})

const NdexSignUpPanel = () => {
  const classes = useStyles()

  const { ndexServerURL } = useContext(NDExAccountContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState()
  const [readAgreement, setReadAgreement] = useState();

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'firstName': setFirstName(event.target.value); break;
      case 'lastName': setLastName(event.target.value); break;
      case 'userName': setUserName(event.target.value); break;
      case 'email': setEmail(event.target.value); break;
      case 'password': setPassword(event.target.value); break;
      case 'confirmPassword': setConfirmPassword(event.target.value); break;
      case 'readAgreement': setReadAgreement(event.target.checked); break;
    }
  }

  const signUpAction = () => {
    signUp(ndexServerURL, 'v2')
  }

  return (
    <div className={classes.signUpHeader}>
      <div><TextField name="firstName" label='First Name' value={firstName} onChange={handleChange} />
      <TextField name="lastName" label='Last Name' value={lastName} onChange={handleChange} /></div>
      <TextField name="userName" label='Username' value={userName} onChange={handleChange} />
      <TextField name="email" label='E-Mail Address' value={email} onChange={handleChange} />
       <TextField
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={handleChange}
        autoComplete="current-password"
      />
       <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={handleChange}
        autoComplete="current-password"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={readAgreement}
            onChange={handleChange}
            name="readAgreement"
            color="primary"
          />
        }
        label=""
      />
      <Button onClick={signUpAction}>Sign Up</Button>
    </div>
  )
}

export default NdexSignUpPanel
