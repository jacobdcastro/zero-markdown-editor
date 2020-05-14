import fs from 'fs';
import { Directory } from '../../helpers/buildFilesystemObj';
import {
  SET_INIT_FS,
  CREATE_FILE,
  SAVE_FILE,
  DELETE_FILE,
  NEW_ERROR
} from './actionTypes';
import { EditorState, convertToRaw } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';

export function setInitFilesystem(folderPath: string) {
  let projectDir = new Directory('data', folderPath, 0);
  return { type: SET_INIT_FS, payload: projectDir };
}

export function createFile(filePath) {}

export function saveFile(filePath: string, editorState: EditorState) {
  const content = editorState.getCurrentContent();
  const rawObject = convertToRaw(content);
  const markdownString = draftToMarkdown(rawObject);

  fs.writeFile(filePath, markdownString, { flag: 'w+' }, err => {
    if (err) return { type: NEW_ERROR, err };
    return { type: SAVE_FILE, msg: 'File saved successfully!' };
  });
}

export function deleteFile(filePath) {}
