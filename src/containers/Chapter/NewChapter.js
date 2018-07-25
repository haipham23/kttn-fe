import React from 'react';
import { connect } from 'react-redux';
import equal from 'deep-equal';

import ChapterForm from './ChapterForm';
import { getOneChapter } from './utils';
import PLoader from '../../components/PLoader/PLoader';

const EMPTY_CHAPTER = {
  no: '',
  title: '',
  content: '{}',
  objectId: null
};

class NewChapter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chapter: EMPTY_CHAPTER,
      isLoading: true
    };

    this._getChapter = this._getChapter.bind(this);
  }

  componentDidMount() {
    this._getChapter();
  }

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.router, this.props.router)) {
      this._getChapter();
    }
  }

  _getChapter() {
    const _this = this;
    const { router } = _this.props;
    const pathname = router && router.location && router.location.pathname;
    const [name, chapterId] = pathname.split('/').filter(p => !!p);

    if (name === 'edit-chapter' && chapterId) {
      getOneChapter(chapterId)
        .then((response) => _this.setState({
          chapter: response.data,
          isLoading: false
        }));
    } else {
      _this.setState({
        chapter: EMPTY_CHAPTER,
        isLoading: false
      });
    }
  }

  render() {
    return (
      <div className="container">
        {
          <PLoader show={this.state.isLoading} />
        }
        {
          !this.state.isLoading &&
          <ChapterForm
            chapter={this.state.chapter}
          />
        }
      </div>
    );
  }
}

NewChapter.propTypes = {
  //
};

const mapStateToProps = ({ i18n, router }) => ({ i18n, router });

export default connect(
  mapStateToProps
)(NewChapter);
