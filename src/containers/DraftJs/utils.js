import { List, Map } from 'immutable';
import axios from 'axios';
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
export const addEmptyBlock = (editorState, type = 'unstyled', data = {}) => {
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
    data: Map(data),
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

  let newEditorContent = EditorState.push(editorState, newContent, 'split-block');

  if (type === 'atomic') {
    newEditorContent = addEmptyBlock(newEditorContent);
  }

  return newEditorContent;
};


export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('cloud_name', 'hai-pham');
  formData.append('api_key', '822873635386968');
  formData.append('upload_preset', 'kttn-fe');
  formData.append('timestamp', (Date.now() / 1000) | 0);
  
  return axios.post(
    'https://api.cloudinary.com/v1_1/hai-pham/upload', 
    formData, 
    { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
  ).then(response => {
    const data = response.data;

    return {
      src: data.secure_url,
      format: data.format,
      name: data.original_filename
    };
  });
};
