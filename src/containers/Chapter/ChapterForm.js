import React from 'react';
import { connect } from 'react-redux';

import DraftEditor from '../DraftJs/Editor';
import { Wrapper, EditorWrapper, NumberColumn } from './ChapterForm.styled';

class ChapterForm extends React.Component {
  render() {
    return (
      <Wrapper className="container">
        <div className="columns is-6">
          <NumberColumn className="column">
            <div className="field">
              <div className="control">
              <input className="input" type="number" placeholder="Number" />
              </div>
            </div>
          </NumberColumn>
          <div className="column is-half">
            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="Title" />
              </div>
            </div>
          </div>
        </div>
        <EditorWrapper>
          <DraftEditor />
        </EditorWrapper>
      </Wrapper>
    );
  }
}

ChapterForm.propTypes = {
  //
};

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}

export default connect(
  mapStateToProps
)(ChapterForm);
