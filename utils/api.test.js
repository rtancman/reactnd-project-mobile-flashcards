import { AsyncStorage as storage } from 'react-native'
import MockAsyncStorage from 'mock-async-storage'
import {
  getDeck, getDecks, saveDeckTitle, addCardToDeck, removeDeckById, clearAllDecks, FLASHCARDS_DECKS_KEY, 
  getQuizScoreByDeckId, addQuizScoreByDeckId, FLASHCARDS_SCORES_KEY, getScores
} from './api'
import { mockDeck, mockCard, mockDeckWitoutQuestions } from '../fixtures/mocks';

describe('Api', () => {
  const mock = () => {
    const mockImpl = new MockAsyncStorage()
    jest.mock('AsyncStorage', () => mockImpl)
  }
  const deck = {
    [mockDeck.id]: mockDeck
  }
  const newDeckId = '4d9dc512-e2b6-11e8-8ac3-fcaa142a9210'
  const newDeck = {
    [newDeckId]: {
      ...mockDeck, 
      id: newDeckId, 
      title: 'Mock Deck 2', 
    }  
  }
  const newDeckWitoutQuestions = {
    [mockDeckWitoutQuestions.id]: mockDeckWitoutQuestions
  }
  const decksInStorage = JSON.stringify(deck)

  beforeAll(() => {
    mock()
  })

  afterAll(() => {
    mockStorage.release()
  })

	describe('#getDecks', () => {
    it('should return a empty object {}', async () => {
      const decks = await getDecks()

      expect(decks).toEqual({})
    })

    it('should return a object with decks', async () => {
      await storage.setItem(FLASHCARDS_DECKS_KEY, decksInStorage)
      
      const expected = {[mockDeck.id]: mockDeck}
      const decks = await getDecks()

      expect(decks).toEqual(expected)
    })

    it('with invalid keys AsyncStorage', async () => {
      await storage.removeItem(FLASHCARDS_DECKS_KEY)
      const decks = await getDecks()

      expect(decks).toEqual({})
    })
  })

	describe('#getDeck by id', () => {
    it('should return a empty object {} if not exists', async () => {
      const deck = await getDeck('1234')

      expect(deck).toEqual({})
    })

    it('should return a object deck', async () => {
      await storage.setItem(FLASHCARDS_DECKS_KEY, decksInStorage)

      const deck = await getDeck(mockDeck.id)

      expect(deck).toEqual(mockDeck)
    })

    it('with invalid keys AsyncStorage return a empty object {}', async () => {
      await storage.removeItem(FLASHCARDS_DECKS_KEY)
      const decks = await getDeck('1234')

      expect(decks).toEqual({})
    })


    it('return a empty object {} if deckId does not exists', async () => {
      await storage.setItem(FLASHCARDS_DECKS_KEY, decksInStorage)
      const decks = await getDeck('1234')

      expect(decks).toEqual({})
    })
  })

  describe('#saveDeckTitle', () => {
    describe('with data in AsyncStorage', () => {
      it('save deck object', async () => {
        await saveDeckTitle(deck)
        await saveDeckTitle(newDeck)
        const expected = newDeck[newDeckId]
        const decks = await getDecks()

        expect(decks[newDeckId]).toEqual(expected)
        expect(Object.keys(decks).length).toEqual(2)
      })
    })

    describe('with empty AsyncStorage', () => {
      it('save deck object', async () => {
        await storage.clear()
        await saveDeckTitle(newDeck)
        const expected = newDeck[newDeckId]
        const decks = await getDecks()
        
        expect(decks[newDeckId]).toEqual(expected)
        expect(Object.keys(decks).length).toEqual(1)
      })
    })
  })

  describe('#addCardToDeck', () => {
    describe('with data in Deck Questions', () => {
      it('save card object', async () => {
        const deckId = mockDeck.id
        await storage.setItem(FLASHCARDS_DECKS_KEY, decksInStorage)

        await addCardToDeck(deckId, mockCard)
        const decks = await getDecks()

        expect(decks[deckId].questions.length).toEqual(2)
        expect(decks[deckId].questions[1]).toEqual(mockCard)
      })
    })

    describe('with empty Deck Questions', () => {
      it('save card object', async () => {
        const deckId = mockDeckWitoutQuestions.id

        await storage.clear()
        await saveDeckTitle(newDeckWitoutQuestions)
        await addCardToDeck(deckId, mockCard)
        
        const decks = await getDecks()

        expect(decks[deckId].questions.length).toEqual(1)
        expect(decks[deckId].questions[0]).toEqual(mockCard)
      })
    })
  })

  describe('#removeDeckById', () => {
    describe('with data in AsyncStorage', () => {
      it('remove deck by id', async () => {
        await storage.clear()
        await saveDeckTitle(deck)
        await saveDeckTitle(newDeck)
        await removeDeckById(mockDeck.id)
        const expected = newDeck[newDeckId]
        const decks = await getDecks()

        expect(decks[newDeckId]).toEqual(expected)
        expect(Object.keys(decks).length).toEqual(1)
      })
    })

    describe('with empty AsyncStorage', () => {
      it('remove deck by id', async () => {
        await storage.clear()
        await saveDeckTitle(newDeck)
  
        await removeDeckById(newDeckId)
        const decks = await getDecks()

        expect(Object.keys(decks).length).toEqual(0)
      })
    })
  })

  describe('#clearAllDecks', () => {
    describe('with data in AsyncStorage', () => {
      it('clear all decks', async () => {
        await storage.clear()
        await saveDeckTitle(deck)
        await saveDeckTitle(newDeck)
  
        await clearAllDecks()
        const decks = await getDecks()

        expect(Object.keys(decks).length).toEqual(0)
      })
    })

    describe('with empty AsyncStorage', () => {
      it('clear all decks', async () => {
        await storage.clear()
        await clearAllDecks()
  
        const decks = await getDecks()

        expect(Object.keys(decks).length).toEqual(0)
      })
    })
  })

  describe('Quiz Score by Deck', () => {
    const scoreDeckId = '0b01c4ba-e360-11e8-a576-fcaa142a9210'
    const scoreDeck = {
      [scoreDeckId]: [1234, 4321]
    }
    const scoreDeckInStorage = JSON.stringify(scoreDeck)

    describe('#getQuizScoreByDeckId', () => {
      it('should return a empty object {} if not exists', async () => {
        const scores = await getQuizScoreByDeckId('1234')

        expect(scores).toEqual([])
      })

      it('should return a object deck', async () => {
        await storage.setItem(FLASHCARDS_SCORES_KEY, scoreDeckInStorage)

        const scores = await getQuizScoreByDeckId(scoreDeckId)

        expect(scores).toEqual(scoreDeck[scoreDeckId])
      })

      it('with invalid keys AsyncStorage return a empty object {}', async () => {
        await storage.removeItem(FLASHCARDS_SCORES_KEY)
        const scores = await getQuizScoreByDeckId('1234')

        expect(scores).toEqual([])
      })


      it('return a empty object {} if deckId does not exists', async () => {
        await storage.setItem(FLASHCARDS_SCORES_KEY, scoreDeckInStorage)
        const scores = await getQuizScoreByDeckId('1234')

        expect(scores).toEqual([])
      })
    })

    describe('#addQuizScoreByDeckId', () => {
      describe('with data in Quiz Scores', () => {
        it('save card object', async () => {
          await storage.setItem(FLASHCARDS_SCORES_KEY, scoreDeckInStorage)
          const newScore = 42
          await addQuizScoreByDeckId(scoreDeckId, newScore)
          const scores = await getQuizScoreByDeckId(scoreDeckId)

          expect(scores.length).toEqual(3)
          expect(scores[scores.length-1]).toEqual(newScore)
        })
      })
  
      describe('with empty Quiz Scores', () => {
        it('save card object', async () => {
          await storage.clear()
          const newScore = 42
          await addQuizScoreByDeckId(scoreDeckId, newScore)
          const scores = await getQuizScoreByDeckId(scoreDeckId)

          expect(scores.length).toEqual(1)
          expect(scores[scores.length-1]).toEqual(newScore)
        })
      })
    })

    describe('#getScores', () => {
      it('should return a empty object {} if not exists', async () => {
        await storage.clear()
        const scores = await getScores()

        expect(scores).toEqual({})
      })

      it('should return a object deck', async () => {
        await storage.setItem(FLASHCARDS_SCORES_KEY, scoreDeckInStorage)

        const scores = await getScores()

        expect(scores).toEqual(scoreDeck)
      })

      it('with invalid keys AsyncStorage return a empty object {}', async () => {
        await storage.removeItem(FLASHCARDS_SCORES_KEY)
        const scores = await getScores()

        expect(scores).toEqual({})
      })
    })
  })
})