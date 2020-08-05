import { useState, useRef } from 'react';

export const useRefState = initialState => {
  const [ state, setState ] = useState(initialState);
  const stateRef = useRef(state);
  const setRefState = newState => {
    stateRef.current = newState;
    setState(newState);
  };

  return [ state, stateRef, setRefState ];
};
