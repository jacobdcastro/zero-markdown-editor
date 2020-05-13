// import { GetState, Dispatch } from '../reducers/types';
import { Directory } from '../../helpers/buildFilesystemObj';
import path from 'path';

export const SET_INIT_FS = 'SET_INIT_FS';

const folderPath = path.join(
  '/',
  'Users',
  'jdcas',
  'jdc-web',
  'zero-markdown-editor',
  'data'
);

export function setInitFilesystem() {
  let projectDir = new Directory('data', folderPath, 0);
  return { type: SET_INIT_FS, payload: projectDir };
}
