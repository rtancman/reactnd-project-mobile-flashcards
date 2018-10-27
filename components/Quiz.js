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
    score: 0,
  }

  answerScore(choice, card) {
    if (choice === card.correct) {
      return 1
    }
    return 0
  }

  choiceAnswer(answer, card) {
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
          listAnswers: [ ...state.listAnswers, answer ],
          score: state.score + (answer === card.correct? 1 : 0),
        }
      })
    }
  }

  render() {
    const { step, showAnswer, showEndScreen, score } = this.state
    const { deck } = this.props

    if ( showEndScreen ) {
      return (
        <View style={Grid.container}>
          <StepProgress step={step+1} total={deck.questions.length} />
          <Title>Quiz finish!</Title>
          <Text>Your score is {score}</Text>
        </View>
      ) 
    }

    const card = deck.questions[step]
    let answerContent = <LinkBtn label='Answer' onPress={() => this.setState({showAnswer: true})} />

    if( showAnswer ) {
      answerContent = (
        <View style={Grid.container}>
          <Text>{card.answer}</Text>
          <SuccessBtn 
            label='Correct'
            onPress={() => this.choiceAnswer(true, card)} 
          />
          <DangerBtn 
            label='Incorrect'
            onPress={() => this.choiceAnswer(false, card)} 
          />
        </View>
      )
    } 

    return (
      <View style={Grid.container}>
        <StepProgress step={step} total={deck.questions.length} />
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