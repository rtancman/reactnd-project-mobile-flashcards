import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Platform } from 'react-native'
import { PressBtn, Grid, Title, SubTitle } from '../utils/layout'
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { white } from '../utils/colors'

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
    const questionLength = deck.questions.length
    return (
      <View style={[Grid.container]}>
        <Title>{deck.title}</Title>
        <SubTitle>{questionLength} Cards</SubTitle>
        <PressBtn 
          onPress={() => navigation.navigate('AddCard', { title: deck.title, deckId } )} 
          label='ADD CARD'
          icon={Platform.OS === 'ios' ? <Ionicons name='ios-square-outline' size={20} color={white} /> : <MaterialCommunityIcons name='cards-outline' size={20} color={white} /> }
        />
        {questionLength > 0 && (
          <PressBtn 
            onPress={() => navigation.navigate('Quiz', { title: deck.title, deckId } )} 
            label='START QUIZ' 
            icon={Platform.OS === 'ios' ? <Ionicons name='ios-text' size={20} color={white} /> : <MaterialIcons name='question-answer' size={20} color={white} /> }
          />
        )}
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