import { useState, useEffect } from "react";

export default (observable, stateMap) => {
  const [state, setState] = useState(stateMap ? stateMap({}) : {});

  useEffect(() => {
    const subscription = observable.subscribe(newState =>
      setState(stateMap ? stateMap(newState) : newState)
    );
    return () => {
      subscription.unsubscribe();
    };
  });

  return { ...state };
};
