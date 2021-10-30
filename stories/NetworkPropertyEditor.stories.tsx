import React, { useState } from 'react'
import NetworkPropEditor from '../src/NetworkPropEditor'
import { withKnobs } from '@storybook/addon-knobs'
import { Button } from '@mui/material'

export default {
  title: 'Network Property Editor',
  component: NetworkPropEditor,
  decorators: [withKnobs],
}

export const OpenDialog = () => {
  const [open, setOpen] = useState<boolean>(false)

  const _handleClick = (): void => {
    setOpen(true)
  }

  return (
    <div>
      <Button variant="outlined" onClick={_handleClick}>
        Open NDEx Network Property Editor
      </Button>
      <NetworkPropEditor open={open} setOpen={setOpen} />
    </div>
  )
}
