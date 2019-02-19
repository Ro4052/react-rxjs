import React, { Component } from "react";

export default (observable, triggers) => WrappedComponent => {
  return class extends Component {
    componentWillMount() {
      this.subscription = observable.subscribe(newState =>
        this.setState({ ...newState })
      );
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} {...triggers} />;
    }
  };
};
