import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {loadClients} from '../../ducks/clients'
import {getClientsList} from '../../ducks/clients/selector.js'

class ClientsList extends React.Component {

    componentDidMount() {
        const {clientsLoading, clientsLoaded, loadClients} = this.props
        if( !clientsLoading && !clientsLoaded ) {
            loadClients()
        }
    }

    render() {
        const {clientsUrl, clientsList} = this.props
        // console.log(clientsList)

        const clientsLinks = clientsList.map(function (item, index, arr) {
            const {id, name} = item
            return  <li key={id}>
                        <Link to={`${clientsUrl}/${id}`}>{name}</Link>
                    </li>
        })

        return(
            <div>
                Clients list:

                <ul>
                    {clientsLinks}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {clientsLoading, clientsLoaded} = state.clients
    return {
        clientsLoading,
        clientsLoaded,
        clientsList: getClientsList(state.clients)
    }
}

export default connect(
    mapStateToProps,
    {loadClients}
)(ClientsList)