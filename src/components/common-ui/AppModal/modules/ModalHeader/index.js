import React from 'react';

class ModalHeader extends React.Component {
  render() {
    const { children } = this.props;

    return <div className={'app-modal__header'}>{children}</div>;
  }
}

export default ModalHeader;
