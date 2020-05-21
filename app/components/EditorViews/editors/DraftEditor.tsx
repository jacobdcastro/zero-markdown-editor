// @ts-nocheck
import React, { memo } from 'react';
import { Editor, EditorState, ContentBlock } from 'draft-js';
import { fsNode } from '../../../helpers/buildFilesystemObj';

interface DraftEditorProps {
  editorState: EditorState;
  onChange: (newState: EditorState) => void;
  activeFile?: fsNode;
  keyBindingFn?: Function;
  readonly: boolean;
  onFocus?: () => void;
  onBlur?: Function;
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
  ({
    editorState,
    onChange,
    keyBindingFn,
    readonly,
    onFocus,
    onBlur
  }: DraftEditorProps) => {
    const blockStyleFn = (contentBlock: ContentBlock) => {
      const type = contentBlock.getType();
      if (type === 'unstyled') {
        return 'content-block';
      }
      return '';
    };

    // const handleReturn = (e: any, state: EditorState) => {
    //   const newState = RichUtils.toggleBlockType(state, 'paragraph');
    //   if (newState) {
    //     onChange(newState);
    //     return 'handled';
    //   }
    //   return 'not-handled';
    // };

    return (
      <Editor
        id="draftEditor"
        editorState={editorState}
        onChange={onChange}
        blockStyleFn={blockStyleFn}
        customStyleMap={styleMap}
        spellCheck={true}
        keyBindingFn={keyBindingFn}
        onFocus={onFocus}
        onBlur={onBlur}
        // handleReturn={handleReturn}
        readonly={readonly}
      />
    );
  }
);

export default DraftEditor;

// TODO get md shortcuts to work
// 1. If space is inserted, see if previous text matches mdShortcut[]
// 2. If there's a match, change block type and delete the selection
