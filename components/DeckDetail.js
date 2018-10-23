import React, { Component } from 'react';
import { View } from 'react-native'
import { PressBtn, Grid } from '../utils/layout'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }

  render() {
    const { navigation } = this.props
    const { title, deckId } = navigation.state.params

    return (
      <View style={Grid.container}>
        <PressBtn onPress={() => navigation.navigate('AddCard', { title, deckId } )} label='ADD CARD' />
        <PressBtn onPress={() => navigation.navigate('Quiz', { title, deckId } )} label='START QUIZ' />
      </View>
    );
  }
}

export default DeckDetail