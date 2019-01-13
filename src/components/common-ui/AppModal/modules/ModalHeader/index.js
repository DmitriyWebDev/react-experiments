import React from 'react'

class ModalHeader extends React.Component {
    render() {
        const {children} = this.props

        return(
            <div>
                {children}
            </div>
        )
    }
}

export default ModalHeader