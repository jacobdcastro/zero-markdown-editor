import fs from 'fs';
import File from '../../helpers/buildFilesystemObj';
import { OPEN_MD_FILE } from './actionTypes';
import store from '../store/configureStore';

export function openMdFile(fileNode: File) {
  // get string of markdown content
  const content: string = fs.readFileSync(fileNode.path, 'utf8');
  const payload = { filetype: 'md', id: fileNode.id, content };
  return { type: OPEN_MD_FILE, payload };
}

export function viewImgFile(filePath: string) {
  // get string of markdown content
  // const content = fs.readFileSync(filePath, 'utf8');
  // const payload = { type: 'md', content };
  // return { type: OPEN_MD_FILE, payload };
}
