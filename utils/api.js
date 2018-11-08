import { AsyncStorage } from 'react-native'
import uuidv4 from 'uuid/v4'

export const FLASHCARDS_DECKS_KEY = 'FLASHCARDS_DECKS_KEY'
export const FLASHCARDS_SCORES_KEY = 'FLASHCARDS_SCORES_KEY'

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

export const getQuizScoreByDeckId = (deckId) => {
  return AsyncStorage.getItem(FLASHCARDS_SCORES_KEY)
    .then((results) => {
      if( isInvalidResult(results) ) return []

      const scores = JSON.parse(results)

      if (!scores.hasOwnProperty(deckId)) return []

      return scores[deckId]
    })
}

export const addQuizScoreByDeckId = (deckId, score) => {
  return getQuizScoreByDeckId(deckId)
    .then((deckScores) => {
      const dataToSave = JSON.stringify({
        [deckId]: [
          ...deckScores,
          score,
        ]
      })

      return AsyncStorage.mergeItem(FLASHCARDS_SCORES_KEY, dataToSave)
        .catch(error => {
          return AsyncStorage.setItem(FLASHCARDS_SCORES_KEY, dataToSave)
        })
    })
}

export const getScores = () => {
  return AsyncStorage.getItem(FLASHCARDS_SCORES_KEY)
    .then((results) => {
      return isInvalidResult(results)
      ? {}
      : JSON.parse(results)
    })
}

export const getDecksAndScores = async () => {
  const decks = await getDecks()
  const scores = await getScores()

  return new Promise(function(resolve) {
    resolve({
      decks,
      scores,
    })
  })
}