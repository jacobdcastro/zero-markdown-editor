const fs = require('fs');
const path = require('path');

type fsNode = DirectoryObj | FileObj;
type fsNodeType = 'dir' | 'file';

const folderPath = path.join(
  '/',
  'Users',
  'jdcas',
  'jdc-web',
  'zero-markdown-editor',
  'data'
);

class DirectoryObj {
  type: 'dir';
  isOpen: boolean;
  children: fsNode[];

  constructor(public name: string, public path: string, public depth: number) {
    this.type = 'dir';
    this.name = name ? name : '';
    this.path = path;
    this.isOpen = false;
    this.depth = depth;
    this.children = [];
  }

  addChild(n: fsNode) {
    this.children.push(n);
    this.sortChildren();
  }

  sortChildren() {
    this.children.sort((a: fsNode, b: fsNode): number => {
      if (
        (a.type === 'dir' && b.type === 'dir') ||
        (a.type === 'file' && b.type === 'file')
      ) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      if (a.type === 'dir' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'dir') return 1;

      return 0;
    });
  }
}

class FileObj {
  type: 'file';
  constructor(public name: string, public path: string, public depth: number) {
    this.type = 'file';
    this.name = name ? name : '';
    this.path = path;
    this.depth = depth;
  }
}

let parentDir = new DirectoryObj('data', folderPath, 0);

const createDirObj = (dir: DirectoryObj) => {
  const dirContents = fs.readdirSync(dir.path);

  dirContents.forEach((child: string) => {
    const newPath = path.join(dir.path, child);
    const stats = fs.statSync(newPath);

    if (stats.isFile())
      dir.addChild(new FileObj(child, newPath, dir.depth + 1));
    if (stats.isDirectory()) {
      const newDir = new DirectoryObj(child, newPath, dir.depth + 1);
      createDirObj(newDir);
      dir.addChild(newDir);
    }
  });
};

createDirObj(parentDir);
console.log(parentDir);
