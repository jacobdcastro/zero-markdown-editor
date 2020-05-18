import { Action } from 'redux';
import { SAVE_FILE, DELETE_FILE } from '../actions/actionTypes';

export default function filesystem(state = [], action: Action<string>) {
  switch (action.type) {
    case SAVE_FILE:
    case DELETE_FILE:
      return [...state, action.payload];

    default:
      return state;
  }
}
