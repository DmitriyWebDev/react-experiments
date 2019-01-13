import React from 'react'

class ModalContent extends React.Component {
    render() {
        const {children} = this.props

        return(
            <div>
                {children}
            </div>
        )
    }
}

export default ModalContent