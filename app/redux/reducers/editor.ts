import { Action } from 'redux';
import { OPEN_MD_FILE } from '../actions/actionTypes';

interface FsAction {
  type: string;
  payload: object;
}

export default function editor(state = {}, action: Action<FsAction>) {
  switch (action.type) {
    case OPEN_MD_FILE:
      return { ...action.payload };
    default:
      return state;
  }
}
