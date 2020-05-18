import {
  ACTIVATE_RICH_MODE,
  ACTIVATE_PREVIEW_MODE,
  ACTIVATE_RAW_MODE
} from './actionTypes';
import { EditorMode } from '../../constants/types';

export function changeEditorMode(mode: EditorMode) {
  if (mode === 'rich') return { type: ACTIVATE_RICH_MODE };
  if (mode === 'preview') return { type: ACTIVATE_PREVIEW_MODE };
  if (mode === 'raw') return { type: ACTIVATE_RAW_MODE };
  return { type: ACTIVATE_RICH_MODE };
}
