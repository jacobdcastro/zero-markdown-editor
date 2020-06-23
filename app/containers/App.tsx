import React, { ReactNode, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';
import { SAVE_FILE } from '../redux/actions/actionTypes';
import { saveFile } from '../redux/actions/filesystem';
import { MarkdownContext } from './MarkdownContext';
import { EditorMode } from '../constants/types';
import { changeEditorMode } from '../redux/actions/editor';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const state = useSelector(state => state);
  const { md, setMd } = useContext(MarkdownContext);
  const dispatch = useDispatch();

  useEffect(() => {
    // ipcRenderer listeners from menu.ts
    ipcRenderer.on(SAVE_FILE, () => {
      if (state.activeFile.path && md) {
        dispatch(saveFile(state.activeFile.path, md));
      }
    });

    ipcRenderer.on('CHANGE_MODE', (event, mode: EditorMode) => {
      if (state.editor.mode === mode) return;
      dispatch(changeEditorMode(mode));
    });

    return () => {
      ipcRenderer.removeAllListeners(SAVE_FILE);
      ipcRenderer.removeAllListeners('CHANGE_MODE');
    };
  }, [md]);

  return <>{children}</>;
}
