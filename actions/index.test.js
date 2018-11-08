import { mockDeck, mockCard, mockDeckScore } from '../fixtures/mocks';
import {
  RECEIVE_DECKS, ADD_DECKS, ADD_CARD, REMOVE_DECK,
  receiveDecks, addDeck, addCard, removeDeck,
  ADD_QUIZ_SCORE, RECEIVE_DECK_QUIZ_SCORES,
  addQuizScore, receiveScores,
} from './'

describe('Actions', () => {
  describe('#decks', () => {
    describe('Actions', () => {
      it('to receive decks', () => {
        const expectedAction = {
          type: RECEIVE_DECKS,
          decks: [mockDeck],
        }

        expect(receiveDecks([mockDeck])).toEqual(expectedAction)
      })

      it('to add deck', () => {
        const expectedAction = {
          type: ADD_DECKS,
          deck: mockDeck,
        }

        expect(addDeck(mockDeck)).toEqual(expectedAction)
      })

      it('to add card', () => {
        const expectedAction = {
          type: ADD_CARD,
          deckId: mockDeck.id,
          card: mockCard,
        }

        expect(addCard(mockDeck.id, mockCard)).toEqual(expectedAction)
      })

      it('to remove deck', () => {
        const expectedAction = {
          type: REMOVE_DECK,
          deckId: mockDeck.id,
        }

        expect(removeDeck(mockDeck.id)).toEqual(expectedAction)
      })
    })
  })

  describe('#quiz', () => {
    const scoreDeckId = 'b9354028-e362-11e8-89c0-fcaa142a9210'
    
    describe('Actions', () => {
      it('to add quiz score in deck', () => {
        const newScore = 42
        const expectedAction = {
          type: ADD_QUIZ_SCORE,
          deckId: scoreDeckId,
          score: newScore
        }

        expect(addQuizScore(scoreDeckId, newScore)).toEqual(expectedAction)
      })

      it('to add receive scores by deck', () => {
        const expectedAction = {
          type: RECEIVE_DECK_QUIZ_SCORES,
          scores: {...mockDeckScore}
        }

        expect(receiveScores({...mockDeckScore})).toEqual(expectedAction)
      })
    })
  })
})