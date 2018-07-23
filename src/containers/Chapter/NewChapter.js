import React from 'react';
import { connect } from 'react-redux';

import ChapterForm from './ChapterForm';

class NewChapter extends React.Component {
  render() {
    return (
      <div className="container">
        <ChapterForm />
      </div>
    );
  }
}

NewChapter.propTypes = {
  //
};

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}

export default connect(
  mapStateToProps
)(NewChapter);
