import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../store/history';
import { getAllChapters, deleteChapter } from './utils';
import { loadChapters } from '../../actions/chapter';
import { TableWrapper, Wrapper, Tr, Td, Column, ModalText, ActionHead } from './Home.styled';
import PLoader from '../../components/PLoader/PLoader';
import Modal from '../../components/Modal/Modal';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChapter: '',
      isLoading: false,
    };

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onQuiz = this._onQuiz.bind(this);
    this._toggleDelete = this._toggleDelete.bind(this);
  }

  _handleMouseEnter(cId) {
    this.setState({
      selectedChapter: cId
    });
  }

  _onDelete() {
    const _this = this;
    const { token } = _this.props.account;
    const { chapters } = _this.props.chapter;
    const { toDelete } = _this.state;

    _this.setState({
      isLoading: true,
      toDelete: null
    });

    deleteChapter(toDelete, token)
      .then(() => {
        _this.props.loadChapters({
          chapters: chapters.filter(c => c.objectId !== toDelete),
          limit: this.props.limit,
          page: this.props.page
        });

        _this.setState({ isLoading: false });
      })
      .catch(() => _this.setState({ isLoading: false }))
  }

  _onQuiz(cId) {
    history.push(`/quiz/${cId}`);
  }

  _select(chapterId) {
    history.push(`/edit-chapter/${chapterId}`);
  }

  _toggleDelete(cId) {
    this.setState({
      toDelete: cId
    });
  }

  componentDidMount() {
    const { chapter } = this.props;
    const hasChapters = chapter
      && chapter.chapters
      && chapter.chapters.length > 0;

    if(chapter && !hasChapters) {
      const { limit, page } = chapter;

      getAllChapters(limit, page)
        .then(response => this.props.loadChapters({
          chapters: response.data,
          limit,
          page
        }));
    }
  }

  render() {
    const { chapter } = this.props;
    const page = (chapter && chapter.page) || 0;
    const chapters = chapter.chapters || [];

    if (!chapters.length || this.state.isLoading) {
      return <PLoader show />;
    }

    return (
      <Wrapper className="container">
        <TableWrapper>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <ActionHead>Actions</ActionHead>
              </tr>
            </thead>
            <tbody>
              {
                chapters.map((c, idx) => (
                  <Tr
                    key={`c-${idx}`}
                    onMouseEnter={() => this._handleMouseEnter(c.objectId)}
                    data-is-selected={this.state.selectedChapter === c.objectId}
                  >
                    <td>{c.no}</td>
                    <Td>
                      {c.title}
                    </Td>
                    <td>
                      <div className="field has-addons">
                        <div className="control">
                          {
                            this.state.selectedChapter === c.objectId &&
                            this.props.account.token &&
                            <div className="buttons">
                              <button
                                className="button is-small is-success"
                                onClick={() => this._select(c.objectId)}
                              >
                                Edit
                              </button>
                              <button
                                className="button is-small is-info"
                                onClick={() => this._onQuiz(c.objectId)}
                              >
                                Quiz
                              </button>
                              <button
                                className="button is-small is-danger"
                                onClick={() => this._toggleDelete(c.objectId)}
                              >
                                Delete
                              </button>
                            </div>
                          }
                        </div>
                      </div>
                    </td>
                  </Tr>
                ))
              }
            </tbody>
          </table>
          <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <a className="pagination-previous">Previous</a>
            <a className="pagination-next">Next page</a>
            <ul className="pagination-list">
              <li>
                <span className="pagination-link is-current">
                  { page + 1 }
                </span>
                </li>
            </ul>
          </nav>
        </TableWrapper>
        <Modal
          show={!!this.state.toDelete}
          hide={() => this._toggleDelete()}
        >
          <Column>
            <ModalText>Are you sure you want to delete this?</ModalText>
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <button className="button is-small is-light" onClick={() => this._toggleDelete()}>
                  Cancel
                </button>
              </p>
              <p className="control">
                <button className="button is-small is-danger" onClick={this._onDelete}>
                  Delete
                </button>
              </p>
            </div>
          </Column>
        </Modal>
      </Wrapper>
    );
  }
}

Home.propTypes = {
  //
};

const mapStateToProps = ({ i18n, chapter, account }) => ({ i18n, chapter, account });
const mapDispatchToProps = (dispatch) => bindActionCreators({ loadChapters }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
