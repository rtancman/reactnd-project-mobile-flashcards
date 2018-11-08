import { combineReducers } from 'redux'
import { RECEIVE_DECKS, ADD_DECKS, ADD_CARD, REMOVE_DECK, ADD_QUIZ_SCORE, RECEIVE_DECK_QUIZ_SCORES } from '../actions'


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

const quiz = (state = {}, action) => {
  switch (action.type) {
    case ADD_QUIZ_SCORE:
      return {
        ...state,
        [action.deckId]: [
          ...(action.deckId in state? state[action.deckId] : []),
          action.score,
        ]
      }
    case RECEIVE_DECK_QUIZ_SCORES:
      return {
        ...state,
        ...action.scores,
      }
    default:
      return state
  }
}

export default combineReducers({
  decks,
  quiz,
})