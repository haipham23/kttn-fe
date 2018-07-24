import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../../store/history';
import { getAllChapters } from './utils';
import { loadChapters } from '../../actions/chapter';
import { TableWrapper, Wrapper } from './Home.styled';

class Home extends React.Component {
  componentDidMount() {
    const { chapter } = this.props;
    const hasChapters = chapter && chapter.chapters && chapter.chapters.length > 0;

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

  _select(chapterId) {
    history.push(`/edit-chapter/${chapterId}`);
  }

  render() {
    const { chapter } = this.props;
    const page = (chapter && chapter.page) || 0;
    const chapters = chapter.chapters || [];

    if (!chapters.length) {
      return null
    }

    return (
      <Wrapper className="container">
        <TableWrapper>
          <table className="table is-hoverable is-fullwidth">
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
                  <tr key={`c-${idx}`} onClick={() => this._select(c.objectId)}>
                    <td>{c.no}</td>
                    <td>{c.title}</td>
                    <td>Delete / Disable</td>
                  </tr>
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

const mapStateToProps = ({ i18n, chapter }) => ({ i18n, chapter });
const mapDispatchToProps = (dispatch) => bindActionCreators({ loadChapters }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
