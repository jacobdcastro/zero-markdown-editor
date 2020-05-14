import { Action } from 'redux';
import { OPEN_MD_FILE, SAVE_FILE, EDIT_CONTENTS } from '../actions/actionTypes';

export default function editor(state = {}, action: Action<string>) {
  switch (action.type) {
    case OPEN_MD_FILE:
      return { ...action.payload };
    case SAVE_FILE:
      return { ...state, hasUnsavedEdits: false };
    case EDIT_CONTENTS:
      return { ...state, hasUnsavedEdits: true };
    default:
      return state;
  }
}
