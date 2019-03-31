import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import cn from 'classnames';


export class TextListShower extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listIsOpen: false,
            listDirectionIsTop: false
        };

        this.contentRef = React.createRef();
        this.listRef = React.createRef();

        this.handleClick = this.handleClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClickOutside);
    }

    handleClick() {
        const listNode = this.listRef.current;
        const listHeight = listNode.offsetHeight;
        const contentNode = this.contentRef.current;

        const contentNodeTopOffset = getElemOffset(contentNode).top;
        const documentHeight = document.documentElement.clientHeight;
        const listDirectionIsTop = checkListDirectionIsTop(contentNodeTopOffset, listHeight, documentHeight);

        this.setState({
            listIsOpen: true,
            listDirectionIsTop
        })
    }

    handleClickOutside(event) {
        const {listIsOpen} = this.state;
        const contentNode = this.contentRef.current;
        const listNode = this.listRef.current;
        const {target} = event;

        if (!contentNode || !listNode) return false;

        const componentClicked =
            contentNode === target || listNode === target || listNode.contains(target) || false;

        if (componentClicked || !listIsOpen) {
            return false;
        }

        if (listIsOpen) {
            this.setState({listIsOpen: false})
        }
    }

    render() {
        const {textLinesList, listMaxHeight} = this.props;

        if (!textLinesList.length) return null;

        if (textLinesList.length === 1) {
            return(
                <div className={'textListShower textListShower_singleLine'}>
                    <div className={'textListShower__content'}>
                        {textLinesList[0]}
                    </div>
                </div>
            )
        }

        const rootClass = cn({
            textListShower: true,
            textListShower_isOpen: this.state.listIsOpen,
            textListShower_dir_top: this.state.listDirectionIsTop
        });

        return(
            <div className={rootClass}>
                <div
                    className={'textListShower__content'}
                    ref={this.contentRef}
                    onClick={this.handleClick}
                >
                    {textLinesList[0]}...
                </div>
                <div
                    className={'textListShower__list'}
                    ref={this.listRef}
                    style={{maxHeight: listMaxHeight}}
                >
                    {textLinesList.map((item, index, list) => {
                        return(
                            <div
                                key={index}
                                className={'textListShower__list-item'}
                            >
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default TextListShower


TextListShower.propTypes = {
    textLinesList: PropTypes.array,
    listMaxHeight: PropTypes.number
};

TextListShower.defaultProps = {
    textLinesList: [],
    listMaxHeight: 300
};


// utils

export const checkListDirectionIsTop = (elemTopOffset, elemHeight, windowHeight) => {
    return (elemTopOffset + elemHeight) > windowHeight;
};

export const getElemOffset = (el) => {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
};



