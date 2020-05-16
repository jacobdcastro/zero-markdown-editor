import React, { useState, useEffect } from 'react';
import FileTree from '../styled/FileSidebar';
import path from 'path';
import { useDispatch, useSelector } from 'react-redux';
import { fsNode } from '../../helpers/buildFilesystemObj';
import { setInitFilesystem } from '../../redux/actions/filesystem';

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
    dispatch(setInitFilesystem(folderPath));
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
