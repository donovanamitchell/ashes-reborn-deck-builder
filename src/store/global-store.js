// https://codeburst.io/global-state-with-react-hooks-and-context-api-87019cc4f2cf
import React, {createContext, useReducer} from 'react';
import Reducer from './reducer';

const initialState = {
  decks: [],
  releases: [],
  cards: [],
};

const GlobalStore = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

// Why does initialState have to be an array?
export const Context = createContext([initialState]);
export default GlobalStore;
