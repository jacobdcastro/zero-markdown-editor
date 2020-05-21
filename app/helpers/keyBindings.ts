import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
const { hasCommandModifier } = KeyBindingUtil;

const keyBindingFn = (e: any): string | null => {
  console.log(e.keyCode);
  if (e.keyCode === 13 /* 'return' key */) {
    return 'editor-save';
  }
  return getDefaultKeyBinding(e);
};

export default keyBindingFn;
