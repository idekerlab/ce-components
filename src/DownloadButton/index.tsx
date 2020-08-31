import React, { FC } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Tooltip } from '@material-ui/core'
import DownloadIcon from '@material-ui/icons/CloudDownload'

export interface DownloadProps {
  data?: object
  tooltip?: string
  fileName?: string
}

const DEF_FILENAME = 'ce-data.json'
const CONTENT_TYPE = 'application/json'

export const DownloadButton: FC<DownloadProps> = ({
  data,
  tooltip = 'Download as JSON',
  fileName = DEF_FILENAME,
}: DownloadProps) => {
  let disabled = true
  if (data !== undefined) {
    disabled = false
  }

  const handleClick = () => {
    const content = JSON.stringify(data)
    const a = document.createElement('a')
    const file = new Blob([content], { type: CONTENT_TYPE })
    a.href = URL.createObjectURL(file)
    a.download = fileName
    a.click()
  }

  if (disabled) {
    return (
      <IconButton disabled={disabled} onClick={handleClick}>
        <DownloadIcon />
      </IconButton>
    )
  }

  return (
    <Tooltip title={tooltip} placement={'top'}>
      <IconButton disabled={disabled} onClick={handleClick}>
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  )
}
