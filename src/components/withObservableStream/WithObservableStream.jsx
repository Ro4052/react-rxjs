import React, { useState, useEffect } from "react";

export default (
  observable,
  stateMap,
  triggers
) => WrappedComponent => props => {
  const [state, setState] = useState(stateMap({}));

  useEffect(() => {
    const subscription = observable.subscribe(newState =>
      setState(stateMap(newState))
    );
    return () => {
      subscription.unsubscribe();
    };
  });

  return <WrappedComponent {...props} {...state} {...triggers} />;
};
