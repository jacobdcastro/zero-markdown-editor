import { CHANGE_EDITOR_MODE } from './actionTypes';

type EditorMode = 'raw' | 'preview' | 'rich';

export function changeEditorMode(mode: EditorMode) {
  return { type: CHANGE_EDITOR_MODE, mode };
}
