import React, { FC, ReactElement } from 'react'
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js'
import TextAlignmentButtons from './TextAlignmentButtons'
import TextStyleSelector from './TextStyleSelector'

import Box from '@mui/material/Box'

const ToolBar: FC<{
  editorState: EditorState
  setEditorState: (editorState: EditorState) => void
}> = ({ editorState, setEditorState }): ReactElement => {
  const handleInsertImage = () => {
    const src = prompt('Please enter the URL of your picture')
    if (!src) {
      return
    }
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })
    return setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    )
  }

  

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        p: 0,
      }}
    >
      <TextAlignmentButtons
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </Box>
  )
}

export default ToolBar
