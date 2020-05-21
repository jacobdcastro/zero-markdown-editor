import React, { useState, useEffect, useCallback, useContext } from 'react';
import { MarkdownContext } from '../../containers/MarkdownContext';
import { BlockStyleControls, InlineStyleControls } from './EditorControls';
import { EditorState, RichUtils } from 'draft-js';
import { useSelector, useDispatch } from 'react-redux';
import { makeEdits } from '../../redux/actions/activeFile';
import contentHasChanged from '../../helpers/contentHasChanged';
import DraftEditor from './editors/DraftEditor';
import {
  convertMdToDraft,
  convertDraftToMd
} from '../../helpers/mdDraftConversion';
import { checkForShortcut } from '../../helpers/mdShortcut';
import { handleFocus } from '../../redux/actions/editor';
import { RETURN_BEHAVIOR_BLOCK_TYPES } from '../../constants/editorTypes';

// Component
const RichEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const activeFile = useSelector(state => state.activeFile);
  const editor = useSelector(state => state.editor);
  const dispatch = useDispatch();
  const { setMd } = useContext(MarkdownContext);

  // rerenders Draft Editor when new file is selected
  useEffect(() => {
    setEditorState(convertMdToDraft(activeFile));
    setMd(activeFile.content);
  }, [activeFile.id]);

  // checks for 'return' keypress to prevent unwanted styles
  useEffect(() => {
    const content = editorState.getCurrentContent();
    if (content) {
      const selectedBlockKey = editorState.getSelection().getStartKey();
      const beforeBlock = content.getBlockBefore(selectedBlockKey);
      const beforeBlockType = beforeBlock ? beforeBlock.getType() : '';
      const changeType = editorState.getLastChangeType();
      if (changeType === 'split-block') {
        if (RETURN_BEHAVIOR_BLOCK_TYPES.includes(beforeBlockType))
          setEditorState(RichUtils.toggleBlockType(editorState, 'unstyled'));
      }
    }
  }, [editorState.getCurrentContent()]);

  const _toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const _toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleOnChange = useCallback(
    (newState: EditorState) => {
      setEditorState(checkForShortcut(newState));
      const mdString = convertDraftToMd(checkForShortcut(newState));
      setMd(mdString);
      if (
        contentHasChanged(mdString, activeFile) &&
        !activeFile.hasUnsavedEdits
      ) {
        dispatch(makeEdits());
      }
    },
    [dispatch, activeFile, editorState]
  );

  const _handleOnFocus = () => dispatch(handleFocus(true));

  const _handleOnUnfocus = () => dispatch(handleFocus(false));

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
          onFocus={_handleOnFocus}
          onBlur={_handleOnUnfocus}
          readonly={false}
        />
      </div>
    </div>
  );
};

export default RichEditor;
