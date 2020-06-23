import React from 'react';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { Pre, Line, LineNo, LineContent } from '../../styled/RawEditor';

interface CodeProps {
  md: string;
}

const HightlightedCode = ({ md }: CodeProps) => {
  return (
    <Highlight {...defaultProps} code={md} language="markdown">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};

interface EditorProps {
  md: string;
  setMd: Function;
}

const ReactSimpleEditor = ({ md, setMd }: EditorProps) => {
  if (md) {
    return (
      <Editor
        value={md}
        onValueChange={(markdown: string) => setMd(markdown)}
        highlight={(markdown: string) => (
          <HightlightedCode md={markdown.trim()} />
        )}
        padding={25}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 20
        }}
      />
    );
  } else {
    return null;
  }
};

export default ReactSimpleEditor;
