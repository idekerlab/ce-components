import React, { FC } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Toolbar from '@mui/material/Toolbar'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel'
import UpdateIcon from '@mui/icons-material/Check'
import CompletenessBar from './CompletenessBar'
import { Box } from '@mui/system'
import CommonFields from './CommonFields'

import { blue } from '@mui/material/colors';



import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

const NetworkPropEditor: FC<{
  open: boolean
  setOpen: (open: boolean) => void
}> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog fullWidth maxWidth="xl" open={open} onClose={handleClose}>
      <DialogContent
        sx={{
          p: 0,
          m: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ p: 1, flexGrow: 1, overflowY: 'auto' }}>
          <Box sx={{ mt: 0 }}>
            <CommonFields />
          </Box>
          <Box
            sx={{
              mt: 2,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Fab size="small" color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Box>
        </Box>

        {/* <Paper  elevation={2}> */}
          <Toolbar sx={{backgroundColor: blue[700], color: 'white'}}>
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
        {/* </Paper> */}
      </DialogContent>
    </Dialog>
  )
}

export default NetworkPropEditor
