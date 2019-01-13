import React from 'react'
import { getScrollbarWidth, stopEventPropagation } from 'common-utils'

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.preventClose = this.preventClose.bind(this)
    }

    componentDidMount() {
        const body = document.body
        body.style.overflow = 'hidden'
        body.style.paddingRight = `${getScrollbarWidth()}px`
    }

    componentWillUnmount() {
        const body = document.body
        setTimeout(() => {
            body.style.overflow = ''
            body.style.paddingRight = ''
        }, 200)
    }

    preventClose(e) {
        console.log('e.stopPropagation()')
        stopEventPropagation(e)
    }

    render() {
        const {children, closeModal} = this.props

        return(
            <div className={'app-modal__window-inner-wrap'} onClick={closeModal}>
                <div className={'app-modal__window-inner'} onClick={this.preventClose}>
                    {children}
                </div>
            </div>
        )
    }
}

export default Modal