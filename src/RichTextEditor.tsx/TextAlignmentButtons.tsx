import React, { FC, MouseEvent, ReactElement } from 'react'
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatClearIcon from '@mui/icons-material/FormatClear'
import LinkIcon from '@mui/icons-material/Link'
import CodeIcon from '@mui/icons-material/Code'
import UlIcon from '@mui/icons-material/FormatListBulleted'
import LiIcon from '@mui/icons-material/FormatListNumbered'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import {
  ToggleButton,
  ToggleButtonGroup,
  ButtonGroup,
  Button,
  Box,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import TextStyleSelector from './TextStyleSelector'

const CustomButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: 0,
  },
  '& .MuiToggleButton-sizeSmall': {
    height: theme.spacing(3.8),
    width: theme.spacing(3.8),
  },
}))

const TextAlignmentButtons: FC<{
  editorState: EditorState
  setEditorState: (editorState: EditorState) => void
}> = ({ editorState, setEditorState }): ReactElement => {
  const [alignment, setAlignment] = React.useState<string | null>('left')
  const [formats, setFormats] = React.useState(() => [])

  const handleToggle = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const handleBlock = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
  }

  const handleAlignment = (
    event: MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment)
  }

  const handleTextFormat = (event, newFormats) => {
    setFormats(newFormats)
  }

  const handleAddLink = () => {
    const selection = editorState.getSelection()
    const link = prompt('Please enter the URL of your link')
    if (!link) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null))
      return
    }
    const content = editorState.getCurrentContent()
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
      url: link,
    })
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      'apply-entity'
    )
    const entityKey = contentWithEntity.getLastCreatedEntityKey()
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        m: 0,
        p: 0,
        height: '2em',
      }}
    >
      <Box sx={{ m: 0 }}>
        <CustomButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          size={'small'}
        >
          <ToggleButton value="left" aria-label="left aligned">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            <FormatAlignCenterIcon />
          </ToggleButton>
        </CustomButtonGroup>
      </Box>
      <Box sx={{ m: 0 }}>
        <CustomButtonGroup
          size="small"
          onChange={handleTextFormat}
          aria-label="text formatting"
          value={formats}
        >
          <ToggleButton
            value="bold"
            aria-label="bold"
            onMouseDown={(e) => handleToggle(e, 'BOLD')}
          >
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton
            value="italic"
            aria-label="italic"
            onMouseDown={(e) => handleToggle(e, 'ITALIC')}
          >
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton
            value="underlined"
            aria-label="underlined"
            onMouseDown={(e) => handleToggle(e, 'UNDERLINE')}
          >
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton
            value="clear"
            aria-label="clear"
            onMouseDown={(e) => handleBlock(e, 'unstyled')}
          >
            <FormatClearIcon />
          </ToggleButton>
        </CustomButtonGroup>
      </Box>

      <Box sx={{ m: 1 }}>
        <CustomButtonGroup size="small">
          <ToggleButton value="bold" aria-label="bold">
            <LiIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <UlIcon />
          </ToggleButton>
        </CustomButtonGroup>
      </Box>

      <Box sx={{ m: 1 }}>
        <CustomButtonGroup size="small">
          <ToggleButton
            value="link"
            aria-label="link"
            onMouseDown={(e) => {
              e.preventDefault()
              handleAddLink()
            }}
          >
            <LinkIcon />
          </ToggleButton>
          <ToggleButton value="code" aria-label="code">
            <CodeIcon />
          </ToggleButton>
        </CustomButtonGroup>
      </Box>

      <Box sx={{ m: 0, p: 0, minWidth: '3.5em' }}>
        <TextStyleSelector handleBlock={handleBlock} />
      </Box>
    </Box>
  )
}

export default TextAlignmentButtons
