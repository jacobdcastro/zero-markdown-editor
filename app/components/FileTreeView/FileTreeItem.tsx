import React from 'react';
import path from 'path';
import TreeItem from '@material-ui/lab/TreeItem';
import { fsNode } from '../../helpers/buildFilesystemObj';
import { useDispatch, useSelector } from 'react-redux';
import { openMdFile } from '../../redux/actions/editor';

interface TreeItemProps {
  node: fsNode;
  children: ChildNode;
}

const FileTreeItem = ({ node, children }: TreeItemProps) => {
  const dispatch = useDispatch();
  const activeFileId = useSelector(state => state.editor.id);

  const openFile = () => {
    if (activeFileId !== node.id) {
      const fileExt = path.extname(node.path);
      if (fileExt === '.md') dispatch(openMdFile(node));
      // else dispatch(/*error*/);
    }
  };

  if (node.type === 'file') {
    return (
      <TreeItem nodeId={node.id} label={node.name} onClick={openFile}>
        {children}
      </TreeItem>
    );
  } else {
    return (
      <TreeItem nodeId={node.id} label={node.name}>
        {children}
      </TreeItem>
    );
  }
};

export default FileTreeItem;
