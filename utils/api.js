import { AsyncStorage } from 'react-native'
import uuidv4 from 'uuid/v4'

export const FLASHCARDS_DECKS_KEY = 'FLASHCARDS_DECKS_KEY'

const initialDecks =  {
  id: '',
  title: '',
  questions: []
}

const isInvalidResult = (result) => {
  return result === false || result === null || result === undefined
}

export const getDecks = () => {
  return AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
    .then((results) => {
      return isInvalidResult(results)
      ? {}
      : JSON.parse(results)
    })
}

export const getDeck = (id) => {
  return AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
    .then((results) => {
      if( isInvalidResult(results) ) return {}
      
      const decks = JSON.parse(results)
      
      if (!decks.hasOwnProperty(id)) return {}

      return decks[id]
    })
}

export const saveDeckTitle = (deck) => {
  const dataToSave = JSON.stringify(deck)
  return AsyncStorage.mergeItem(FLASHCARDS_DECKS_KEY, dataToSave)
    .catch(error => {
      return AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, dataToSave)
    })
}

export const addCardToDeck = (deckId, card) => {
  return getDeck(deckId)
    .then((deck) => {
      return AsyncStorage.mergeItem(FLASHCARDS_DECKS_KEY, JSON.stringify({
        [deckId]: { 
          ...deck, 
          questions: [
            ...deck.questions, 
            card,
          ] 
        }
      }))
    })
}

export function removeDeckById (id) {
  return AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[id] = undefined
      delete data[id]
      return AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, JSON.stringify(data))
    })
}

export function clearAllDecks () {
  return AsyncStorage.removeItem(FLASHCARDS_DECKS_KEY)
}