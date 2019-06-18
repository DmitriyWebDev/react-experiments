import React from 'react';

class ModalFooter extends React.Component {
  render() {
    const { children } = this.props;

    return <div className={'app-modal__footer'}>{children}</div>;
  }
}

export default ModalFooter;
