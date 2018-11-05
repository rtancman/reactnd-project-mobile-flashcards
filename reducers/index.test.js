import { mockDeck, mockCard } from '../fixtures/mocks';
import {
  RECEIVE_DECKS, 
  ADD_DECKS, 
  ADD_CARD, 
  REMOVE_DECK,
} from '../actions'
import reducer from './'

describe('Reducers', () => {
  const initialEmptyState = {
    decks: {}
  }

  const initialState = {
    decks: {
      [mockDeck.id]: mockDeck
    }
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
      }
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
      }
    }

    expect(reducer(initialState, action)).toEqual(expected)
  })

  it('should handle REMOVE_DECK', () => {
    const action = {
      type: REMOVE_DECK,
      deckId: mockDeck.id,
    }
    const expected = {
      decks: {}
    }

    expect(reducer(initialState, action)).toEqual(expected)
  })
})