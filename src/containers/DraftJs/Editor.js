import React from 'react';
import {
  Editor, 
  EditorState, 
  RichUtils, 
  convertToRaw 
} from 'draft-js';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import Immutable from 'immutable';
import JSONPretty from 'react-json-pretty';

import { EditorWrapper, H1, H2, H3, Quote, Div } from './Editor.styled';

import { addEmptyBlock } from './utils';
import Toolbar from './Toolbar';

const blockRenderMap = Immutable.Map({
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
    element: Div
  }
});

const styleMap = {
  'HIGHLIGHT': {
    backgroundColor: '#ffff00',
  },
};

class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      isReadonly: false,
    };

    this.onChange = (editorState) => this.setState({editorState});

    this._toggleInline = this._toggleInline.bind(this);
    this._toggleBlock = this._toggleBlock.bind(this);
    this._handleReturn = this._handleReturn.bind(this);
    this._toggleReadonly = this._toggleReadonly.bind(this);
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
      this.onChange(addEmptyBlock(editorState));
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
  
  render() {
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    
    return (
      <div>
        <H3>Content:</H3>
        <Toolbar
          toggleInline={this._toggleInline}
          toggleBlock={this._toggleBlock}
          toggleReadonly={this._toggleReadonly}
          isReadonly={this.state.isReadonly}
        />
        <EditorWrapper>
          <Editor
            editorState={this.state.editorState}
            blockRenderMap={blockRenderMap}
            customStyleMap={styleMap}
            onChange={this.onChange}
            handleReturn={this._handleReturn}
            readOnly={this.state.isReadonly}
          />
        </EditorWrapper>
        <JSONPretty json={content} />
      </div>
    );
  }
}

export default DraftEditor;
