import React from "react";
import { LanguageContext } from "../../contexts/language-context";
// import styled, { css } from 'styled-components'

// Styled components example

//
// const Button = styled.button`
//   background: transparent;
//   border-radius: 3px;
//   border: 2px solid palevioletred;
//   color: palevioletred;
//   margin: 0 1em;
//   padding: 0.25em 1em;
//   cursor: pointer;
//
//   ${(props) => {
//     const color = 'red'
//
//     return css`
//       background: palevioletred;
//       color: ${color};
//     `}
// }}
// `

class LanguageSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick.bind(this);
  }

  handleClick(lang, changeLang) {
    changeLang(lang);
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {({ currentLang, locales, changeLanguage }) => (
          <div>
            {/*<Button>*/}
            {/*Button*/}
            {/*</Button>*/}
            {locales.map((item, index, arr) => {
              const active = currentLang === item ? "(active)" : "";
              return (
                <div
                  key={item}
                  onClick={this.handleClick.bind(this, item, changeLanguage)}
                >
                  {item} {active}
                </div>
              );
            })}
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default LanguageSwitcher;
