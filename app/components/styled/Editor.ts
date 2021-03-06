import styled from 'styled-components';

const Editor = styled.div`
  position: relative;
  height: 100vh;
  font-family: 'Helvetica', 'Arial', sans-serif;
  width: 100%;

  .RichEditor-root {
    margin: 35px 225px 75px;
  }

  .content-block {
    margin-bottom: 21px;
  }

  input,
  textarea {
    line-height: 1.4;
    background: #eee;
  }

  p {
    margin: 0;
  }

  pre {
    padding: 10px;
    background-color: #eee;
    white-space: pre-wrap;
  }

  :not(pre) > code {
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
  }

  img {
    max-width: 100%;
    max-height: 20em;
  }

  blockquote {
    border-left: 2px solid #ddd;
    margin-left: 0;
    margin-right: 0;
    padding-left: 10px;
    color: #aaa;
    font-style: italic;
  }

  blockquote[dir='rtl'] {
    border-left: none;
    padding-left: 0;
    padding-right: 10px;
    border-right: 2px solid #ddd;
  }

  table {
    border-collapse: collapse;
  }

  td {
    padding: 10px;
    border: 2px solid #ddd;
  }

  input {
    box-sizing: border-box;
    font-size: 0.85em;
    width: 100%;
    padding: 0.5em;
    border: 2px solid #ddd;
    background: #fafafa;
  }

  input:focus {
    outline: 0;
    border-color: blue;
  }

  #placeholder-6ig32 {
    color: red;
  }

  .RichEditor-editor {
    margin: 20px 10px;
  }
`;

export default Editor;
