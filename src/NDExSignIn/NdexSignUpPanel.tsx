import React, { useState, useContext } from 'react'
import { Button, TextField, FormControlLabel, Checkbox, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NDExAccountContext } from '../NDExAccountContext'
import { isValidEmail, useCreateUser } from '../api/ndex'
import { validateLogin } from './validateCredentials'
import NDExUserModel from '../model/NDExUserModel'

const useStyles = makeStyles({
  signUpHeader: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.2em',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    alignSelf: 'normal',
    marginRight: '1em',
    marginLeft: '1em'
  },
  leftItem: {
    paddingRight: '1em',
  },
  rightItem: {
    paddingRight: '0em'
  },
  lastItem: {
    alignSelf: 'flex-end'
  }
})

const NdexSignUpPanel = props => {
  const classes = useStyles()

  const { handleCredentialsSignOn } = props

  const { ndexServerURL } = useContext(NDExAccountContext);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [readAgreement, setReadAgreement] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>();

  const {
    isLoading,
    error,
    //data,
    execute
  } = useCreateUser(ndexServerURL);

  const loginAfterCreate = (username: string, password: string) => {
    
    setErrorMessage(undefined)

    validateLogin(username, password, ndexServerURL).then(data => {
      console.log('returned Validation:', data)

      setTimeout(() => {

        if (data.error !== null) {
          setErrorMessage(data.error.message)
        } else {
          handleCredentialsSignOn({
            username,
            password,
            ndexServerURL,
            fullName: data.userData.firstName + ' ' + data.userData.lastName,
            image: data.userData.image,
            details: data.userData
          })
        }
      }, 500)
    })
  }

  const validate = () => {
    setErrorMessage(undefined)

    if (firstName.length < 1
      || lastName.length < 1
      || userName.length < 1
      || emailAddress.length < 1
      || password.length < 1
      || confirmPassword.length < 1) {
      setErrorMessage('Please fill out all fields.')
      return false
    }

    if (!isValidEmail(emailAddress)) {
      setErrorMessage('Please enter a valid email.')
      return false
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false
    }

    if (password.length < 8) {
      setErrorMessage('Password must be a minimum of 8 characters')
      return false
    }

    if (!readAgreement) {
      setErrorMessage('Please read and sign the Terms & Conditions');
      return false
    }
    return true
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'firstName': setFirstName(event.target.value); break;
      case 'lastName': setLastName(event.target.value); break;
      case 'userName': setUserName(event.target.value); break;
      case 'emailAddress': setEmailAddress(event.target.value); break;
      case 'password': setPassword(event.target.value); break;
      case 'confirmPassword': setConfirmPassword(event.target.value); break;
      case 'readAgreement': setReadAgreement(event.target.checked); break;
    }
  }

  const signUpAction = () => {
    if (validate()) {
      const user : NDExUserModel = {
        userName,
        firstName,
        lastName,
        emailAddress,
        password
      }
      execute(user).then(() => { loginAfterCreate(user.userName, user.password)});
    }
  }

  return (
    <div className={classes.signUpHeader}>
      <div className={classes.item}>
        <TextField name="firstName" label='First Name' value={firstName} onChange={handleChange} className={classes.leftItem} />
        <TextField name="lastName" label='Last Name' value={lastName} onChange={handleChange} className={classes.rightItem} />
      </div>
      <TextField name="userName" label='Username' value={userName} onChange={handleChange} className={classes.item} />
      <TextField name="emailAddress" label='E-Mail Address' value={emailAddress} onChange={handleChange} className={classes.item} />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={handleChange}
        autoComplete="current-password"
        className={classes.item}
      />
      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={handleChange}
        autoComplete="current-password"
        className={classes.item}
      />

      <FormControlLabel
        className={classes.item}
        control={
          <Checkbox
            checked={readAgreement}
            onChange={handleChange}
            name="readAgreement"
            color="secondary"
          />
        }
        label={(<Typography variant={'body1'}>
          I have read and accept the{' '}
          <a href="https://home.ndexbio.org/disclaimer-license/" target="_blank">Terms &amp; Conditions</a>
        </Typography>)}
      />
      { errorMessage || error && <Typography>{errorMessage ? errorMessage : error}</Typography>}
      <Button onClick={signUpAction} className={classes.lastItem}
       disabled = { isLoading }
      >Sign Up</Button>
    </div>
  )
}

export default NdexSignUpPanel
