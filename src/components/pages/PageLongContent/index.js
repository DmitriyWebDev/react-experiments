import React from "react";
import VeryLongComponent from "../../VeryLongComponent";
import restoreScrollPosition from "../../../HOC/restoreScrollPosition";

class PageLongContent extends React.Component {
  componentDidMount() {
    const { setComponentNameForScrollRestore } = this.props;
    if (setComponentNameForScrollRestore) {
      setComponentNameForScrollRestore("PageLongContent");
    }

    let userComeFromMainPage = false;
    try {
      userComeFromMainPage = this.props.location.state.fromMainPage;
    } catch (e) {}

    if (userComeFromMainPage) {
      setTimeout(() => {
        alert("You came from main page, after button clicking");
      }, 300);
    }
  }

  render() {
    return (
      <div className={"page_animated"}>
        <VeryLongComponent />
      </div>
    );
  }
}

export default restoreScrollPosition(PageLongContent);
