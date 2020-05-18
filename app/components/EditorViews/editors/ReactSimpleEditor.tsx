import React, { useContext } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { MarkdownContext } from '../../../containers/MarkdownContext';

const ReactSimpleEditor = () => {
  const { md, setMd } = useContext(MarkdownContext);
  return (
    <Editor
      value={md}
      onValueChange={(code: string) => setMd(code)}
      highlight={(code: string) => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12
      }}
    />
  );
};

export default ReactSimpleEditor;
