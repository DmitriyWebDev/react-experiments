import React from "react";
import { openModal, closeModal } from "../../ducks/modals";
import { connect } from "react-redux";
import {
  Modal as AppModal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "../common-ui/AppModal";

class ComponentForTestModalOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalKey: "modal-example-1"
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
        <div onClick={this.openModalWindow}>Open modal 1</div>
        Fake 1
        <AppModal
          modalKey={modalKey}
          closeModal={this.closeModalWindow}
          modalState={modalState}
        >
          <ModalHeader>Modal 1</ModalHeader>
          <ModalBody>Modal 1</ModalBody>
          <ModalFooter>Modal 1</ModalFooter>
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
      modalKey
    }
  };
};

export default connect(
  mapStateFromProps,
  { openModal, closeModal }
)(ComponentForTestModalOne);
