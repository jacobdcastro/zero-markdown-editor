import React, { useState } from 'react';
import { BlockStyleControls, InlineStyleControls } from './EditorControls';
import { Editor, EditorState, RichUtils } from 'draft-js';

const ZeroEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const _toggleBlockType = blockType => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const _toggleInlineStyle = inlineStyle => {
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

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'unstyled') {
      return 'content-block';
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
        <Editor
          blockStyleFn={myBlockStyleFn}
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={newState => setEditorState(newState)}
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
