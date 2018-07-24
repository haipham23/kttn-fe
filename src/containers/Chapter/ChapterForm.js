import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import DraftEditor from '../DraftJs/Editor';
import { saveChapter, updateChapter } from './utils';
import { Wrapper, EditorWrapper, NumberColumn, Toast } from './ChapterForm.styled';

class ChapterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      no: '',
      title: ''
    }

    this._onChange = this._onChange.bind(this);
    this._save = this._save.bind(this);
  }

  _onChange(type, e) {
    this.setState({
      [type]: e.target.value
    });
  }

  _save(content) {
    const _this = this;
    const { no, title, chapterId } = _this.state;
    const token = _this.props.account && _this.props.account.token;

    if (token) {
      const postData = {
        chapterId,
        no: Number(no),
        title,
        content,
        sessionToken: token
      };

      if (!chapterId) {
        saveChapter(postData)
          .then((response) => {
            _this.setState({ chapterId: response.data.objectId });
            toast(<label>saved</label>);
          })
          .catch((e) => {
            console.log(111, e);
            toast(<label>{e.message}</label>)
          });
      } else {
        updateChapter(postData)
          .then(() => toast(<label>saved</label>))
          .catch((e) => toast(<label>{e.message}</label>));
      }
    }
  }

  render() {
    return (
      <Wrapper className="container">
        <div className="columns is-6">
          <NumberColumn className="column">
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="No"
                  onChange={(e) => this._onChange('no', e)}
                  value={this.state.no}
                />
              </div>
            </div>
          </NumberColumn>
          <div className="column is-half">
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Title"
                  onChange={(e) => this._onChange('title', e)}
                  value={this.state.title}
                />
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
  chapterId: PropTypes.string
};

const mapStateToProps = ({ i18n, account }) => ({ i18n, account });

export default connect(
  mapStateToProps
)(ChapterForm);
