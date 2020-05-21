import {
  ACTIVATE_RICH_MODE,
  ACTIVATE_PREVIEW_MODE,
  ACTIVATE_RAW_MODE,
  FOCUS_EDITOR,
  UNFOCUS_EDITOR
} from './actionTypes';
import { EditorMode } from '../../constants/types';

export function changeEditorMode(mode: EditorMode) {
  if (mode === 'rich') return { type: ACTIVATE_RICH_MODE };
  if (mode === 'preview') return { type: ACTIVATE_PREVIEW_MODE };
  if (mode === 'raw') return { type: ACTIVATE_RAW_MODE };
  return { type: ACTIVATE_RICH_MODE };
}

export function handleFocus(isFocused: boolean) {
  if (isFocused) return { type: FOCUS_EDITOR };
  return { type: UNFOCUS_EDITOR };
}
