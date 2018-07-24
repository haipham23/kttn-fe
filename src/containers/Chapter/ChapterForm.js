import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import DraftEditor from '../DraftJs/Editor';
// import { saveChapter, updateChapter } from './utils';
import { Wrapper, EditorWrapper, NumberColumn, Toast } from './ChapterForm.styled';

// import 'react-toastify/dist/ReactToastify.css';


class ChapterForm extends React.Component {
  constructor(props) {
    super(props);

    this._save = this._save.bind(this);
  }

  _save() {
    // saveChapter(data)
    //   .then()

    toast(<label>saved</label>);
  }

  render() {
    return (
      <Wrapper className="container">
        <div className="columns is-6">
          <NumberColumn className="column">
            <div className="field">
              <div className="control">
              <input className="input" type="number" placeholder="No" />
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
          <DraftEditor
            save={this._save}
          />
        </EditorWrapper>
        <Toast
          autoClose={1000}
          hideProgressBar
        />
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
