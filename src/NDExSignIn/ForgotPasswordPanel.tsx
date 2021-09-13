import React, { useContext, useState } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NDExAccountContext } from '../NDExAccountContext'
import { useResetPassword } from '../api/ndex'

const useStyles = makeStyles({
  root: {
    width: '100%',
    justifyContent: 'center',
  },
  textArea: {
    width: '100%',
  },
  itemRight: {
    width: '100%',
  },
})

const ForgotPasswordPanel: React.VFC<{
  onSuccessReset?: (string) => void
  onFailReset?: (any) => void
}> = ({ onSuccessReset = () => {}, onFailReset = () => {} }) => {
  const classes = useStyles()

  const { ndexServerURL } = useContext(NDExAccountContext)
  const [email, setEmail] = useState('')
  const { isLoading, error, data, execute } = useResetPassword(ndexServerURL)

  const handleEmailChange = (evt) => {
    const email: string = evt.target.value
    setEmail(email)
  }

  const handleResetPassword = () => {
    execute(email)
      .then(() => {
        onSuccessReset(email)
      })
      .catch((e) => {
        onFailReset(e)
      })
  }

  return (
    <Grid
      container
      alignItems={'center'}
      alignContent={'center'}
      className={classes.root}
      spacing={1}
    >
      <Grid item md={7}>
        <TextField
          className={classes.textArea}
          error={email.trim().length < 0}
          helperText={
            error
              ? error
              : data
              ? 'Sent a new password to e-mail of record'
              : undefined
          }
          name="id"
          type="text"
          placeholder=""
          required
          label="Account Name or E-Mail"
          autoComplete="username"
          value={email}
          onChange={handleEmailChange}
        />
      </Grid>
      <Grid item md={5}>
        <Button
          className={classes.itemRight}
          variant={'contained'}
          disabled={email.trim().length < 1 || isLoading}
          onClick={handleResetPassword}
        >
          Reset Password
        </Button>
      </Grid>
    </Grid>
  )
}

export default ForgotPasswordPanel
