import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer';
import { mockDeck, mockDeckScore } from '../fixtures/mocks';
import QuizScore from './QuizScore'


describe('QuizScore Component', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store

  beforeEach(() => {
    store = mockStore({
      decks: {
        [mockDeck.id]: mockDeck
      },
      quiz: mockDeckScore
    })
  })

  it('without crashing', async () => {
    const props = {
      store: store,
    }
    const navigation = { 
      navigate: jest.fn(),
      state: {
        params: {
          deckId: mockDeck.id
        }
      },
    }

    const component = renderer.create(
      <Provider {...props}>
        <QuizScore navigation={navigation} />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})