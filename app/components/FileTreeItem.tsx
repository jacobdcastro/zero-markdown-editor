import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import { fsNode } from '../helpers/buildFilesystemObj';

interface TreeItemProps {
  node: fsNode;
  children: ChildNode;
}

const FileTreeItem = (props: TreeItemProps) => {
  return (
    <TreeItem
      nodeId={props.node.id}
      label={props.node.name}
      onClick={() => console.log(props.node.name)}
    >
      {props.children}
    </TreeItem>
  );
};

export default FileTreeItem;
