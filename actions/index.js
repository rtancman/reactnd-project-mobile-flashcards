import { getDecks, saveDeckTitle, addCardToDeck, removeDeckById, getDecksAndScores, addQuizScoreByDeckId } from '../utils/api'
import uuidv4 from 'uuid/v4'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECKS = 'ADD_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_QUIZ_SCORE = 'ADD_QUIZ_SCORE'
export const RECEIVE_DECK_QUIZ_SCORES = 'RECEIVE_DECK_QUIZ_SCORES'

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

export function removeDeck (deckId) {
  return {
    type: REMOVE_DECK,
    deckId,
  }
}

export function addQuizScore (deckId, score) {
  return {
    type: ADD_QUIZ_SCORE,
    deckId,
    score
  }
}

export function receiveScores (scores) {
  return {
    type: RECEIVE_DECK_QUIZ_SCORES,
    scores
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

export function removeDeckFetch(deckId) {
  return dispatch => {
    return removeDeckById(deckId)
      .then(data => {
        dispatch(removeDeck(deckId))
        return new Promise(function(resolve) {
          resolve(deckId);
        })
      })
  }
}

export function scoresFetchData() {
  return dispatch => {
    return getScores()
      .then(scores => dispatch(receiveScores(scores)))
  }
}

export function decksAndScoresfechData() {
  return dispatch => {
    return getDecksAndScores()
      .then(data => {
        dispatch(receiveScores(data.scores))
        dispatch(receiveDecks(data.decks))
      })
  }
}

export function addDeckQuizScoreFetch(deckId, score) {
  return dispatch => {
    return addQuizScoreByDeckId(deckId, score)
      .then(data => {
        dispatch(addQuizScore(deckId, score))
      })
  }
}