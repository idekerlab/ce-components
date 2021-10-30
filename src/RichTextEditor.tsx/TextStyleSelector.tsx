import React, { FC, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ReactElement } from 'react-transition-group/node_modules/@types/react'
import { styled } from '@mui/material/styles'


const BLOCK_TYPES = {
  h1: { label: 'H1', style: 'header-one' },
  h2: { label: 'H2', style: 'header-two' },
  h3: { label: 'H3', style: 'header-three' },
  h4: { label: 'H4', style: 'header-four' },
  h5: { label: 'H5', style: 'header-five' },
  h6: { label: 'H6', style: 'header-six' },
}


const StyledSelector = styled(Select)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const TextStyleSelector: FC<{
  handleBlock: (e: any, target: string) => void
}> = ({ handleBlock }): ReactElement => {
  const [textStyle, setTextStyle] = useState('normal')

  const handleChange = (event: SelectChangeEvent) => {
    const newStyle: string = event.target.value
    setTextStyle(newStyle)
    handleBlock(event, BLOCK_TYPES[newStyle].style)
  }

  return (
    <FormControl variant={'standard'} sx={{height: '1.5em'}} fullWidth>
      <Select
        labelId="style-select-label"
        id="style-select"
        value={textStyle}
        onChange={handleChange}
        sx={{height: '1.5em'}}
      >
        <MenuItem value={'normal'}>-</MenuItem>
        <MenuItem value={'h1'}>H1</MenuItem>
        <MenuItem value={'h2'}>H2</MenuItem>
        <MenuItem value={'h3'}>H3</MenuItem>
        <MenuItem value={'h4'}>H4</MenuItem>
        <MenuItem value={'h6'}>H5</MenuItem>
        <MenuItem value={'h6'}>H6</MenuItem>
      </Select>
    </FormControl>
  )
}

export default TextStyleSelector
