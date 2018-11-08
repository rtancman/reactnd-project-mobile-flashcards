import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer';
import { mockDeck } from '../fixtures/mocks';
import AddDeck from './AddDeck'


describe('AddDeck Component', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store

  beforeEach(() => {
    store = mockStore({
      decks: {
        [mockDeck.id]: mockDeck
      },
    })
  })

  it('without crashing', async () => {
    const props = {
      store: store,
    }
    const navigation = { 
      navigate: jest.fn(),
    }

    const component = renderer.create(
      <Provider {...props}>
        <AddDeck navigation={navigation} />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})