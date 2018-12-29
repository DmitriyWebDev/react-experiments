import React from 'react'

class PageParcelDetail extends React.Component {
    render() {
        const {match} = this.props
        const parcelId = match.params.parcelId
        return(
            <div>
                Parcel № "{parcelId}"
            </div>
        )
    }
}

export default PageParcelDetail