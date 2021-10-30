import React, { FC } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel'
import UpdateIcon from '@mui/icons-material/Check'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import CompletenessBar from './CompletenessBar'
import { Box } from '@mui/system'
import CommonFields from './CommonFields'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const NetworkPropEditor: FC<{
  open: boolean
  setOpen: (open: boolean) => void
}> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar color="default" sx={{ position: 'fixed' }}>
        <Toolbar color="secondary">
          <Typography
            noWrap
            variant="body1"
            component="div"
            sx={{ minWidth: '12em' }}
          >
            Edit Network Properties
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', mr: 1 }}
          >
            <Box sx={{ mr: 1 }}>
              <Typography
                variant="body2"
                component="div"
                sx={{ textAlign: 'left' }}
              >
                NDEx Score:
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <CompletenessBar percentComplete={80} />
            </Box>
          </Box>

          <Box>
            <Button
              size="small"
              color="secondary"
              variant={'contained'}
              sx={{ marginRight: '0.5em' }}
              onClick={handleClose}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant={'contained'}
              color="primary"
              onClick={handleClose}
              startIcon={<UpdateIcon />}
            >
              Update
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{mt: 10}}>
        <CommonFields />
      </Box>
    </Dialog>
  )
}

export default NetworkPropEditor
