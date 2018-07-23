import React from 'react';
import {
  Editor, 
  EditorState, 
  RichUtils,
  convertToRaw
} from 'draft-js';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import JSONPretty from 'react-json-pretty';

import Toolbar from './Toolbar';
import { blockRenderMap, styleMap, mediaBlockRenderer, keyBindingFn } from './Editor.options';
import { addBlock, uploadFile, isVideo, getVideoSrc } from './utils';
import { EditorWrapper, EditorContent, H3, SDropzone } from './Editor.styled';
import { keys, handle } from './constants';


class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      isReadonly: false,
    };
    this.wrapper = null;

    this.onChange = (editorState) => this.setState({ editorState });

    this._toggleInline = this._toggleInline.bind(this);
    this._toggleBlock = this._toggleBlock.bind(this);
    this._handleReturn = this._handleReturn.bind(this);
    this._toggleReadonly = this._toggleReadonly.bind(this);
    this._addMedia = this._addMedia.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._handlePastedText = this._handlePastedText.bind(this);
    this._handleKeyCommand = this._handleKeyCommand.bind(this);
  }

  _toggleInline(style) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      style
    ));
  }

  _toggleBlock(style) {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      style
    ));
  }

  _handleReturn(e) {
    const { editorState } = this.state;

    if (isSoftNewlineEvent(e)) {
      this.onChange(addBlock(editorState));
      return handle.YES;
    }

    this.onChange(RichUtils.insertSoftNewline(editorState));
    return handle.YES;
  }

  _toggleReadonly(isReadonly) {
    this.setState({
      isReadonly
    });
  }

  _addMedia({ src, format, name }) {
    const { editorState } = this.state;
    const newEditorState = addBlock(editorState, 'atomic', {
      src,
      format,
      name
    });

    this.onChange(newEditorState);
  }

  _onDrop(acceptedFiles) {
    uploadFile(acceptedFiles[0])
      .then(this._addMedia);
  }

  _handlePastedText(text) {
    if (isVideo(text)) {
      this.onChange(addBlock(
        this.state.editorState, 
        'atomic', 
        getVideoSrc(text)
      ));
      return handle.YES;
    }

    return handle.NO;
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;

    if (command === keys.SAVE) {
      return handle.YES;
    }

    if (command === keys.BACK) {
      this.onChange(RichUtils.onBackspace(editorState));
      return handle.YES;
    }

    return handle.NO;
  }
  
  render() {
    const { editorState } = this.state;
    const content = convertToRaw(editorState.getCurrentContent());
    
    return (
      <div>
        <H3>Content:</H3>
        <EditorWrapper>
          <Toolbar
            toggleInline={this._toggleInline}
            toggleBlock={this._toggleBlock}
            toggleReadonly={this._toggleReadonly}
            isReadonly={this.state.isReadonly}
          />
          <SDropzone
            onDrop={this._onDrop}
            multiple={false}
            accept="image/*, audio/*, video/*"
            activeStyle={{
              backgroundColor: '#eee'
            }}
          >
            Drop your file here...
          </SDropzone>
          <EditorContent>
            <Editor
              editorState={this.state.editorState}
              blockRenderMap={blockRenderMap}
              blockRendererFn={mediaBlockRenderer}
              customStyleMap={styleMap}
              keyBindingFn={e => keyBindingFn(e, editorState)}
              handleKeyCommand={this._handleKeyCommand}
              onChange={this.onChange}
              handleReturn={this._handleReturn}
              handlePastedText={this._handlePastedText}
              readOnly={this.state.isReadonly}
            />
          </EditorContent>
        </EditorWrapper>
        <JSONPretty json={content} />
      </div>
    );
  }
}

export default DraftEditor;
