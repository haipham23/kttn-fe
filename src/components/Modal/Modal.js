import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.PureComponent {
  render() {
    return (
      <div className={`modal modal-fx-fadeInScale ${this.props.show ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={this.props.hide} />
        <div className="modal-content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

export default Modal;
