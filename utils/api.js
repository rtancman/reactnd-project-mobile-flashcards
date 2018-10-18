import { AsyncStorage } from 'react-native'
import uuidv4 from 'uuid/v4'

const FLASHCARDS_DECKS_KEY = 'FLASHCARDS_DECKS_KEY'


const initialQuestions = {
  question: '',
  answer: ''
}

const initialDecks =  {
  title: '',
  questions: []
}

export function listDecks () {
  return AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
    .then((results) => {
      return results === null
      ? []
      : JSON.parse(results)
    })
}

export function createDeck (title) {
  return AsyncStorage.mergeItem(FLASHCARDS_DECKS_KEY, JSON.stringify({
    [uuidv4()]: { ...initialDecks, title: title }
  }))
}

export function removeDeck (key) {
  return AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, JSON.stringify(data))
    })
}