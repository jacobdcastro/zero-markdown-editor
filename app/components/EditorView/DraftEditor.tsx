import React, { memo } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  ContentBlock,
  DraftHandleValue
} from 'draft-js';
import keyBindingFn from '../../helpers/keyBindings';
import { saveFile } from '../../redux/actions/filesystem';
import { useDispatch } from 'react-redux';
import { fsNode } from '../../helpers/buildFilesystemObj';

interface DraftEditorProps {
  editorState: EditorState;
  onChange: (newState: EditorState) => {};
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

const DraftEditor = memo(
  ({ editorState, onChange, activeFile }: DraftEditorProps) => {
    const dispatch = useDispatch();

    const blockStyleFn = (contentBlock: ContentBlock) => {
      const type = contentBlock.getType();
      if (type === 'unstyled') {
        return 'content-block';
      }
      return null;
    };

    const handleKeyCommand = (command: string): DraftHandleValue => {
      if (command === 'editor-save') {
        dispatch(saveFile(activeFile.path, editorState));
        return 'handled';
      }
      return 'not-handled';
    };

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
