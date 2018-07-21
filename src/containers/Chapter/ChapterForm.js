import React from 'react';
import { connect } from 'react-redux';
import NumericInput from 'react-numeric-input';

import DraftEditor from '../DraftJs/Editor';

class ChapterForm extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <label className="label">Chapter No</label>
              <div className="control">
                <NumericInput className="input" />
              </div>
              <p className="help">This is a help text</p>
            </div>
            <div className="field">
              <label className="label">Label</label>
              <div className="control">
                <input className="input" type="text" placeholder="Text input" />
              </div>
              <p className="help">This is a help text</p>
            </div>
          </div>
        </div>
        <div className="field">
          <DraftEditor />
        </div>
      </div>
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
