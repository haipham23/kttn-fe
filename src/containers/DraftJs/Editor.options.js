import Immutable from 'immutable';
import { getDefaultKeyBinding, KeyBindingUtil, RichUtils } from 'draft-js';

import Media from './Media';

import { H1, H2, H3, Quote, Div } from './Editor.styled';
import { keys } from './constants';

const { hasCommandModifier } = KeyBindingUtil;

export const blockRenderMap = Immutable.Map({
  'header-one': {
    element: H1
  },
  'header-two': {
    element: H2
  },
  'header-three': {
    element: H3
  },
  'blockquote': {
    element: Quote
  },
  'unstyled': {
    element: Div,
    aliasedElements: ['p']
  }
});

export const styleMap = {
  'HIGHLIGHT': {
    backgroundColor: '#ffff00',
  },
};

export const mediaBlockRenderer = (block) => {
	if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false
    };
  }

	return null;
};

export const keyBindingFn = (e, editorState) => {
  if (e.keyCode === 83 && hasCommandModifier(e)) {
    return keys.SAVE;
  }

  if (e.keyCode === 8 && RichUtils.onBackspace(editorState)) {
    return keys.BACK;
  }

  return getDefaultKeyBinding(e);
};
