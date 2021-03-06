const fs = require('fs');
const path = require('path');

const folderPath = path.join(
  '/',
  'Users',
  'jdcas',
  'jdc-web',
  'zero-markdown-editor',
  'data'
);

class Directory {
  constructor(name, path, depth) {
    this.type = 'dir';
    this.name = name ? name : '';
    this.path = path;
    this.isOpen = false;
    this.depth = depth;
    this.children = [];
  }

  addChild(n) {
    this.children.push(n);
    this.sortChildren();
  }

  sortChildren() {
    this.children.sort((a, b) => {
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

class File {
  constructor(name, path, depth) {
    this.type = 'file';
    this.name = name ? name : '';
    this.path = path;
    this.depth = depth;
  }
}

let parentDir = new Directory('data', folderPath, 0);

const createDirObj = dir => {
  const dirContents = fs.readdirSync(dir.path);

  dirContents.forEach(child => {
    const newPath = path.join(dir.path, child);
    const stats = fs.statSync(newPath);

    if (stats.isFile()) dir.addChild(new File(child, newPath, dir.depth + 1));
    if (stats.isDirectory()) {
      const newDir = new Directory(child, newPath, dir.depth + 1);
      createDirObj(newDir);
      dir.addChild(newDir);
    }
  });
};

createDirObj(parentDir);
console.log(parentDir);
