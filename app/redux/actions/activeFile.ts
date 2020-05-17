import fs from 'fs';
import { File } from '../../helpers/buildFilesystemObj';
import { OPEN_MD_FILE, EDIT_CONTENTS, VIEW_IMG_FILE } from './actionTypes';

export function openMdFile(fileNode: File) {
  // get string of markdown content
  const content: string = fs.readFileSync(fileNode.path, 'utf8');
  const payload = {
    id: fileNode.id,
    filetype: 'md',
    path: fileNode.path,
    hasUnsavedEdits: false,
    content
  };
  return { type: OPEN_MD_FILE, payload };
}

export function makeEdits() {
  return { type: EDIT_CONTENTS };
}

export function viewImgFile(filePath: string) {
  // get string of markdown content
  // const content = fs.readFileSync(filePath, 'utf8');
  // const payload = { type: 'md', content };
  return { type: VIEW_IMG_FILE, payload: 'payload' };
}
