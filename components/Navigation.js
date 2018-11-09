import React from 'react'
import { View, StatusBar } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { slategray, snow } from '../utils/colors'
import AddDeck from './AddDeck'
import ListDecks from './ListDecks'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import Quiz from './Quiz'
import QuizScore from './QuizScore'

export const MobileFlashcardsBar = ({backgroundColor, ...props}) => {
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

export const MainNavigator = createStackNavigator({
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
  },
  QuizScore: {
    screen: QuizScore,
    navigationOptions
  },
})
