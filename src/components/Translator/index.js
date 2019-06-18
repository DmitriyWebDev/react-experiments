import React from 'react';
import { LanguageContext } from '../../contexts/language-context';

class Translator extends React.Component {
  render() {
    const { vocabulary } = this.context;
    const { children } = this.props;

    let output = children ? children : '';

    if (output && vocabulary && vocabulary[`${output}`]) {
      output = vocabulary[`${output}`];
    }

    return <React.Fragment>{output}</React.Fragment>;
  }
}
Translator.contextType = LanguageContext;

export default Translator;
