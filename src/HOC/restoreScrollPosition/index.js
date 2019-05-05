import React from "react";

const restoreScrollPosition = WrappedComponent => {
  return class RestoreScrollPosition extends React.Component {
    constructor(props) {
      super(props);
      this.getScrollPosition = this.getScrollPosition.bind(this);
      this.saveScrollPosition = this.saveScrollPosition.bind(this);
      this.canRestoreScrollPosition = this.canRestoreScrollPosition.bind(this);
      this.setComponentNameForScrollRestore = this.setComponentNameForScrollRestore.bind(
        this
      );
      this.state = {
        storageKeyPrefix: "restoreScroll",
        scrollRestored: false,
        componentName: ""
      };
    }

    componentDidMount() {
      // for debug only !!!
      // window.addEventListener('scroll', () => {
      //     console.log(this.getScrollPosition())
      // })
    }

    componentDidUpdate() {
      const { componentName, scrollRestored } = this.state;

      if (!componentName) return null;

      const savedScrollPosition = this.canRestoreScrollPosition();

      if (!savedScrollPosition) {
        console.log("Can not restore scroll ---");
        return null;
      }

      if (scrollRestored && savedScrollPosition) return null;

      this.setState({
        scrollRestored: true
      });

      window.scrollTo(0, savedScrollPosition);
      console.log("Scroll restored", savedScrollPosition);
    }

    componentWillUnmount() {
      if (!this.state.componentName) return null;
      const scrolled = this.getScrollPosition();
      this.saveScrollPosition(scrolled);
    }

    canRestoreScrollPosition() {
      const { componentName, storageKeyPrefix } = this.state;
      const scrollData = sessionStorage.getItem(
        `${storageKeyPrefix}_${componentName}`
      );
      return scrollData !== null ? Number(scrollData) : false;
    }

    saveScrollPosition(scrolled) {
      const { componentName, storageKeyPrefix } = this.state;
      console.log(`saveScrollPosition(${scrolled})`);
      sessionStorage.setItem(`${storageKeyPrefix}_${componentName}`, scrolled);
    }

    getScrollPosition() {
      return window.pageYOffset || document.documentElement.scrollTop;
    }

    setComponentNameForScrollRestore(componentName) {
      console.log(`Restore scroll for component - ${componentName}`);
      if (componentName) {
        this.setState({
          componentName
        });
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          setComponentNameForScrollRestore={
            this.setComponentNameForScrollRestore
          }
        />
      );
    }
  };
};

export default restoreScrollPosition;
