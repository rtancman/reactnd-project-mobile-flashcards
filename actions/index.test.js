import { mockDeck, mockCard } from '../fixtures/mocks';
import {
  RECEIVE_DECKS, 
  ADD_DECKS, 
  ADD_CARD, 
  REMOVE_DECK, 
  receiveDecks, 
  addDeck,
  addCard,
  removeDeck,
} from './'

describe('Actions', () => {
  describe('should create an action', () => {
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