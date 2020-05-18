import React, { ReactNode, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';
import { SAVE_FILE } from '../redux/actions/actionTypes';
import { saveFile } from '../redux/actions/filesystem';
import { MarkdownContext } from './MarkdownContext';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const state = useSelector(state => state);
  const { md, setMd } = useContext(MarkdownContext);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(md);
    // ipcRenderer listeners from menu.ts
    ipcRenderer.on(SAVE_FILE, () => {
      if (state.activeFile.path && md) {
        // dispatch(saveFile(state.activeFile.path, md));
        console.log('ipcRenderer:', state.activeFile.path, md);
      }
    });
  }, [md]);

  return <>{children}</>;
}

// TODO ipcRenderer running 4+ times on event??? why tf
