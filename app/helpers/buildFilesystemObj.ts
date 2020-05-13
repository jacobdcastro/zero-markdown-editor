import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export type fsNode = Directory | File;

export class Directory {
  id: string;
  type: 'dir';
  isOpen: boolean;
  children: fsNode[];

  constructor(public name: string, public path: string, public depth: number) {
    this.id = uuidv4();
    this.type = 'dir';
    this.name = name ? name : '';
    this.path = path;
    this.isOpen = false;
    this.depth = depth;
    this.children = [];
    this.addChild = this.addChild;
    this.fillChildren();
  }

  public addChild(n: fsNode) {
    this.children.push(n);
    this.sortChildren();
  }

  private sortChildren() {
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

  // recursive function to fill children arrays in each directory
  private fillChildren() {
    const dirContents = fs.readdirSync(this.path);

    dirContents.forEach((child: string) => {
      const newPath = path.join(this.path, child);
      const stats = fs.statSync(newPath);

      if (stats.isFile())
        this.addChild(new File(child, newPath, this.depth + 1));
      if (stats.isDirectory()) {
        const newDir = new Directory(child, newPath, this.depth + 1);
        this.addChild(newDir);
      }
    });
  }
}

export class File {
  id: string;
  type: 'file';
  children: null;
  constructor(public name: string, public path: string, public depth: number) {
    this.id = uuidv4();
    this.type = 'file';
    this.name = name ? name : '';
    this.path = path;
    this.depth = depth;
    this.children = null;
  }
}
