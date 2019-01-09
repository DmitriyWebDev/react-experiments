import React from 'react'
import {LanguageContext} from '../../contexts/language-context';

class LanguageSwitcher extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this)
    }

    handleClick(lang, changeLang) {
        changeLang(lang)
    }

    render() {
        return(
            <LanguageContext.Consumer>
                {({currentLang, locales, changeLanguage}) => (
                    <div>
                        {locales.map((item, index, arr) => {
                            const active = (currentLang === item) ? '(active)' : ''
                            return(
                                <div
                                    key={item}
                                    onClick={this.handleClick.bind(this, item, changeLanguage)}
                                >
                                    {item} {active}
                                </div>
                            )
                        })}
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default LanguageSwitcher