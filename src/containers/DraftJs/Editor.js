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
import { blockRenderMap, styleMap, mediaBlockRenderer } from './Editor.options';
import { addBlock, uploadFile, isVideo, getVideoSrc } from './utils';
import { EditorWrapper, EditorContent, H3 } from './Editor.styled';


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
      return 'handled';
    }

    this.onChange(RichUtils.insertSoftNewline(editorState));
    return 'handled';
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
      return 'handled';
    }

    return 'not-handled';
  }
  
  render() {
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    
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
          <Dropzone
            onDrop={this._onDrop}
            multiple={false}
            accept="image/*, audio/*, video/*"
            style={{
              width: '100%',
              height: '50px',
              marginBottom: '10px',
              borderWidth: '2px',
              borderColor: 'rgb(102, 102, 102)',
              borderStyle: 'dashed',
              borderRadius: '4px'
            }}
            activeStyle={{
              backgroundColor: '#eee'
            }}
          />
          <EditorContent>
            <Editor
              editorState={this.state.editorState}
              blockRenderMap={blockRenderMap}
              blockRendererFn={mediaBlockRenderer}
              customStyleMap={styleMap}
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
