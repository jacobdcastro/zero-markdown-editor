import { Action } from 'redux';
import {
  ACTIVATE_RAW_MODE,
  ACTIVATE_RICH_MODE,
  ACTIVATE_PREVIEW_MODE,
  FOCUS_EDITOR,
  UNFOCUS_EDITOR
} from '../actions/actionTypes';

export default function activeFile(
  state = { mode: 'rich', hasFocus: false },
  action: Action<string>
) {
  switch (action.type) {
    case ACTIVATE_RICH_MODE:
      return { ...state, mode: 'rich' };
    case ACTIVATE_PREVIEW_MODE:
      return { ...state, mode: 'preview' };
    case ACTIVATE_RAW_MODE:
      return { ...state, mode: 'raw' };

    case FOCUS_EDITOR:
      return { ...state, hasFocus: true };
    case UNFOCUS_EDITOR:
      return { ...state, hasFocus: false };

    default:
      return state;
  }
}
