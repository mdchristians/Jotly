/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
import React, { useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import Element from './components/Element';
import Leaf from './components/Leaf';
import HoverToolbar from './components/HoverToolbar';
import { toggleMark, toggleFormat } from './utils';
import { HOTKEYS } from './constants';

const Editor = ({editorValue, setEditorValue}) => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  // eslint-disable-next-line consistent-return
  const hoverSelectionHandler = e => {
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

  return (
    <Slate editor={editor} value={editorValue} onChange={value => setEditorValue(value)}>
      <HoverToolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="What's on your mind?"
        autoFocus
        onDOMBeforeInput={hoverSelectionHandler}
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

export default Editor;