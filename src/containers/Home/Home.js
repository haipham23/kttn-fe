import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../store/history';
import { getAllChapters, deleteChapter } from './utils';
import { loadChapters } from '../../actions/chapter';
import { TableWrapper, Wrapper, Tr, Td } from './Home.styled';
import PLoader from '../../components/PLoader/PLoader';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChapter: '',
      isLoading: false
    };

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  _handleMouseEnter(cId) {
    this.setState({
      selectedChapter: cId
    });
  }

  _onDelete(cId) {
    const _this = this;
    const { token } = _this.props.account;
    const { chapters } = _this.props.chapter;

    _this.setState({ isLoading: true });

    deleteChapter(cId, token)
      .then(() => {
        _this.props.loadChapters({
          chapters: chapters.filter(c => c.objectId !== cId),
          limit: this.props.limit,
          page: this.props.page
        });

        _this.setState({ isLoading: false });
      })
      .catch(() => _this.setState({ isLoading: false }))
  }

  _select(chapterId) {
    history.push(`/edit-chapter/${chapterId}`);
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
                <th>Actions</th>
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
                    <td
                      onClick={() => this._select(c.objectId)}
                    >{c.no}</td>
                    <Td
                      onClick={() => this._select(c.objectId)}
                    >
                      {c.title}
                    </Td>
                    <td>
                      <div className="field has-addons">
                        <p className="control">
                          {
                            this.state.selectedChapter === c.objectId &&
                            this.props.account.token &&
                            <button
                              className="button is-small is-danger"
                              onClick={() => this._onDelete(c.objectId)}
                            >
                              Delete
                            </button>
                          }
                        </p>
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
