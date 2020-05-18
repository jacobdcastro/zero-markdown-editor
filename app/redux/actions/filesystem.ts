import fs from 'fs';
import { Directory } from '../../helpers/buildFilesystemObj';
import {
  SET_INIT_FS,
  CREATE_FILE,
  SAVE_FILE,
  DELETE_FILE,
  NEW_ERROR
} from './actionTypes';
import { EditorState } from 'draft-js';
import { convertDraftToMd } from '../../helpers/mdDraftConversion';

export function setInitFilesystem(folderPath: string) {
  let projectDir = new Directory('data', folderPath, 0);
  return { type: SET_INIT_FS, payload: projectDir };
}

export function createFile(filePath: string) {
  fs.writeFile(filePath, { flag: 'w+' }, err => {
    if (err) return { type: NEW_ERROR, err };
    return { type: CREATE_FILE, msg: 'File saved successfully!' };
  });
}

export function saveFile(filePath: string, markdownString: string) {
  fs.writeFileSync(filePath, markdownString, { flag: 'w+' });
  return { type: SAVE_FILE, msg: markdownString };
}

export function deleteFile(filePath: string) {
  return { type: DELETE_FILE };
}
