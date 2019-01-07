import React from 'react'

class PageMain extends React.Component {
    constructor(props) {
        super(props);
        this.goToLongPage = this.goToLongPage.bind(this)
    }

    goToLongPage() {
        this.props.history.push('/long-page', { fromMainPage: true });
    }

    render() {
        return(
            <div className={'page_animated'}>
                Главная страница (контент)

                <hr/>
                <div onClick={this.goToLongPage}>
                    Перейти на Long page
                </div>
            </div>
        )
    }
}

export default PageMain