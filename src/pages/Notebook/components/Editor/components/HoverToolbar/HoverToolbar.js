import React, { useRef, useEffect } from 'react'
import { useSlate, ReactEditor } from 'slate-react'
import { Editor as SlateEditor, Range } from 'slate'
import { FiBold, FiUnderline, FiCode, FiItalic } from "react-icons/fi";
import { Box, IconButton } from '@chakra-ui/core';
import Portal from '../../../../../../components/Portal';
import { isFormatActive, toggleFormat } from '../../utils';

const HoverToolbar = () => {
  const ref = useRef()
  const editor = useSlate()

  useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      SlateEditor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()
    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()
    el.style.opacity = 1
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${rect.left +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect.width / 2}px`
  })

  return (
    <Portal>
      <Box
        ref={ref}
        p="8px 7px 6px"
        position="absolute"
        zIndex="1"
        top="-10000px"
        left="-10000px"
        mt="-6px"
        opacity="0"
        bg="gray.400"
        rounded="md"
        transition="opacity 0.75s"
      >
        <FormatButton
          format="bold"
          icon={FiBold}
        />
        <FormatButton
          format="italic"
          icon={FiItalic}
        />
        <FormatButton
          format="underline"
          icon={FiUnderline}
        />
        <FormatButton
          format="code"
          icon={FiCode}
        />
      </Box>
    </Portal>
  )
}

const FormatButton = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isFormatActive(editor, format);

  return (
    <IconButton
      variant="unstyled"
      aria-label={format}
      fontSize="20px"
      isRound
      icon={icon}
      _active={{ bg: "blue.700", zIndex: 5 }}
      color={isActive ? 'green.200' : 'yellow.200'}
      active={isFormatActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleFormat(editor, format)
      }}
    />
  )
}

export default HoverToolbar;