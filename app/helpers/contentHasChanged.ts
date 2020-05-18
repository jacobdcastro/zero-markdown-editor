import fs from 'fs';
import { convertToRaw } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import { File } from './buildFilesystemObj';

const contentHasChanged = (mdString: string, activeFile: File): boolean => {
  // get markdown content from filesystem
  const filesystemMd: string = fs.readFileSync(activeFile.path, 'utf8');

  if (filesystemMd === mdString) return false;
  return true;
};

export default contentHasChanged;
