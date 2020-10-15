import React, { useContext, useState } from 'react'
import { Button, Typography, FormControlLabel, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NDExAccountContext } from '../NDExAccountContext'


const useStyles = makeStyles({
  signInHeader: {
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
  lastItem: {
    alignSelf: 'flex-end'
  }
})


const TermsAndConditionsPanel = (props) => {

  const { oauth, onGoogleAgreement } = props

  const classes = useStyles()

  const { ndexServerURL } = useContext(NDExAccountContext);

  console.log('terms and condition ndexServerUrl' + ndexServerURL)

  const [ readAgreement, setReadAgreement ] = useState(false);

  const handleChange = (event) => {
    console.log('set agreement to checked');
    setReadAgreement(event.target.checked)
  }

 const agreeAction = (event) => {
  console.log('agreeAction', event)
  onGoogleAgreement(oauth);
 }

  return (
    <div className={classes.signInHeader}>
      <Typography className={classes.item}>
        No account was found in NDEx for the selected email address, so we are creating one for you.
      </Typography>
      <Typography className={classes.item}>
        Please review and accept our Terms and Conditions and then click the 'Sign Up' button to complete your registration.
      </Typography>
      <FormControlLabel
        className={classes.item}
        control={
          <Checkbox
            checked={readAgreement}
            onChange={handleChange}
            name="readAgreement"
            color="primary"
          />
        }
        label={(<Typography variant={'body1'}>
          I have read and accept the{' '}
          <a href="https://home.ndexbio.org/disclaimer-license/" target="_blank">Terms &amp; Conditions</a>
        </Typography>)}
      />
       <Button onClick={agreeAction} 
        disabled={ !readAgreement }
        className={classes.lastItem}
      >Sign Up</Button>
    </div>
  )
}

export default TermsAndConditionsPanel
