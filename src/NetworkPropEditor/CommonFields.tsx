import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { Divider, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import RichTextEditor from '../RichTextEditor.tsx'

// const LONG_FIELD = {
//   '& .MuiTextField-root': { m: 1, width: '35ch' },
// }

const LONG_FIELD = { m: 1, flexGrow: 1 }
const SHORT_FIELD = { m: 1, width: '15ch' }
const ROW = { display: 'flex', flexDirection: 'row' }

const CommonFields = () => {
  const _handleChange = (event: SelectChangeEvent) => {}
  return (
    <Box sx={{ pr: 1, pl: 1 }} component="form" noValidate autoComplete="off">
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          sx={LONG_FIELD}
          required
          id="outlined-required"
          label="Name"
          defaultValue="Network Name"
          autoComplete="off"
        />
        <TextField
          required
          id="outlined-disabled"
          label="Version"
          defaultValue="2.0.1"
          sx={SHORT_FIELD}
        />

        <FormControl sx={SHORT_FIELD}>
          <InputLabel id="demo-simple-select-label">Visibility</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={'public'}
            label="Visibility"
            onChange={_handleChange}
          >
            <MenuItem value={'public'}>Public</MenuItem>
            <MenuItem value={'public-s'}>Public (Not searchable)</MenuItem>
            <MenuItem value={'private'}>Private</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ m: 1, mt: 0, pt: 0, flexGrow: 1 }}>
          <Typography variant="body1">Description</Typography>
          <RichTextEditor readOnly={false} data={'This is a test'} />
        </Box>

        <Box sx={{ m: 1, mt: 0, pt: 0, flexGrow: 1 }}>
          <Typography variant="body1">Reference</Typography>
          <RichTextEditor readOnly={false} data={'This is a test'} />
        </Box>
      </Box>

      <Divider sx={{ mt: 1, mb: 1 }} />

      <Box sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
        <TextField
          sx={{ flexGrow: 1, mr: 1 }}
          id="outlined-required"
          label="Optional 1"
          defaultValue="Optional 1"
          autoComplete="off"
        />
        <TextField
          sx={{ flexGrow: 1 }}
          id="outlined-disabled"
          label="Optional 2"
          defaultValue="Optional 2"
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
        <TextField
          sx={{ flexGrow: 1, mr: 1 }}
          id="outlined-required"
          label="Optional 1"
          defaultValue="Optional 1"
          autoComplete="off"
        />
        <TextField
          sx={{ flexGrow: 1 }}
          id="outlined-disabled"
          label="Optional 2"
          defaultValue="Optional 2"
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
        <TextField
          sx={{ flexGrow: 1, mr: 1 }}
          id="outlined-required"
          label="Optional 1"
          defaultValue="Optional 1"
          autoComplete="off"
        />
        <TextField
          sx={{ flexGrow: 1 }}
          id="outlined-disabled"
          label="Optional 2"
          defaultValue="Optional 2"
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 1 }}>
        <TextField
          sx={{ flexGrow: 1, mr: 1 }}
          id="outlined-required"
          label="Optional 1"
          defaultValue="Optional 1"
          autoComplete="off"
        />
        <TextField
          sx={{ flexGrow: 1 }}
          id="outlined-disabled"
          label="Optional 2"
          defaultValue="Optional 2"
        />
      </Box>
    </Box>
  )
}

export default CommonFields
