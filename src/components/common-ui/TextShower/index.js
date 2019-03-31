import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';


export class TextShower extends React.Component {
    render() {
        const {text} = this.props;
        return(
            <div className={'textShower'}>
                <div className={'textShower__content'}>
                    {text}
                </div>
            </div>
        )
    }
}

export default TextShower


TextShower.propTypes = {
    text: PropTypes.string
};

TextShower.defaultProps = {
    text: ''
};

