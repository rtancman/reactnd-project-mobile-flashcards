import { mockDeck, mockCard, mockDeckScore } from '../fixtures/mocks';
import {
  RECEIVE_DECKS, 
  ADD_DECKS, 
  ADD_CARD, 
  REMOVE_DECK,
  ADD_QUIZ_SCORE,
  RECEIVE_DECK_QUIZ_SCORES
} from '../actions'
import reducer from './'

describe('Reducers', () => {
  describe('#decks', () => {
    const initialEmptyState = {
      decks: {},
      quiz: {},
    }

    const initialState = {
      decks: {
        [mockDeck.id]: mockDeck
      },
      quiz: {},
    }

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialEmptyState)
    })

    it('should handle RECEIVE_DECKS', () => {
      const action = {
        type: RECEIVE_DECKS,
        decks: [mockDeck]
      }
      const expected = {
        decks: {...action.decks},
        quiz: {},
      }

      expect(reducer(initialEmptyState, action)).toEqual(expected)
    })

    it('should handle ADD_DECKS', () => {
      const deck = {
        ...mockDeck,
        id: '426d29e6-e098-11e8-8ebb-fcaa142a9210',
        title: 'Mock deck 2'
      }
      const action = {
        type: ADD_DECKS,
        deck
      }
      const expected = {
        decks: {
          ...initialState.decks,
          ...action.deck,
        },
        quiz: {},
      }

      expect(reducer(initialState, action)).toEqual(expected)
    })

    it('should handle ADD_CARD', () => {
      const card = {
        ...mockCard,
        id: 'ed005aee-e099-11e8-9772-fcaa142a9210',
        question: 'Question card 2',
      }
      const action = {
        type: ADD_CARD,
        deckId: mockDeck.id,
        card,
      }
      const expected = {
        decks: {
          ...initialState.decks,
          [mockDeck.id]: {
            ...initialState.decks[mockDeck.id],
            questions: [
              ...initialState.decks[mockDeck.id].questions,
              action.card,
            ]
          }
        },
        quiz: {},
      }

      expect(reducer(initialState, action)).toEqual(expected)
    })

    it('should handle REMOVE_DECK', () => {
      const action = {
        type: REMOVE_DECK,
        deckId: mockDeck.id,
      }
      const expected = {
        decks: {},
        quiz: {},
      }

      expect(reducer(initialState, action)).toEqual(expected)
    })
  })

  describe('#quiz', () => {
    const scoreDeckId = 'b9354028-e362-11e8-89c0-fcaa142a9210'
    const initialEmptyState = {
      decks: {},
      quiz: {},
    }
    const initialState = {
      decks: {},
      quiz: {
        [scoreDeckId]: [42, 100]
      },
    }

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialEmptyState)
    })

    it('should handle ADD_QUIZ_SCORE', () => {
      const newScore = 424242
      const action = {
        type: ADD_QUIZ_SCORE,
        deckId: scoreDeckId,
        score: newScore
      }
      const expected = {
        decks: {},
        quiz: {
          [scoreDeckId]: [newScore]
        },
      }

      expect(reducer(undefined, action)).toEqual(expected)
    })

    it('should handle ADD_QUIZ_SCORE with scores', () => {
      const newScore = 424242
      const action = {
        type: ADD_QUIZ_SCORE,
        deckId: scoreDeckId,
        score: newScore
      }
      const expected = {
        decks: {},
        quiz: {
          [scoreDeckId]: [...initialState.quiz[scoreDeckId], newScore]
        },
      }

      expect(reducer(initialState, action)).toEqual(expected)
    })

    it('should handle RECEIVE_DECK_QUIZ_SCORES', () => {
      const action = {
        type: RECEIVE_DECK_QUIZ_SCORES,
        scores: [mockDeckScore]
      }
      const expected = {
        decks: {},
        quiz: {
          ...initialState.quiz,
          ...[mockDeckScore],
        },
      }

      expect(reducer(initialState, action)).toEqual(expected)
    })
  })
})