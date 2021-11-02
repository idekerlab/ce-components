import React, { FC, ReactElement, useState } from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  convertToRaw,
  // convertFromRaw,
} from 'draft-js'
// import { linkDecorator } from './Link'
import { mediaBlockRenderer } from './Media'

import ToolBar from './ToolBar'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import './styles.css'

const TEXT_EDITOR_ITEM = 'draft-js-example-item'
const DEFAULT_TEXT = 'This is a prototype of RTE'

export interface RichTextEditorProps {
  data?: string
  readOnly?: boolean
}

const RichTextEditor: FC<RichTextEditorProps> = (
  props: RichTextEditorProps
): ReactElement => {
  const { data = DEFAULT_TEXT, readOnly = false } = props

  console.log(data)

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  // const initialState = data
  //   ? EditorState.createWithContent(
  //       convertFromRaw(JSON.parse(data)),
  //       linkDecorator
  //     )
  //   : EditorState.createEmpty(linkDecorator)

  // const [editorState, setEditorState] = useState<EditorState>(initialState)

  // const handleSave = () => {
  //   const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  //   localStorage.setItem(TEXT_EDITOR_ITEM, data)
  // }

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '20em', p: 0, m: 0 }}>
      <Box>
        <ToolBar editorState={editorState} setEditorState={setEditorState} />
      </Box>
      <Box sx={{height: '100%'}}>
        <Editor
          readOnly={readOnly}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          blockRendererFn={mediaBlockRenderer}
        />
      </Box>
    </Box>
  )
}

export default RichTextEditor
