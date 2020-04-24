/* eslint-disable default-case */
import { Editor as SlateEditor, Transforms, Text } from 'slate'
import { LIST_TYPES } from './constants';

export const isFormatActive = (editor, format) => {
  const [match] = SlateEditor.nodes(editor, {
    match: n => n[format] === true,
    mode: 'all',
  })
  return !!match
}

export const isBlockActive = (editor, format) => {
  const [match] = SlateEditor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

export const isMarkActive = (editor, format) => {
  const marks = SlateEditor.marks(editor)
  return marks ? marks[format] === true : false
}

export const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format)
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  )
}

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    SlateEditor.removeMark(editor, format)
  } else {
    SlateEditor.addMark(editor, format, true)
  }
}

// eslint-disable-next-line consistent-return
export const hoverSelectionHandler = (e, editor) => {
  switch (e.inputType) {
    case 'bold':
      return toggleFormat(editor, 'bold')
    case 'italic':
      return toggleFormat(editor, 'italic')
    case 'underline':
      return toggleFormat(editor, 'underline')
    case 'code':
      return toggleFormat(editor, 'code')
  }
}