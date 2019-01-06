import React from 'react'
import VeryLongComponent from '../../VeryLongComponent'
import restoreScrollPosition from '../../../HOC/restoreScrollPosition'

class PageLongContent extends React.Component {
    componentDidMount() {
        const {setComponentNameForScrollRestore} = this.props
        if(setComponentNameForScrollRestore) {
            setComponentNameForScrollRestore('PageLongContent')
        }
    }

    render() {
        return(
            <div className={'page_animated'}>
                <VeryLongComponent />
            </div>
        )
    }
}

export default restoreScrollPosition(PageLongContent)