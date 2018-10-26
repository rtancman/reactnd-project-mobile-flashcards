import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { SuccessBtn, DangerBtn, Grid, Title, StepProgress, LinkBtn } from '../utils/layout'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  state = {
    step: 0,
    showAnswer: false,
    listAnswers: [],
    showEndScreen: false,
  }

  choiceAnswer(choice) {
    const { deck } = this.props
    const { step } = this.state

    if ( (step+1) >= deck.questions.length ) {
      this.setState({
        showEndScreen: true
      })
    } else {
      this.setState((state) => {
        return {
          step: state.step + 1,
          showAnswer: false,
          listAnswers: [ ...state.listAnswers, choice ]
        }
      })
    }
  }

  render() {
    const { step, showAnswer, showEndScreen } = this.state
    const { deck } = this.props
    const card = deck.questions[step]

    if ( showEndScreen ) {
      return (
        <View style={Grid.container}>
          <StepProgress step={step+1} total={deck.questions.length} />
          <Title>Quiz finish!</Title>
        </View>
      ) 
    }
    
    let answerContent = <LinkBtn label='Answer' onPress={() => this.setState({showAnswer: true})} />
    if( showAnswer ) {
      answerContent = (
        <View style={Grid.container}>
          <Text>{card.answer}</Text>
          <SuccessBtn 
            label='Correct'
            onPress={() => this.choiceAnswer('correct')} 
          />
          <DangerBtn 
            label='Incorrect'
            onPress={() => this.choiceAnswer('incorrect')} 
          />
        </View>
      )
    } 

    return (
      <View style={Grid.container}>
        <StepProgress step={step+1} total={deck.questions.length} />
        <Title>{card.question}</Title>
        { answerContent }
      </View>
    )
  }
}

const mapStateToProps = ({decks}, {navigation}) => {
  const { deckId } = navigation.state.params
  return {
    deck: decks[deckId],
  } 
}

export default connect(mapStateToProps)(Quiz)