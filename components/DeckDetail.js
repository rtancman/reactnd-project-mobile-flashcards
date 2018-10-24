import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native'
import { PressBtn, Grid, Title } from '../utils/layout'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }

  render() {
    const { navigation, deck } = this.props
    const { deckId } = navigation.state.params

    return (
      <View style={Grid.container}>
        <Title>Total Cards {deck.questions.length}</Title>
        <PressBtn onPress={() => navigation.navigate('AddCard', { title: deck.title, deckId } )} label='ADD CARD' />
        <PressBtn onPress={() => navigation.navigate('Quiz', { title: deck.title, deckId } )} label='START QUIZ' />
      </View>
    );
  }
}

const mapStateToProps = ({decks}, {navigation}) => {
  const { deckId } = navigation.state.params
  return {
    deck: decks[deckId],
  } 
}

export default connect(mapStateToProps)(DeckDetail)