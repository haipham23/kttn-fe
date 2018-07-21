import { List } from 'immutable';
import {
  EditorState,
  ContentBlock,
  genKey
} from 'draft-js';

export const getCurrentBlockKey = (editorState) => {
  const selectionState = editorState.getSelection();
  const blockKey = selectionState.getStartKey();
  return blockKey;
};

/*
Get currentBlock in the editorState.
*/
export const getCurrentBlock = (editorState) => {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(getCurrentBlockKey(editorState));
  return block;
};

/*
Used from [react-rte](https://github.com/sstur/react-rte/blob/master/src/lib/insertBlockAfter.js)
by [sstur](https://github.com/sstur)
*/
export const addEmptyBlock = (editorState, type = 'unstyled') => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const currentBlockKey = getCurrentBlockKey(editorState);
  const block = blockMap.get(currentBlockKey);

  if (!block) {
    return editorState;
  }

  const blocksBefore = blockMap.toSeq().takeUntil((v) => (v === block));
  const blocksAfter = blockMap.toSeq().skipUntil((v) => (v === block)).rest();
  const newBlockKey = genKey();

  const newBlock = new ContentBlock({
    key: newBlockKey,
    type,
    text: '',
    characterList: List(),
    depth: 0,
  });

  const newBlockMap = blocksBefore.concat(
    [
      [currentBlockKey, block], 
      [newBlockKey, newBlock]
    ],
    blocksAfter
  ).toOrderedMap();

  const selection = editorState.getSelection();

  const newContent = content.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: newBlockKey,
      anchorOffset: 0,
      focusKey: newBlockKey,
      focusOffset: 0,
      isBackward: false,
    }),
  });

  return EditorState.push(editorState, newContent, 'split-block');
};
