export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECKS = 'ADD_DECKS'
import { getDecks, saveDeckTitle } from '../utils/api'
import uuidv4 from 'uuid/v4'

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