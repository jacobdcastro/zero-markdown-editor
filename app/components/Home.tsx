import React from 'react';
import RichEditor from './EditorViews/RichEditor';
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
  console.log(mode);
  return (
    <HomeWrapper>
      <FileSidebar />
      <Editor data-tid="container" id="editor-container">
        <RichEditor />
      </Editor>
    </HomeWrapper>
  );
};

export default Home;
