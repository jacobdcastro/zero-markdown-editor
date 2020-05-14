import { Action } from 'redux';
import { SET_INIT_FS, SAVE_FILE } from '../actions/actionTypes';

interface FsAction {
  type: string;
  payload: object;
}

export default function filesystem(state = {}, action: Action<FsAction>) {
  switch (action.type) {
    case SET_INIT_FS:
      return { ...action.payload };
    default:
      return state;
  }
}
