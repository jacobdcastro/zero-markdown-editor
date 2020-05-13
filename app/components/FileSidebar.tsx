import React, { useState, useEffect } from 'react';
import FileTree from './styled/FileSidebar';
import path from 'path';
import { useDispatch, useSelector } from 'react-redux';
import { Directory, fsNode } from '../helpers/buildFilesystemObj';
import { SET_INIT_FS } from '../redux/actions/actionTypes';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FileTreeitem from './FileTreeItem';

const folderPath = path.join(
  '/',
  'Users',
  'jdcas',
  'jdc-web',
  'zero-markdown-editor',
  'data'
);

const FileSidebar = () => {
  const parentDir = useSelector(state => state.filesystem);
  const dispatch = useDispatch();

  useEffect(() => {
    let projectDir = new Directory('data', folderPath, 0);
    dispatch({ type: SET_INIT_FS, payload: projectDir });
  }, []);

  const renderTree = (node: fsNode) => (
    <FileTreeitem key={node.id} node={node}>
      {Array.isArray(node.children)
        ? node.children.map((child: fsNode) => renderTree(child))
        : null}
    </FileTreeitem>
  );

  return (
    <FileTree>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(parentDir)}
      </TreeView>
    </FileTree>
  );
};

export default FileSidebar;
