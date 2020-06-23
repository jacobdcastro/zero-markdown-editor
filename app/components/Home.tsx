import React from 'react';
import { RichEditor, PreviewEditor, RawEditor } from './EditorViews';
import Editor from './styled/Editor';
import FileSidebar from './FileTreeView/FileSidebar';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Home = () => {
  const mode = useSelector(state => state.editor.mode);

  const displayEditorView = () => {
    if (mode === 'rich') return <RichEditor />;
    if (mode === 'preview') return <PreviewEditor />;
    if (mode === 'raw') return <RawEditor />;
    return <RichEditor />;
  };

  return (
    <HomeWrapper>
      <FileSidebar />
      <Editor data-tid="container" id="editor-container">
        {/* {displayEditorView()} */}
        <RawEditor />
      </Editor>
    </HomeWrapper>
  );
};

export default Home;
