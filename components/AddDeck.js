import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { PressBtn, Grid, Title, CustomTextField } from '../utils/layout'
import { saveDeckTitleFetch } from '../actions'

class AddDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }

  state = {
    title: '',
    errorTitle: '',
  }

  onSubmit() {
    const { title } = this.state
    if( title === '' ){
      this.setState({ errorTitle: 'this field is required'})
    }else{
      this.props.dispatch(saveDeckTitleFetch(title))
        .then((deck) => {
          this.setState({ title: '', errorTitle: ''})
          this.props.navigation.navigate('DeckDetail', {deckId: deck.id, title})
        })
    }
  }

  render() {
    const { title, errorTitle } = this.state

    return (
      <View style={Grid.container}>
        <Title>Deck</Title>
        <CustomTextField
          label='Title'
          value={title}
          error={errorTitle}
          onChange={(title) => this.setState({ title })}
        />
        <PressBtn onPress={() => this.onSubmit()} label='SAVE' />
      </View>
    )
  }
}

export default connect()(AddDeck)