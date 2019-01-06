import React from 'react'
import {Link} from "react-router-dom";

class PageClientParcels extends React.Component {
    render() {
        const {match} = this.props
        console.log(match)
        return(
            <div className={'page_animated'}>
                Parcels list of client

                <br/>

                <ul>
                    <li>
                        <Link to={`/parcels/p1`}>Parcel 1</Link>
                    </li>
                    <li>
                        <Link to={`/parcels/p2`}>Parcel 2</Link>
                    </li>
                    <li>
                        <Link to={`/parcels/p3`}>Parcel 3</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default PageClientParcels