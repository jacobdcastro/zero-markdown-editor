import { Action } from 'redux';
import { NEW_ERROR, NEW_SUCCESS } from '../actions/actionTypes';

interface FsAction {
  type: string;
  payload: object;
}

export default function filesystem(state = [], action: Action<FsAction>) {
  switch (action.type) {
    case NEW_ERROR:
      return { type: 'err', msg: action.msg };
    case NEW_SUCCESS:
      return { type: 'suc', msg: action.msg };

    default:
      return state;
  }
}
