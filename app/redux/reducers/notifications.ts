import { Action } from 'redux';
import { NEW_ERROR, NEW_SUCCESS } from '../actions/actionTypes';

interface FsAction {
  type: string;
  payload: object;
}

export default function filesystem(state = [], action: Action<FsAction>) {
  switch (action.type) {
    case SAVE_FILE:
      return { type: 'err', msg: action.msg };
    case SAVE_FILE:
      return { type: 'suc', msg: action.msg };

    default:
      return state;
  }
}
