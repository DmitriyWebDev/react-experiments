import React from 'react'
import ReactDOM from 'react-dom'
import Modal from './modules/Modal'
import './app-modal.scss'
// import styles from './modal.module.scss'
import {
    CSSTransition
} from 'react-transition-group'


class AppModal extends React.Component {
    render() {
        const {children, isOpen, closeModal} = this.props
        return ReactDOM.createPortal(
            <CSSTransition
                in={isOpen}
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
                                <Modal closeModal={closeModal}>
                                    {children}
                                </Modal>
                            </CSSTransition>
                        </div>

                    </div>
                )}

            </CSSTransition>,
            document.body
        );
    }
}

export default AppModal