import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { PressBtn, Grid, Title, CustomTextField, CustomSwitch } from '../utils/layout'
import { addCardToDeckFetch } from '../actions'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }

  state = {
    question: '',
    errorQuestion: '',
    answer: '',
    errorAnswer: '',
    correct: false,
  }

  onSubmit(deckId) {
    const { question, answer, correct } = this.state

    if( question === '' && answer === '' ) {
      this.setState({
        errorQuestion: 'this field is required',
        errorAnswer: 'this field is required',
      })
    } else if( question === '' ) {
      this.setState({ errorQuestion: 'this field is required'})
    } else if( answer === '' ) {
      this.setState({ errorAnswer: 'this field is required'})
    } else {
      this.props.dispatch(addCardToDeckFetch(deckId, {question, answer, correct}))
        .then((card) => {
          this.setState({ 
            question: '',
            errorQuestion: '',
            answer: '',
            errorAnswer: '',
          })
          this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'DeckDetail' }))
        })
    }
  }

  render() {
    const { question, errorQuestion, answer, errorAnswer } = this.state
    const { navigation } = this.props
    const { deckId } = navigation.state.params

    return (
      <View style={Grid.container}>
        <Title>Add Card</Title>
        <CustomTextField
          label='Question'
          value={question}
          error={errorQuestion}
          onChange={(question) => this.setState({ question })}
        />
        <CustomTextField
          label='Answer'
          value={answer}
          error={errorAnswer}
          onChange={(answer) => this.setState({ answer })}
        />
        <CustomSwitch 
          value={this.state.correct}
          label='Is a correct answer?'
          onChange={(value) => this.setState({ correct: value })}
        />
        <PressBtn onPress={() => this.onSubmit(deckId)} label='SAVE' />
      </View>
    )
  }
}

export default connect()(AddCard)