import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Platform, Alert, ActivityIndicator } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { PressBtn, DangerBtn, Grid, Title, SubTitle } from '../utils/layout'
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { white, slategray } from '../utils/colors'
import { removeDeckFetch } from '../actions'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }

  state = {
    loading: false,
  }

  removeDeck() {
    this.setState({ loading: true})
    this.props.dispatch(removeDeckFetch(this.props.deck.id))
    .then((deck) => {
      this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
    })
  }

  removeAction() {
    Alert.alert(
      'Remove deck',
      `Do you want to remove deck ${this.props.deck.title}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Remove Deck', onPress: () => this.removeDeck()},
      ],
      { cancelable: false }
    )    
  }

  render() {
    const { loading } = this.state

    if ( loading ){
      return <ActivityIndicator size="large" color={slategray} />
    }

    const { navigation, deck, scores } = this.props
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
        {questionLength > 0 && scores.length >= 1 && (
        <PressBtn 
            onPress={() => navigation.navigate('QuizScore', { title: deck.title, deckId } )} 
            label='QUIZ SCORES' 
            icon={<Ionicons name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'} size={20} color={white} />}
          />
        )}
        <DangerBtn 
          onPress={() => this.removeAction() } 
          label='REMOVE DECK'
          icon={ <Ionicons name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'} size={20} color={white} /> }
        />
      </View>
    );
  }
}

const mapStateToProps = ({decks, quiz}, {navigation}) => {
  const { deckId } = navigation.state.params
  return {
    deck: decks[deckId],
    scores: deckId in quiz? quiz[deckId] : [],
  } 
}

export default connect(mapStateToProps)(DeckDetail)