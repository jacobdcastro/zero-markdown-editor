import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
const { hasCommandModifier } = KeyBindingUtil;

const keyBindingFn = (e: any): string | null => {
  if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
    return 'editor-save';
  }
  return getDefaultKeyBinding(e);
};

export default keyBindingFn;
