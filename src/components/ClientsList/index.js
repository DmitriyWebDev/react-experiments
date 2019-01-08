import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadClients} from '../../ducks/clients'
import {getClientsList} from '../../ducks/clients/selector.js'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group'
import styles from './component.module.scss'
import './stye.scss'

class ClientsList extends React.Component {

    componentDidMount() {
        const {clientsLoading, clientsLoaded, loadClients} = this.props
        if (!clientsLoading && !clientsLoaded) {
            loadClients()
        }
    }

    render() {
        const {clientsUrl, clientsList, clientsLoaded} = this.props
        // console.log(clientsList)

        if (!clientsLoaded) return 'Loading...'

        const clientsLinks = clientsList.map(function (item, index, arr) {
            const {id, name} = item
            return  <CSSTransition
                    key={id}
                    timeout={400}
                    classNames="animated-client"
                    appear
                    >
                        <li key={id}>
                            <Link
                                className={styles["clints-list__item"]}
                                to={`${clientsUrl}/${id}`}>{name}
                            </Link>
                        </li>
                    </CSSTransition>

        })

        return (
            <div>
                Clients list:

                <ul className={styles["clints-list"]}>
                    <TransitionGroup>
                        {clientsLinks}
                    </TransitionGroup>
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