import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    return (
      <div className="container">
        Tin Lanh Tre
        <nav className="breadcrumb is-centered is-medium has-bullet-separator" aria-label="breadcrumbs">
          <ul>
            <li><a href="/new-chapter">Add Chapter</a></li>
            <li><a href="/new-quiz">Add Quiz</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  //
};

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}

export default connect(
  mapStateToProps
)(Header);
