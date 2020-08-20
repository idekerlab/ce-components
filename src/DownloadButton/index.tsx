import React, { FC } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Tooltip } from '@material-ui/core'
import DownloadIcon from '@material-ui/icons/CloudDownload'

export type DownloadProps = {
  data?: object
  tooltip?: string
  fileName?: string
}

const DEF_FILENAME = 'ce-data.json'

export const DownloadButton: FC<DownloadProps> = ({
  data,
  tooltip = 'Download data as JSON',
  fileName = DEF_FILENAME
}: DownloadProps) => {
  let disabled = true
  if (data !== undefined) {
    disabled = false
  }

  const exportCx = (content, fileName, contentType) => {
    const a = document.createElement('a')
    const file = new Blob([content], { type: contentType })
    a.href = URL.createObjectURL(file)
    a.download = fileName
    a.click()
  }

  const handleClick = () => {
    exportCx(JSON.stringify(data), fileName, 'application/json')
  }

  
  return (
    <Tooltip title={tooltip} placement={'top'}>
      <IconButton disabled={disabled} onClick={handleClick}>
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  )
}

