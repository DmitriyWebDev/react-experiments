import React from 'react'
import {Route, Link} from "react-router-dom"
import './App.css'
import PageMain from './components/pages/PageMain'
import PageClients from './components/pages/PageClients'
import PageClientDetail from './components/pages/PageClientDetail'
import PageClientParcels from './components/pages/PageClientParcels'
import PageParcels from './components/pages/PageParcels'
import PageParcelDetail from './components/pages/PageParcelDetail'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class App extends React.Component {
    render() {
        return (

            <div>
                <ul>
                    <li>
                        <Link to="/">Главная страница</Link>
                    </li>
                    <li>
                        <Link to="/clients">Клиенты</Link>
                    </li>
                    <li>
                        <Link to="/parcels">Посылки</Link>
                    </li>
                </ul>

                <hr/>

                <Route exact path="/" component={PageMain}/>
                <Route exact path="/clients" component={PageClients}/>
                <Route exact path="/clients/:clientId" component={PageClientDetail}/>
                <Route exact path="/clients/:clientId/parcels" component={PageClientParcels}/>
                <Route exact path="/parcels" component={PageParcels}/>
                <Route exact path="/parcels/:parcelId" component={PageParcelDetail}/>
                <ToastContainer />
            </div>
        )
    }
}

export default App