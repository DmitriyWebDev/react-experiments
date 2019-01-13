import React from 'react'

class ModalBody extends React.Component {
    render() {
        const {children} = this.props

        return(
            <div className={'app-modal__content'}>
                {children}
            </div>
        )
    }
}

export default ModalBody