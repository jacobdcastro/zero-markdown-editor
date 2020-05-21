import React from 'react';
import { EditorState } from 'draft-js';
import EditorControlButton from '../styled/EditorControlButton';
import { BLOCK_TYPES, INLINE_STYLES } from '../../constants/editorTypes';

const StyleButton = (props: any) => {
  const onToggle = (e: MouseEvent) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <EditorControlButton
      className={className}
      onClick={(e: MouseEvent) => onToggle(e)}
    >
      {props.label}
    </EditorControlButton>
  );
};

export const BlockStyleControls = (props: {
  editorState: EditorState;
  onToggle: Function;
}) => {
  const { editorState } = props;
  const selection = editorState.getSelection().getStartKey();
  const selectedBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection)
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === selectedBlockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export const InlineStyleControls = (props: {
  editorState: EditorState;
  onToggle: Function;
}) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
