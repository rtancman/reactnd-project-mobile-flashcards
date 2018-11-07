import React from 'react'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mockDeck, mockCard } from './fixtures/mocks';
import App from './App'


describe('App Component', () => {
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
    let wrapper = shallow(<App {...props} />)

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('MobileFlashcardsBar').length).toBe(1)
    expect(wrapper.find('NavigationContainer').length).toBe(1)
  })
})