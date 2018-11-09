import React from 'react'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import configureStore from './store'
import { snow } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import { MainNavigator, MobileFlashcardsBar } from './components/Navigation'

const store = configureStore()

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MobileFlashcardsBar backgroundColor={snow} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}