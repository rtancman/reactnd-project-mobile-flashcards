import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { PressBtn, SuccessBtn, DangerBtn, Title, StepProgress, LinkBtn, theme, SubTitle, ScreenLoading } from '../utils/layout'
import { rescheduleLocalNotification } from '../utils/helpers'
import { green, white, slategray } from '../utils/colors'
import { addDeckQuizScoreFetch } from '../actions'


const QuizEndScreen = ({deck, score, step, resetQuiz}) => {
  return (
    <View style={{flex:1}}>
      <StepProgress step={step+1} total={deck.questions.length} />
      <View style={[theme.Box]}>
        <Ionicons style={styles.TextCenter} name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'} size={60} color={green} />
        <Title customStyle={styles.TextCenter}>Congratulations!</Title>
        <SubTitle customStyle={styles.TextCenter}>Your score is {score}</SubTitle>
        <PressBtn 
          onPress={() => resetQuiz()} 
          label='RESTART QUIZ' 
          icon={Platform.OS === 'ios' ? <Ionicons name='ios-text' size={20} color={white} /> : <MaterialIcons name='question-answer' size={20} color={white} /> }
        />
      </View>
    </View>
  )
}

const QuizAnswer = ({card, isAnswer, onPressShowAnswer, onPressChoiceAnswer}) => {
    if( !isAnswer ) return <LinkBtn customStyle={styles.TextCenter} label='Answer' onPress={() => onPressShowAnswer()} />

    return (
      <View>
        <SubTitle customStyle={styles.TextCenter}>{card.answer}</SubTitle>
        <SuccessBtn 
          label='Correct'
          onPress={() => onPressChoiceAnswer(true, card)}
          icon={ <Ionicons name={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'} size={20} color={white} /> }
        />
        <DangerBtn 
          label='Incorrect'
          onPress={() => onPressChoiceAnswer(false, card)}
          icon={ <Ionicons name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'} size={20} color={white} /> }
        />
      </View>
    )
}

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
    loading: false,
  }

  resetQuiz() {
    this.setState({
      step: 0,
      showAnswer: false,
      listAnswers: [],
      showEndScreen: false,
      score: 0,
      loading: false,
    })
  }

  choiceAnswer(answer, card) {
    const { deck } = this.props
    const { step, score } = this.state

    if ( (step+1) >= deck.questions.length ) {
      const currentScore = score + (answer === card.correct ? 1 : 0)
      
      rescheduleLocalNotification()
      this.setState({ loading: true})
      this.props.dispatch(addDeckQuizScoreFetch(deck.id, currentScore))
        .then((data) => {
          this.setState((state) => {
            return {
              loading: false,
              showEndScreen: true,
              score: currentScore,
            }
          })
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
    const { step, showAnswer, showEndScreen, score, loading } = this.state
    const { deck } = this.props

    if ( loading ) return <ScreenLoading />

    if ( showEndScreen ) return <QuizEndScreen deck={deck} score={score} step={step} resetQuiz={() => this.resetQuiz()}/>

    const card = deck.questions[step]

    return (
      <View style={{flex:1}}>
        <StepProgress step={step} total={deck.questions.length} />
        <View style={theme.Box}>
          <Title customStyle={styles.TextCenter}>{card.question}</Title>
          <QuizAnswer 
            card={card} 
            isAnswer={showAnswer}
            onPressShowAnswer={() => this.setState({showAnswer: true})}
            onPressChoiceAnswer={(option, currentCard) => this.choiceAnswer(option, currentCard)}
          />
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