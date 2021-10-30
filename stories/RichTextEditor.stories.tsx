import React from 'react'
import RichTextEditor from '../src/RichTextEditor.tsx'

import { withKnobs } from '@storybook/addon-knobs'

export default {
  title: 'Rich Text Editor',
  component: RichTextEditor,
  decorators: [withKnobs],
}

export const Enabled = () => (
  <RichTextEditor readOnly={false} data={'This is a test'} />
)
