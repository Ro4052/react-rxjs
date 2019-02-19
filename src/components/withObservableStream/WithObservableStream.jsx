import React, { useState, useEffect } from "react";

export default (observable, triggers) => WrappedComponent => props => {
  const [parentState, setParentState] = useState({});

  useEffect(() => {
    const subscription = observable.subscribe(newState =>
      setParentState(newState)
    );
    return () => {
      subscription.unsubscribe();
    };
  });

  return <WrappedComponent {...props} {...parentState} {...triggers} />;
};
