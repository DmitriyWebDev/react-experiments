import React from 'react'
import ClientsList from '../../ClientsList'

class PageClients extends React.Component {
    render() {
        const {match} = this.props
        return(
            <div className={'page_animated'}>
                <ClientsList clientsUrl={match.url}/>
            </div>
        )
    }
}

export default PageClients