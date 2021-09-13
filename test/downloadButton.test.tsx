import React from 'react'
import * as ReactDOM from 'react-dom'
import { Disabled, Enabled } from '../stories/DownloadButton.stories'

//TODO: add REAL tests based on stories
describe('Download Button', () => {
  it('renders disabled button', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Disabled />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  it('renders enabled button', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Enabled />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
