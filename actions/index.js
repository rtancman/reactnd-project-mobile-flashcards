import { getDecks, saveDeckTitle, addCardToDeck } from '../utils/api'
import uuidv4 from 'uuid/v4'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECKS = 'ADD_DECKS'
export const ADD_CARD = 'ADD_CARD'

const initialDecks =  {
  id: '',
  title: '',
  questions: []
}

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECKS,
    deck,
  }
}

export function addCard (deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  }
}

export function decksFetchData() {
  return dispatch => {
    return getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
  }
}

export function saveDeckTitleFetch(title) {
  return dispatch => {
    const id = uuidv4()
    const newDeck = {
      [id]: { 
        ...initialDecks, 
        id,
        title,
      }
    }
    return saveDeckTitle(newDeck)
      .then(data => {
        dispatch(addDeck(newDeck))
        return new Promise(function(resolve) {
          resolve(newDeck);
        })
      })
  }
}

export function addCardToDeckFetch(deckId, card) {
  return dispatch => {
    const newCard = {
      id: uuidv4(),
      question: card.question,
      answer: card.answer,
      correct: card.correct,
    }
    return addCardToDeck(deckId, newCard)
      .then(data => {
        dispatch(addCard(deckId, newCard))
        return new Promise(function(resolve) {
          resolve(newCard);
        })
      })
  }
}