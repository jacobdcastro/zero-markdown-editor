import React, { memo } from 'react';
import { Editor, EditorState, ContentBlock } from 'draft-js';
import keyBindingFn from '../../helpers/keyBindings';
import { fsNode } from '../../helpers/buildFilesystemObj';

interface DraftEditorProps {
  editorState: EditorState;
  onChange: (newState: EditorState) => void;
  activeFile: fsNode;
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const DraftEditor = memo(({ editorState, onChange }: DraftEditorProps) => {
  const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === 'unstyled') {
      return 'content-block';
    }
    return null;
  };

  return (
    <Editor
      blockStyleFn={blockStyleFn}
      customStyleMap={styleMap}
      editorState={editorState}
      keyBindingFn={keyBindingFn}
      onChange={onChange}
      spellCheck={true}
    />
  );
});

export default DraftEditor;
