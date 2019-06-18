import React from 'react';
import { openModal, closeModal } from '../../ducks/modals';
import { connect } from 'react-redux';
import {
  Modal as AppModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../common-ui/AppModal';

class ComponentForTestModalTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalKey: 'modal-example-2',
    };
    this.openModalWindow = this.openModalWindow.bind(this);
    this.closeModalWindow = this.closeModalWindow.bind(this);
  }

  openModalWindow() {
    const { modalKey } = this.state;
    const { openModal } = this.props;
    openModal({ modalKey });
  }

  closeModalWindow() {
    const { modalKey } = this.state;
    const { closeModal } = this.props;
    closeModal({ modalKey });
  }

  render() {
    const { modalKey } = this.state;
    const { modalState } = this.props;
    return (
      <div>
        <div onClick={this.openModalWindow}>Open modal 2</div>
        Fake 2
        <AppModal
          modalKey={modalKey}
          closeModal={this.closeModalWindow}
          modalState={modalState}
        >
          <ModalHeader>Modal 2</ModalHeader>
          <ModalBody>Modal 2</ModalBody>
          <ModalFooter>Modal 2</ModalFooter>
        </AppModal>
      </div>
    );
  }
}

const mapStateFromProps = state => {
  const { showModal, modalKey } = state.modals;
  return {
    modalState: {
      showModal,
      modalKey,
    },
  };
};

export default connect(
  mapStateFromProps,
  { openModal, closeModal },
)(ComponentForTestModalTwo);
