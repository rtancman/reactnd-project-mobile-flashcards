import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { SuccessBtn, DangerBtn, Title, StepProgress, LinkBtn, theme, SubTitle } from '../utils/layout'
import { clearLocalNotification } from '../utils/helpers'
import { green, white } from '../utils/colors'

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

  choiceAnswer(answer, card) {
    const { deck } = this.props
    const { step } = this.state

    if ( (step+1) >= deck.questions.length ) {
      clearLocalNotification()
      this.setState((state) => {
        return {
          showEndScreen: true,
          score: state.score + (answer === card.correct ? 1 : 0),
        }
      })
    } else {
      this.setState((state) => {
        return {
          step: state.step + 1,
          showAnswer: false,
          listAnswers: [ ...state.listAnswers, answer ],
          score: state.score + (answer === card.correct ? 1 : 0),
        }
      })
    }
  }

  render() {
    const { step, showAnswer, showEndScreen, score } = this.state
    const { deck } = this.props

    if ( showEndScreen ) {
      return (
        <View style={{flex:1}}>
          <StepProgress step={step+1} total={deck.questions.length} />
          <View style={[theme.Box]}>
            <Ionicons style={styles.TextCenter} name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'} size={60} color={green} />
            <Title customStyle={styles.TextCenter}>Congratulations!</Title>
            <SubTitle customStyle={styles.TextCenter}>Your score is {score}</SubTitle>
          </View>
        </View>
      ) 
    }

    const card = deck.questions[step]
    let answerContent = <LinkBtn customStyle={styles.TextCenter} label='Answer' onPress={() => this.setState({showAnswer: true})} />

    if( showAnswer ) {
      answerContent = (
        <View>
          <SubTitle customStyle={styles.TextCenter}>{card.answer}</SubTitle>
          <SuccessBtn 
            label='Correct'
            onPress={() => this.choiceAnswer(true, card)}
            icon={ <Ionicons name={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'} size={20} color={white} /> }
          />
          <DangerBtn 
            label='Incorrect'
            onPress={() => this.choiceAnswer(false, card)}
            icon={ <Ionicons name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'} size={20} color={white} /> }
          />
        </View>
      )
    } 

    return (
      <View style={{flex:1}}>
        <StepProgress step={step} total={deck.questions.length} />
        <View style={theme.Box}>
          <Title customStyle={styles.TextCenter}>{card.question}</Title>
          { answerContent }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  TextCenter: {
    textAlign: 'center',
  },
})

const mapStateToProps = ({decks}, {navigation}) => {
  const { deckId } = navigation.state.params
  return {
    deck: decks[deckId],
  } 
}

export default connect(mapStateToProps)(Quiz)