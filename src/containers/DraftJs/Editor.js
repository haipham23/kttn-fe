import React from 'react';
import {
  Editor, 
  EditorState, 
  RichUtils,
  convertToRaw
} from 'draft-js';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import JSONPretty from 'react-json-pretty';
import Dropzone from 'react-dropzone';

import Toolbar from './Toolbar';
import { blockRenderMap, styleMap, mediaBlockRenderer, keyBindingFn } from './Editor.options';
import { addBlock, uploadFile, isVideo, getVideoSrc } from './utils';
import { EditorWrapper, EditorContent, H3, Overlay } from './Editor.styled';
import { keys, handle } from './constants';


class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      isReadonly: false,
      isDragging: false,
      isUploading: false,
    };
    this.wrapper = null;

    this.onChange = (editorState) => this.setState({ editorState });

    this._toggleInline = this._toggleInline.bind(this);
    this._toggleBlock = this._toggleBlock.bind(this);
    this._handleReturn = this._handleReturn.bind(this);
    this._handlePastedText = this._handlePastedText.bind(this);
    this._handleKeyCommand = this._handleKeyCommand.bind(this);

    this._toggleReadonly = this._toggleReadonly.bind(this);
    this._toggleUploading = this._toggleUploading.bind(this);

    this._addMedia = this._addMedia.bind(this);

    this._onDrop = this._onDrop.bind(this);
    this._onDragEnter = this._onDragEnter.bind(this);
    this._onDragLeave = this._onDragLeave.bind(this);
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
    if (!this.state.isUploading) {
      this.setState({
        isReadonly
      });
    }
  }

  _toggleUploading(isUploading) {
    this.setState({
      isUploading
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
    this.setState(
      { 
        isDragging: false,
        isUploading: true
      },
      () => {
        uploadFile(acceptedFiles[0])
          .then(this._addMedia)
          .then(() => this._toggleUploading(false))
          .catch(() => this._toggleUploading(false))
      });
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

  _onDragEnter() {
    if (!this.state.isDragging) {
      this.setState({
        isDragging: true
      });
    }
  }

  _onDragLeave() {
    this.setState({
      isDragging: false
    });
  }
  
  render() {
    const { editorState, isDragging, isReadonly, isUploading } = this.state;
    const content = convertToRaw(editorState.getCurrentContent());
    
    return (
      <div>
        <H3>Content:</H3>
        <Toolbar
          toggleInline={this._toggleInline}
          toggleBlock={this._toggleBlock}
          toggleReadonly={this._toggleReadonly}
          isReadonly={isReadonly || isUploading}
        />
        <EditorWrapper>
          <Dropzone
            onDrop={this._onDrop}
            multiple={false}
            accept="image/*, audio/*, video/*"
            onDragEnter={this._onDragEnter}
            onDragLeave={this._onDragLeave}
            style={{}}
            disableClick={true}
            disabled={isReadonly || isUploading}
          >
            {
              isDragging &&
              <Overlay>Drop your file here...</Overlay>
            }
            {
              isUploading &&
              <Overlay>
                Uploading&nbsp;
                <span className="fas fa-spinner fa-pulse" />
              </Overlay>
            }
            <EditorContent>
              <Editor
                editorState={editorState}
                blockRenderMap={blockRenderMap}
                blockRendererFn={mediaBlockRenderer}
                customStyleMap={styleMap}
                keyBindingFn={e => keyBindingFn(e, editorState)}
                handleKeyCommand={this._handleKeyCommand}
                onChange={this.onChange}
                handleReturn={this._handleReturn}
                handlePastedText={this._handlePastedText}
                readOnly={isReadonly || isUploading}
              />
            </EditorContent>
          </Dropzone>
          
        </EditorWrapper>
        <JSONPretty json={content} />
      </div>
    );
  }
}

export default DraftEditor;
