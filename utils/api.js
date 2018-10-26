import { AsyncStorage } from 'react-native'
import uuidv4 from 'uuid/v4'

const FLASHCARDS_DECKS_KEY = 'FLASHCARDS_DECKS_KEY'

const initialDecks =  {
  id: '',
  title: '',
  questions: []
}

export const getDecks = () => {
  return AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
    .then((results) => {
      return results === null
      ? {}
      : JSON.parse(results)
    })
}

export const getDeck = (id) => {
  return AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
    .then((results) => {
      if( results === null ) return {}
      
      const decks = JSON.parse(results)
      
      if (!decks.hasOwnProperty(id)) return {}

      return decks[id]
    })
}

export const saveDeckTitle = (deck) => {
  return AsyncStorage.mergeItem(
          FLASHCARDS_DECKS_KEY, 
          JSON.stringify(deck)
        ).catch(error => {
          return AsyncStorage.setItem(
            FLASHCARDS_DECKS_KEY, 
            JSON.stringify(deck)
          )
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
        .catch(error => {
          return AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, JSON.stringify({
            [deckId]: { 
              ...deck, 
              questions: [
                ...deck.questions, 
                card,
              ] 
            }
          }))
        })
    })
}

export function removeDeck (id) {
  return AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[id] = undefined
      delete data[id]
      AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, JSON.stringify(data))
    })
}

export function clearAllDecks () {
  return AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, '')
}