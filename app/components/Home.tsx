import React from 'react';
import ZeroEditor from './EditorView/ZeroEditor';
import Editor from './styled/Editor';
import FileSidebar from './FileTreeView/FileSidebar';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <FileSidebar />
      <Editor data-tid="container" id="editor-container">
        <ZeroEditor />
      </Editor>
    </HomeWrapper>
  );
};

export default Home;
