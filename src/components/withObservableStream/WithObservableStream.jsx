import React from "react";

export default (observable, triggers) => Component => {
  return class extends React.Component {
    componentWillMount() {
      this.subscription = observable.subscribe(newState =>
        this.setState({ ...newState })
      );
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return <Component {...this.props} {...this.state} {...triggers} />;
    }
  };
};
