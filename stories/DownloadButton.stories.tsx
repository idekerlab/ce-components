import React from 'react'
import { DownloadButton, DownloadProps } from '../src/DownloadButton'

import { withKnobs, object, text } from '@storybook/addon-knobs'

export default {
  title: 'JSON Download Button',
  component: DownloadButton,
  decorators: [withKnobs],
}

const sampleData = {
  data: {
    name: 'Empty sample',
  },
  elements: {
    nodes: [],
    edges: [],
  },
}

export const Disabled = (props?: Partial<DownloadProps>) => (
  <DownloadButton {...props} />
)
export const Enabled = () => (
  <DownloadButton
    tooltip={text('tooltip', 'Download CX data')}
    data={object('data', sampleData)}
    fileName={text('fileName', 'download-sample.json')}
  />
)
