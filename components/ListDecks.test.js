import React from 'react'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer';
import { mockDeck, mockCard } from '../fixtures/mocks';
import ListDecks from './ListDecks'


describe('ListDecks Component', () => {
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
    const component = renderer.create(
      <Provider {...props}>
        <ListDecks />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})