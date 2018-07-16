import * as React from 'react';

class ModalWrapper extends React.Component {
  render() {
    return (
      <div className="modal-hover">
        <div className="modal-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ModalWrapper;
