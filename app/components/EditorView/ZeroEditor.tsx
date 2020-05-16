import React, { useState, useEffect, useCallback, createContext } from 'react';
import { BlockStyleControls, InlineStyleControls } from './EditorControls';
import keyBindingFn from '../../helpers/keyBindings';
import {
  EditorState,
  RichUtils,
  convertFromRaw,
  ContentBlock,
  DraftHandleValue
} from 'draft-js';
import { useSelector, useDispatch } from 'react-redux';
import { markdownToDraft } from 'markdown-draft-js';
import { makeEdits } from '../../redux/actions/editor';
import { saveFile } from '../../redux/actions/filesystem';
import contentHasChanged from '../../helpers/contentHasChanged';
import DraftEditor from './DraftEditor';

const ZeroEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const activeFile = useSelector(state => state.editor);
  const dispatch = useDispatch();

  useEffect(() => {
    const rawDraftObj = markdownToDraft(activeFile.content);
    const contentState = convertFromRaw(rawDraftObj);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }, [activeFile]);

  const _toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const _toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== 'unstyled'
    ) {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  const handleKeyCommand = (command: string): DraftHandleValue => {
    if (command === 'editor-save') {
      dispatch(saveFile(activeFile.path, editorState));
      return 'handled';
    }
    return 'not-handled';
  };

  const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === 'unstyled') {
      return 'content-block';
    }
    return null;
  };

  // ?! !WTF?!?!?!?!?!?!
  const handleOnChange = useCallback(
    (newState: EditorState) => {
      setEditorState(newState);
      if (contentHasChanged(editorState, activeFile)) {
        dispatch(makeEdits());
      }
    },
    [dispatch, activeFile, editorState]
  );

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={_toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={_toggleInlineStyle}
      />
      <div className={className} onClick={focus}>
        <DraftEditor
          blockStyleFn={blockStyleFn}
          customStyleMap={styleMap}
          editorState={editorState}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
          onChange={handleOnChange}
          spellCheck={true}
        />
      </div>
    </div>
  );
};

export default ZeroEditor;

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};
