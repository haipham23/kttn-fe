import Immutable from 'immutable';

import Media from './Media';

import { H1, H2, H3, Quote, Div } from './Editor.styled';

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
