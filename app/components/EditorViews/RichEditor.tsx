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

const RichEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const activeFile = useSelector(state => state.activeFile);
  const editorMode = useSelector(state => state.editor.mode);
  const dispatch = useDispatch();
  const { setMd } = useContext(MarkdownContext);

  useEffect(() => {
    setEditorState(convertMdToDraft(activeFile));
    setMd(activeFile.content);
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
      const mdString = convertDraftToMd(newState);
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
          readonly={false}
        />
      </div>
    </div>
  );
};

export default RichEditor;
