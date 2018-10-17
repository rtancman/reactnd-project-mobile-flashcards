import React from 'react';
import { View, Platform, StatusBar } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { slategray, white, silver, snow } from './utils/colors'
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

const Tabs = createBottomTabNavigator({
  Home: {
    screen: ListDecks,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: slategray,
    inactiveTintColor: silver,
    style: {
      height: 56,
      backgroundColor: snow
    }
  }
})

const navigationOptions = {
  headerTintColor: slategray,
  headerStyle: {
    backgroundColor: snow,
  }
}

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  AddCard: {
    screen: AddCard,
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

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MobileFlashcardsBar backgroundColor={snow} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}