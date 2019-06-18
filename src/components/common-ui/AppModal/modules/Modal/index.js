import React from 'react';
import ReactDOM from 'react-dom';
import ModalContent from '../ModalContent';
import '../../app-modal.scss';
import { CSSTransition } from 'react-transition-group';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { modalKey, modalState } = nextProps;

    if (modalKey === modalState.modalKey) {
      return { show: modalState.showModal };
    }

    return { show: false };
  }

  render() {
    const { show } = this.state;
    const { children, closeModal } = this.props;

    return ReactDOM.createPortal(
      <CSSTransition
        in={show}
        key={'app-modal'}
        timeout={200}
        classNames="app-modal"
        appear
        unmountOnExit
      >
        {state => (
          <div className={'app-modal'}>
            <div className={'app-modal__window'}>
              <CSSTransition
                in={state === 'entered'}
                key={'app-modal__window'}
                timeout={100}
                classNames="app-modal__window"
                appear
                unmountOnExit
              >
                <ModalContent closeModal={closeModal}>{children}</ModalContent>
              </CSSTransition>
            </div>
          </div>
        )}
      </CSSTransition>,
      document.body,
    );
  }
}

export default Modal;
