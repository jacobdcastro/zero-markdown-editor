import { CHANGE_EDITOR_MODE } from './actionTypes';
import { EditorMode } from '../../constants/types';

export function changeEditorMode(mode: EditorMode) {
  return { type: CHANGE_EDITOR_MODE, mode };
}
