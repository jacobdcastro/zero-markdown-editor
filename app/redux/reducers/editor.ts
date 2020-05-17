import { Action } from 'redux';
import { CHANGE_EDITOR_MODE } from '../actions/actionTypes';

export default function activeFile(
  state = { mode: 'rich' },
  action: Action<string>
) {
  switch (action.type) {
    case CHANGE_EDITOR_MODE:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}
