// https://codeburst.io/global-state-with-react-hooks-and-context-api-87019cc4f2cf
// https://reactjs.org/docs/hooks-custom.html
import {resetReleases} from '../services/releases-service';

const Reducer = (state, action) => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case 'ADD_DECK':
      return {
        ...state,
        decks: state.decks.concat(action.payload),
      };
    case 'REMOVE_DECK':
      return {
        ...state,
        decks: state.decks.filter(deck => deck.filename !== action.filename),
      };
    case 'RESET_RELEASES':
      return {
        ...state,
        releases: resetReleases(),
      };
    case 'SET_CARDS':
      return {
        ...state,
        cards: action.payload,
      };
    case 'SET_DECKS':
      return {
        ...state,
        decks: action.payload,
      };
    case 'SET_RELEASES':
      return {
        ...state,
        releases: action.payload,
      };
    case 'UPDATE_DECK':
      return {
        ...state,
        decks: state.decks,
      };
    default:
      return state;
  }
};

export default Reducer;
