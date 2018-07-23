import { List, Map } from 'immutable';
import axios from 'axios';
import {
  EditorState,
  ContentBlock,
  genKey
} from 'draft-js';

const YOUTUBEMATCH_URL = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

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
export const addBlock = (editorState, type = 'unstyled', data = {}) => {
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
  const isLastBlock = !newEditorContent.getCurrentContent().getKeyAfter(newBlockKey);

  if (type === 'atomic' && isLastBlock) {
    newEditorContent = addBlock(newEditorContent);
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



export const isVideo = (url) => {
  //take url check if it's a valid video url return true or false
  return YOUTUBEMATCH_URL.test(url);
};


export const getVideoSrc = (url) => {
  //parse url to videoSrc object which will pass to WrapperComponent as props
  const id = url && url.match(YOUTUBEMATCH_URL)[1];
  return {
    src: url,
    format: 'youtube',
    name: id
  };
};
