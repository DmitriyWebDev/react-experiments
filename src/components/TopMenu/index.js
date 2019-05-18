import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import LanguageSwitcher from "../LanguageSwitcher";
import Translator from "../Translator";

class TopMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedPosition: false
    };
    this.getScrollPosition = this.getScrollPosition.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const { fixedPosition } = this.state;
    const scrolled = this.getScrollPosition();
    if (scrolled > 0 && !fixedPosition) {
      // console.log('set menu fixedPosition true')
      this.setState({
        fixedPosition: true
      });
    } else if (scrolled === 0 && fixedPosition) {
      // console.log('set menu fixedPosition false')
      this.setState({
        fixedPosition: false
      });
    }
  }

  getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  render() {
    const { fixedPosition } = this.state;
    const headerClass = classNames({
      header: true,
      header_fixed: fixedPosition
    });
    return (
      <div className={headerClass}>
        <ul>
          <li>
            <Link to="/">
              <Translator>Главная страница</Translator>
            </Link>
          </li>
          <li>
            <Link to="/clients">
              <Translator>Клиенты</Translator>
            </Link>
          </li>
          <li>
            <Link to="/parcels">
              <Translator>Посылки</Translator>
            </Link>
          </li>
          <li>
            <Link to="/long-page">
              <Translator>Длинная страница</Translator>
            </Link>
          </li>
          <li>
            <Link to="/d3-charts">
              <Translator>Charts (D3.js)</Translator>
            </Link>
          </li>
        </ul>
        <div className={"header__lang-switcher"}>
          <LanguageSwitcher />
        </div>
      </div>
    );
  }
}

export default TopMenu;
