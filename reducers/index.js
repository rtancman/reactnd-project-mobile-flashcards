import { combineReducers } from 'redux'
import { RECEIVE_DECKS, ADD_DECKS, ADD_CARD, REMOVE_DECK } from '../actions'


const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECKS:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [
            ...state[action.deckId].questions,
            action.card,
          ]
        }
      }
    case REMOVE_DECK:
      const decks = { ...state }
      decks[action.deckId] = undefined
      delete decks[action.deckId]
      return {
        ...decks,
      }
    default :
      return state
  }
}

export default combineReducers({
  decks,
})