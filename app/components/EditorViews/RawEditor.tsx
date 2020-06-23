import React, { useContext, useEffect } from 'react';
import { MarkdownContext } from '../../containers/MarkdownContext';
import ReactSimpleEditor from './editors/ReactSimpleEditor';
import { useSelector } from 'react-redux';
import { RawEditorContainer } from '../styled/RawEditor';

const RawEditor = () => {
  const { md, setMd } = useContext(MarkdownContext);
  const activeFile = useSelector(state => state.activeFile);

  useEffect(() => setMd(activeFile.content), [activeFile.id]);

  return (
    <RawEditorContainer className="RawEditor-root">
      <ReactSimpleEditor md={md} setMd={setMd} />
    </RawEditorContainer>
  );
};

export default RawEditor;
