import React, { FC, ReactElement } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses,
} from '@mui/material/LinearProgress'

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorSecondary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}))

const BarLabel = (
  props: LinearProgressProps & { value: number }
): ReactElement => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{flexGrow: 1, mr: 1 }}>
        <CustomLinearProgress variant="determinate" {...props} />
      </Box>
      <Box>
        <Typography variant="body2" color="inherit">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

const CompletenessBar: FC<{ percentComplete: number }> = ({
  percentComplete,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <BarLabel value={percentComplete} />
    </Box>
  )
}

export default CompletenessBar
