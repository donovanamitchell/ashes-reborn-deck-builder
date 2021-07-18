// https://codeburst.io/global-state-with-react-hooks-and-context-api-87019cc4f2cf
import React, {createContext, useReducer} from 'react';
import Reducer from './reducer';
import {getReleases} from '../services/releases-service';
import {getAllCards, getCardsFromReleases} from '../services/cards-service';

const initialReleases = getReleases();
async function initialCards() {
  let releases = await initialReleases;
  return getCardsFromReleases(releases.flatMap(release => release.stub));
}

console.log(initialReleases);
const initialState = {
  decks: [],
  releases: initialReleases,
  cards: initialCards(),
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
