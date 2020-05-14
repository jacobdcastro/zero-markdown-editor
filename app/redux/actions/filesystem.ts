import { Dispatch } from '../reducers/types';
import { Directory } from '../../helpers/buildFilesystemObj';
import { SET_INIT_FS } from './actionTypes';

export function setInitFilesystem(folderPath: string) {
  let projectDir = new Directory('data', folderPath, 0);
  return { type: SET_INIT_FS, payload: projectDir };
}

export function createFile(filePath) {}

export function saveFile(filePath) {}

export function deleteFile(filePath) {}
