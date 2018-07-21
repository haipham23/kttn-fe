import React from 'react';
import PropTypes from 'prop-types';

import { BtnGroup } from './Toolbar.styled';

class Toolbar extends React.PureComponent {
  render() {
    const { toggleInline, toggleBlock, toggleReadonly, isReadonly } = this.props;

    return (
      <div className="field is-grouped">
        <BtnGroup className="buttons has-addons">
          <button className="button" onClick={() => toggleInline('BOLD')}>
            <span className="icon">
              <i className="fas fa-bold" />
            </span>
          </button>
          <button className="button" onClick={() => toggleInline('ITALIC')}>
            <span className="icon">
              <i className="fas fa-italic" />
            </span>
          </button>
          <button className="button" onClick={() => toggleInline('UNDERLINE')}>
            <span className="icon">
              <i className="fas fa-underline" />
            </span>
          </button>
          <button className="button" onClick={() => toggleInline('HIGHLIGHT')}>
            <span className="icon">
              <i className="fas fa-highlighter" />
            </span>
          </button>
        </BtnGroup>
        <BtnGroup className="buttons has-addons">
          <button className="button" onClick={() => toggleBlock('header-one')}>H1</button>
          <button className="button" onClick={() => toggleBlock('header-two')}>H2</button>
          <button className="button" onClick={() => toggleBlock('header-three')}>H3</button>
          <button className="button" onClick={() => toggleBlock('blockquote')}>
            <span className="icon">
              <i className="fas fa-quote-right" />
            </span>
          </button>
        </BtnGroup>
        {
          isReadonly &&
          <button className="button" onClick={() => toggleReadonly(false)}>
            <span className="icon">
              <i className="far fa-edit" />
            </span>
          </button>
        }
        {
          !isReadonly &&
          <button className="button" onClick={() => toggleReadonly(true)}>
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        }
      </div>
    );
  }
}

Toolbar.propTypes = {
  toggleBlock: PropTypes.func.isRequired,
  toggleInline: PropTypes.func.isRequired,
  toggleReadonly: PropTypes.func.isRequired,
  isReadonly: PropTypes.bool.isRequired,
};

export default Toolbar;
