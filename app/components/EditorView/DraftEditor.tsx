import React, { memo } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  ContentBlock,
  DraftHandleValue
} from 'draft-js';

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const DraftEditor = memo(
  ({ blockStyleFn, editorState, keyBindingFn, handleKeyCommand, onChange }) => {
    return (
      <Editor
        blockStyleFn={blockStyleFn}
        customStyleMap={styleMap}
        editorState={editorState}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        spellCheck={true}
      />
    );
  }
);

export default DraftEditor;
