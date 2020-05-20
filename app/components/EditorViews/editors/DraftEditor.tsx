import React, { memo, useEffect } from 'react';
import { Editor, EditorState, ContentBlock } from 'draft-js';
import { fsNode } from '../../../helpers/buildFilesystemObj';
import { checkForShortcut } from '../../../helpers/mdShortcut';

interface DraftEditorProps {
  editorState: EditorState;
  onChange: (newState: EditorState) => void;
  activeFile: fsNode;
  readonly: boolean;
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

const DraftEditor = memo(
  ({ editorState, onChange, readonly }: DraftEditorProps) => {
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
        onChange={onChange}
        spellCheck={true}
        readonly={readonly}
      />
    );
  }
);

export default DraftEditor;

// TODO get md shortcuts to work
// 1. If space is inserted, see if previous text matches mdShortcut[]
// 2. If there's a match, change block type and delete the selection
