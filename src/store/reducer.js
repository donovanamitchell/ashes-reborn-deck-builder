// https://codeburst.io/global-state-with-react-hooks-and-context-api-87019cc4f2cf

const Reducer = (state, action) => {
  console.log(action.type, action.payload);
  switch (action.type) {
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
    case 'ADD_DECK':
      return {
        ...state,
        decks: state.decks.concat(action.payload),
      };
    case 'REMOVE_DECK':
      return {
        ...state,
        decks: state.decks.filter(deck => deck.filename !== action.payload),
      };
    default:
      return state;
  }
};

export default Reducer;
