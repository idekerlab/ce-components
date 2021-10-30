import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { Divider } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'

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

      <Divider sx={{mt: 1, mb: 1}}/>

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
    </Box>
  )
}

export default CommonFields
