import { Action } from 'redux';
import { OPEN_MD_FILE, SAVE_FILE, EDIT_CONTENTS } from '../actions/actionTypes';

export default function activeFile(state = {}, action: Action<string>) {
  // @ts-ignore
  const { type, payload } = action;

  switch (type) {
    case OPEN_MD_FILE:
      return { ...payload };
    case SAVE_FILE:
      return { ...state, hasUnsavedEdits: false, content: payload };
    case EDIT_CONTENTS:
      return { ...state, hasUnsavedEdits: true };
    default:
      return state;
  }
}
