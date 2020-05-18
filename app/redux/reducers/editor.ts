import { Action } from 'redux';
import {
  ACTIVATE_RAW_MODE,
  ACTIVATE_RICH_MODE,
  ACTIVATE_PREVIEW_MODE
} from '../actions/actionTypes';

export default function activeFile(
  state = { mode: 'rich' },
  action: Action<string>
) {
  switch (action.type) {
    case ACTIVATE_RICH_MODE:
      return { mode: 'rich' };
    case ACTIVATE_PREVIEW_MODE:
      return { mode: 'preview' };
    case ACTIVATE_RAW_MODE:
      return { mode: 'raw' };

    default:
      return state;
  }
}
