import React from "react";
import { getScrollbarWidth } from "common-utils";

class ModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalOverlayClick = this.handleModalOverlayClick.bind(this);
    this.modalContentRef = React.createRef();
  }

  componentDidMount() {
    const body = document.body;
    body.style.overflow = "hidden";
    body.style.paddingRight = `${getScrollbarWidth()}px`;
  }

  componentWillUnmount() {
    const body = document.body;
    setTimeout(() => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    }, 200);
  }

  handleModalOverlayClick(e) {
    const { closeModal } = this.props;
    const { target } = e;
    const modalContent = this.modalContentRef.current;
    if (target !== modalContent && target.contains(modalContent)) {
      closeModal();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div
        className={"app-modal__window-inner-wrap"}
        onClick={this.handleModalOverlayClick}
      >
        <div ref={this.modalContentRef} className={"app-modal__window-inner"}>
          {children}
        </div>
      </div>
    );
  }
}

export default ModalContent;
