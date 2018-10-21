import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { PressBtn, Grid, Title, CustomTextField } from '../utils/layout'
import { saveDeckTitleFetch } from '../actions'

class AddDeck extends Component {
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
          this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
        })
    }
  }

  render() {
    const { title, errorTitle } = this.state

    return (
      <View style={Grid.container}>
        <Title>Add New Deck</Title>
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