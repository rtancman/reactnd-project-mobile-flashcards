import React from 'react'
import { Provider } from 'react-redux'
import { View, StatusBar } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import configureStore from './store'
import { slategray, silver, snow } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import AddDeck from './components/AddDeck'
import ListDecks from './components/ListDecks'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

function MobileFlashcardsBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const navigationOptions = {
  headerTintColor: slategray,
  headerStyle: {
    backgroundColor: snow,
  }
}

const MainNavigator = createStackNavigator({
  Home: {
    screen: ListDecks,
    navigationOptions: {
      header: null,
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions
  },
  Quiz: {
    screen: Quiz,
    navigationOptions
  }
})

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