// import * as React from 'react';
import {
  EditorState,
  RichUtils,
  ContentState,
  SelectionState,
  Modifier
} from 'draft-js';

// ? Helpers for the inline Markdown shortcuts!
const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
  '```': 'code-block'
};

export const checkForShortcut = (editorState: EditorState): EditorState => {
  var blockKey = editorState.getSelection().getAnchorKey();
  var content = editorState.getCurrentContent();
  var selectedContentBlock = content.getBlockForKey(blockKey);

  var currentText = selectedContentBlock.getText();
  const blockType = SHORTCUTS[currentText];

  if (blockType) {
    var selection = SelectionState.createEmpty(blockKey);
    const newContent = Modifier.replaceText(content, selection, '');

    return EditorState.push(
      RichUtils.toggleBlockType(editorState, blockType),
      newContent,
      blockType
    );
  }

  return editorState;
};

// const Element = ({ attributes, children, element }) => {
//   switch (element.type) {
//     case 'block-quote':
//       return <blockquote {...attributes}>{children}</blockquote>;
//     case 'bulleted-list':
//       return <ul {...attributes}>{children}</ul>;
//     case 'heading-one':
//       return <h1 {...attributes}>{children}</h1>;
//     case 'heading-two':
//       return <h2 {...attributes}>{children}</h2>;
//     case 'heading-three':
//       return <h3 {...attributes}>{children}</h3>;
//     case 'heading-four':
//       return <h4 {...attributes}>{children}</h4>;
//     case 'heading-five':
//       return <h5 {...attributes}>{children}</h5>;
//     case 'heading-six':
//       return <h6 {...attributes}>{children}</h6>;
//     case 'list-item':
//       return <li {...attributes}>{children}</li>;
//     case 'image':
//       return <img />;
//     default:
//       return <p {...attributes}>{children}</p>;
//   }
// };
