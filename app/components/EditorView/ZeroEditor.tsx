import React, { useState, useEffect, useCallback } from 'react';
import { BlockStyleControls, InlineStyleControls } from './EditorControls';
import {
  EditorState,
  RichUtils,
  convertFromRaw,
  ContentBlock,
  DraftHandleValue
} from 'draft-js';
import { useSelector, useDispatch } from 'react-redux';
import { markdownToDraft } from 'markdown-draft-js';
import { makeEdits } from '../../redux/actions/activeFile';
import contentHasChanged from '../../helpers/contentHasChanged';
import DraftEditor from './DraftEditor';

const ZeroEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const activeFile = useSelector(state => state.activeFile);
  const dispatch = useDispatch();

  useEffect(() => {
    const rawDraftObj = markdownToDraft(activeFile.content);
    const contentState = convertFromRaw(rawDraftObj);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }, [activeFile.id]);

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

  const handleOnChange = useCallback(
    (newState: EditorState) => {
      setEditorState(newState);
      if (
        contentHasChanged(newState, activeFile) &&
        !activeFile.hasUnsavedEdits
      ) {
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
          editorState={editorState}
          onChange={handleOnChange}
          activeFile={activeFile}
        />
      </div>
    </div>
  );
};

export default ZeroEditor;
