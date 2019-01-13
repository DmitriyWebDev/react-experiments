import React from 'react'

class ModalFooter extends React.Component {
    render() {
        const {children} = this.props

        return(
            <div>
                {children}
            </div>
        )
    }
}

export default ModalFooter