import React from 'react'
import './App.css'
import TopMenu from './components/TopMenu'
import PageMain from './components/pages/PageMain'
import PageClients from './components/pages/PageClients'
import PageClientDetail from './components/pages/PageClientDetail'
import PageClientParcels from './components/pages/PageClientParcels'
import PageParcels from './components/pages/PageParcels'
import PageParcelDetail from './components/pages/PageParcelDetail'
import PageLongContent from './components/pages/PageLongContent'
import PageD3Charts from './components/pages/PageD3Charts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route } from 'react-router-dom'
import {
    LanguageContext,
    locales,
    vocabulary,
} from './contexts/language-context'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.changeLanguage = lang => {
            this.setState({
                currentLang: lang,
                vocabulary: vocabulary[`${lang}`],
            })
        }

        const defaultLang = locales[0]
        this.state = {
            currentLang: defaultLang,
            locales: locales,
            vocabulary: vocabulary[`${defaultLang}`],
            changeLanguage: this.changeLanguage,
        }
    }

    render() {
        return (
            <LanguageContext.Provider value={this.state}>
                <div>
                    <Route
                        render={({ location }) => {
                            let animationClass = 'fade'
                            if (location.pathname === '/clients') {
                                animationClass = 'clients-page-animation'
                            }
                            return (
                                <div>
                                    <TopMenu />

                                    <div className={'pages-wrapper'}>
                                        <TransitionGroup>
                                            {/* no different than other usage of
                          CSSTransition, just make sure to pass
                          `location` to `Switch` so it can match
                          the old location as it animates out
                      */}
                                            <CSSTransition
                                                key={location.key}
                                                classNames={animationClass}
                                                timeout={250}
                                            >
                                                <Switch location={location}>
                                                    <Route
                                                        exact
                                                        path="/"
                                                        component={PageMain}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/clients"
                                                        component={PageClients}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/clients/:clientId"
                                                        component={
                                                            PageClientDetail
                                                        }
                                                    />
                                                    <Route
                                                        exact
                                                        path="/clients/:clientId/parcels"
                                                        component={
                                                            PageClientParcels
                                                        }
                                                    />
                                                    <Route
                                                        exact
                                                        path="/parcels"
                                                        component={PageParcels}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/parcels/:parcelId"
                                                        component={
                                                            PageParcelDetail
                                                        }
                                                    />
                                                    <Route
                                                        exact
                                                        path="/long-page"
                                                        component={
                                                            PageLongContent
                                                        }
                                                    />
                                                    <Route
                                                        exact
                                                        path="/d3-charts"
                                                        component={PageD3Charts}
                                                    />
                                                    <Route
                                                        render={() => (
                                                            <div>Not Found</div>
                                                        )}
                                                    />
                                                </Switch>
                                            </CSSTransition>
                                        </TransitionGroup>
                                    </div>
                                </div>
                            )
                        }}
                    />

                    <ToastContainer />
                </div>
            </LanguageContext.Provider>
        )
    }
}

export default App
